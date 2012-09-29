https = require ("ssl.https")
url = require("socket.url")
json = require("luci.json")

local DIGITEMP = "digitemp_DS9097"
local DIGITEMPRC = "/etc/digitemp"
local THERMOMETER_DEVICE = "/dev/tts/1"
local TEMPFILE = "/tmp/temperature"
local HEATINGFILE = "/tmp/heating"
local CONFIGFILE = "/etc/heating"

function initThermometer()
    if io.open(DIGITEMPRC, "r") == nil then
        logToServer("DEBUG", "Searching for 1-Wire devices on net")
        os.execute(DIGITEMP .. " -c " .. DIGITEMPRC .. " -i -s" .. THERMOMETER_DEVICE);
    end
end

function measureTemperature()
    os.execute(DIGITEMP .. ' -c ' .. DIGITEMPRC .. ' -t 0 -q -o"%C" > ' .. TEMPFILE)
    
    local tempFh = io.open(TEMPFILE, "r")
    if tempFh == nil then
        logToServer("ERROR", "Could not open temperature measurement result file " .. TEMPFILE);
        tempFh:close();
        return nil;
    end
    
    local contents = tempFh:read()
    local temperature = tonumber(contents)
    
    if temperature == nil then
        logToServer("ERROR", "Temperature from measurement result file " .. TEMPFILE .. " could not be parsed. Contents were: " .. contents);
    end
    
    tempFh:close();
    return temperature;
end

function getUptime()
    local fh = io.open("/proc/uptime", "r")
    local uptime = 0
    
    if fh == nil then
        uptime = 0
    else
        local contents = fh:read()
        local pos = contents:find(" ")
        uptime = tonumber(contents:sub(1, pos-1))
        
        if uptime == nil then
            uptime = 0
        end
    end
    
    fh:close()
    return uptime
end

function isHeatingEnabled()
    local fh = io.open(HEATINGFILE, "r");
    local enabled = false
    
    if fh == nil then
        return false
    else
        local contents = fh:read()
        if contents == "1" then
            enabled = true
        else
            enabled = false
        end
    end
    
    fh:close()
    return enabled
end

function enableHeating(on)
    local heatingEnabled = isHeatingEnabled()

    if on then
        if not heatingEnabled then
            os.execute("gpio-utils disable 7")
            os.execute("echo 1 > " .. HEATINGFILE)
            logToServer("INFO", "Enable heating")
        else
            logToServer("DEBUG", "Heating is kept enabled")
        end
    
    else 
        if heatingEnabled then
            os.execute("gpio-utils enable 7")
            os.execute("echo 0 > " .. HEATINGFILE)
            logToServer("INFO", "Disable heating")
        else
            logToServer("DEBUG", "Heating is kept disabled")
        end
    end
end

function sendToServer(command, params)
    local dataEncoded = "command=" .. url.escape(command)
    
    for k,v in pairs(params) do        
        dataEncoded = dataEncoded .. "&" .. url.escape(k) .. "=" .. url.escape(v)
    end
    
    page, status, auth = https.request(
        "https://wrt54g:ouS1q9X8t6YPl0pTWMfFo3yP8emO7qJQQODUDMrmc5MaFUeDcwqXVlPpf42d6WD@srv.tiv-trendinvest.de/heating/index.php", 
        dataEncoded
    )
    --print(page)
end

function logToServer(level, msg)
    sendToServer("log", {
        level = level,
        message = msg,
        time = os.time()
    })
end

function splitTime(str)
    local pos = str:find(":")
    return str:sub(1, pos-1), str:sub(pos + 1) 
end

function timeStrToTs(date, str)
    hour, minute = splitTime(str)
    
    return os.time{
        year=date.year,
        month=date.month,
        day=date.day,
        hour=hour,
        min=minute,
        sec=0,
        isdst=date.isdst
    }
end

function readFile(file)
    local fh = io.open(file, "r")
    if (fh == nil) then
        return nil;
    end
    local str = fh:read("*all")
    fh:close()
    return str
end

function readConfig()
    local contents = readFile(CONFIGFILE);
    if contents == nil then
        return nil
    end
    return json.decode(contents)
end

function isInHeatingTime()
    local nowTs = os.time()
    local now = os.date("*t", nowTs)
    
    local cfg = readConfig()
    if cfg == nil then
        logToServer("ERROR", "Could not read config")
        return false
    end
    
    local todaysHeatingTimes = cfg.weekly[now.wday]
    
    local startTs
    local stopTs
    
    for i,heatingTime in ipairs(todaysHeatingTimes) do        
        startTs = timeStrToTs(now, heatingTime.start)
        stopTs = timeStrToTs(now, heatingTime.stop)
        
        if nowTs >= startTs and nowTs < stopTs then
            logToServer("DEBUG", "In heating time " .. heatingTime.start .. "-" .. heatingTime.stop)
            return true
        end
    end
    
    logToServer("DEBUG", "Not in any heating time")
    return false
end

function main()
    -- do not anything incase the system is still booting up
    if getUptime() < 120 then
        logToServer("DEBUG", "System is still booting up, not doing anything")
        return
    end

    initThermometer()

    local temperature = measureTemperature();
    
    if temperature ~= nil then
        sendToServer("save_temperature", {
            temperature = temperature,
            time = os.time()
        });
        
        if isInHeatingTime() and temperature < 22 then
            enableHeating(true)
        elseif temperature < 15 then
            enableHeating(true)
        else
            enableHeating(false)
        end
    end
end

main()
