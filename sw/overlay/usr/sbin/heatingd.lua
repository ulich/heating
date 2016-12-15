--https = require ("ssl.https")
url = require("socket.url")
json = require("luci.json")
heating = require("heating")

local DIGITEMP = "digitemp_DS9097"
local DIGITEMPRC = "/etc/digitemp"
local THERMOMETER_DEVICE = "/dev/tts/1"
local PROC_FOLDER = "/var/heating"
local TEMPFILE = "/var/heating/temperature"

function initThermometer()
    -- if io.open(DIGITEMPRC, "r") == nil then
    --     heating.log("DEBUG", "Searching for 1-Wire devices on net")
    --     os.execute(DIGITEMP .. " -c " .. DIGITEMPRC .. " -i -s" .. THERMOMETER_DEVICE);
    -- end
end

function measureTemperature()
    -- os.execute(DIGITEMP .. ' -c ' .. DIGITEMPRC .. ' -t 0 -q -o"%C" > ' .. TEMPFILE)
    
    -- local tempFh = io.open(TEMPFILE, "r")
    -- if tempFh == nil then
    --     heating.log("ERROR", "Could not open temperature measurement result file " .. TEMPFILE);
    --     tempFh:close();
    --     return nil;
    -- end
    
    -- local contents = tempFh:read()
    -- local temperature = tonumber(contents)
    
    -- if temperature == nil then
    --     heating.log("ERROR", "Temperature from measurement result file " .. TEMPFILE .. " could not be parsed. Contents were: " .. contents);
    -- end
    
    -- tempFh:close();
    -- return temperature;
    return 20; -- between 15 and 22
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

function isInHeatingTime()
    local nowTs = os.time()
    local now = os.date("*t", nowTs)
    
    local cfg = heating.loadConfig()
    if cfg == nil then
        heating.log("ERROR", "Could not read config")
        return false
    end

    if (cfg.mode == 'on') then
        heating.log("DEBUG", "Heating always on")
        return true;
    elseif (cfg.mode == 'off') then
        heating.log("DEBUG", "Heating always off")
        return false;
    end

    local startTs
    local stopTs
    local enabled

    for i,specialTime in ipairs(cfg.specials) do
        startTs = specialTime.start / 1000
        stopTs = specialTime.stop / 1000
        enabled = specialTime.enabled

        if (nowTs >= startTs and nowTs < stopTs) then
            heating.log("DEBUG", "In special heating time " .. i .. " (" .. (enabled and "on" or "off") .. ")")
            return enabled
        end
    end
    
    local activeSet = cfg.weekly.sets[cfg.weekly.activeSet + 1]
    if (activeSet == nil) then
        heating.log("ERROR", "Invalid activeSet " .. cfg.weekly.activeSet)
        return false
    end

    local todaysHeatingTimes = activeSet.weekdays[now.wday]
    
    for i,heatingTime in ipairs(todaysHeatingTimes) do
        startTs = timeStrToTs(now, heatingTime.start)
        stopTs = timeStrToTs(now, heatingTime.stop)
        
        if nowTs >= startTs and nowTs < stopTs then
            heating.log("DEBUG", "In heating time " .. heatingTime.start .. "-" .. heatingTime.stop .. " (" .. activeSet.name .. ")")
            return true
        end
    end
    
    heating.log("DEBUG", "Not in any heating time")
    return false
end

function main()
    os.execute("mkdir -p " .. PROC_FOLDER)

    -- do not anything incase the system is still booting up
    if getUptime() < 120 then
        heating.log("DEBUG", "System is still booting up, not doing anything")
        return
    end

    initThermometer()

    local temperature = measureTemperature();
    
    if temperature ~= nil then
        heating.sendToServer("save_temperature", {
            temperature = temperature,
            time = os.time()
        });
        
        if isInHeatingTime() and temperature < 22 then
            heating.enableHeating(true)
        elseif temperature < 15 then
            heating.enableHeating(true)
        else
            heating.enableHeating(false)
        end
    end
end

main()
