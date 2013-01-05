json = require("luci.json")

local CFGFILE = '/etc/heating.conf'
local HEATINGFILE = "/var/heating/enabled"
local SERVICEFILE = "/usr/sbin/heatingd.lua"
local MAX_ACTION_LOG = 10

local module = {}

module.readFile = function(file)
    local fh = io.open(file, "r")
    if (fh == nil) then
        return nil;
    end
    local str = fh:read("*all")
    fh:close()
    return str
end

module.writeFile = function(file, str)
    local fh = io.open(file, "w+")
    fh:write(str)
    fh:close()
end

module.loggingEnabled = true

module.loadConfig = function()
    local fileContents = module.readFile(CFGFILE)
    local cfg

    if (fileContents == nil) then 
        cfg = {
            mode = 'off',
            weekly = {
                sets = {},
                activeSet = nil
            },
            specials = {}
        }
    else
        cfg = json.decode(fileContents)
    end

    return cfg
end

module.writeConfig = function(cfg)
    module.writeFile(CFGFILE, json.encode(cfg))
    os.execute("lua " .. SERVICEFILE)
end

module.isHeatingEnabled = function()
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

module.enableHeating = function(on)
    local heatingEnabled = module.isHeatingEnabled()

    if on then
        if not heatingEnabled then
            os.execute("gpio-utils disable 7")
            os.execute("echo 1 > " .. HEATINGFILE)
            module.log("INFO", "Enable heating")
        else
            module.log("DEBUG", "Heating is kept enabled")
        end

    else
        if heatingEnabled then
            os.execute("gpio-utils enable 7")
            os.execute("echo 0 > " .. HEATINGFILE)
            module.log("INFO", "Disable heating")
        else
            module.log("DEBUG", "Heating is kept disabled")
        end
    end
end

module.sendToServer = function(command, params)
    -- local dataEncoded = "command=" .. url.escape(command)

    -- for k,v in pairs(params) do
    --     dataEncoded = dataEncoded .. "&" .. url.escape(k) .. "=" .. url.escape(v)
    -- end

    -- page, status, auth = https.request(
    --     "https://wrt54g:ouS1q9X8t6YPl0pTWMfFo3yP8emO7qJQQODUDMrmc5MaFUeDcwqXVlPpf42d6WD@srv.tiv-trendinvest.de/heating/index.php", 
    --     dataEncoded
    -- )
end

module.log = function(level, msg)
    module.sendToServer("log", {
        level = level,
        message = msg,
        time = os.time()
    })
    --print(msg)
end

-- module.enableSwitch = function(on)
--     local timestamp = os.time() * 1000
--     local status = module.loadStatus()

--     status.enabled = on
--     if (module.loggingEnabled) then
--         table.insert(status.actions, 1, {
--             date = timestamp,
--             type = 'toggleSwitch',
--             params = {
--                 enabled = on
--             }
--         })

--         local actionCount = table.getn(status.actions);
--         if (actionCount > MAX_ACTION_LOG) then
--             table.remove(status.actions, actionCount)
--         end
--     end

--     module.writeFile(CFGFILE, json.encode(status))

--     if on then
--         os.execute("gpio-utils enable 7")
--     else
--         os.execute("gpio-utils disable 7")
--     end

--     return status
-- end

return module;