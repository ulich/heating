json = require("luci.json")

local CFGFILE = '/etc/heating.conf'
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
            }
        }
    else
        cfg = json.decode(fileContents)
    end

    return cfg
end

module.writeConfig = function(cfg)
    module.writeFile(CFGFILE, json.encode(cfg))
end

module.enableSwitch = function(on)
    local timestamp = os.time() * 1000
    local status = module.loadStatus()
    
    status.enabled = on
    if (module.loggingEnabled) then
        table.insert(status.actions, 1, {
            date = timestamp,
            type = 'toggleSwitch',
            params = {
                enabled = on
            }
        })

        local actionCount = table.getn(status.actions);
        if (actionCount > MAX_ACTION_LOG) then
            table.remove(status.actions, actionCount)
        end
    end

    module.writeFile(CFGFILE, json.encode(status))

    if on then
        os.execute("gpio-utils enable 7")
    else
        os.execute("gpio-utils disable 7")
    end

    return status
end

return module;