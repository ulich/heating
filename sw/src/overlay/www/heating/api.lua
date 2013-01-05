json = require("luci.json")
url = require("socket.url")
heating = require("heating")

local ERRORCODE_INVALID_REQUEST = 50
local ERRORCODE_AUTH_FAIL = 51
local ERRORCODE_CMD_UNKNOWN = 52

-------------------------------------------------------------------------------
-- GET and POST parsing
-------------------------------------------------------------------------------

function parse_query(query)
    local parsed = {}
    local pos = 0

    local function ginsert(qstr)
        local first, last = string.find(qstr, "=")
        if first then
            parsed[url.unescape(string.sub(qstr, 0, first-1))] = url.unescape(string.sub(qstr, first+1))
        end
    end

    while true do
        local first, last = string.find(query, "&", pos)
        if first then
            ginsert(string.sub(query, pos, first-1));
            pos = last+1
        else
            ginsert(string.sub(query, pos));
            break;
        end
    end
    return parsed
end

local GET = {};
local POST = nil;
function parseGetAndPost()
    local gets = os.getenv("QUERY_STRING")
    if (gets ~= nil) then
        GET = parse_query(gets)
    else
        GET = {}
    end
    
    local contentLength = os.getenv("CONTENT_LENGTH")
    if (contentLength ~= nil) then
        local len = tonumber(contentLength);
        if (len > 0) then
            POST = io.read(len)
        end
    end
end
parseGetAndPost()

-------------------------------------------------------------------------------
-- Application code
-------------------------------------------------------------------------------

function printError(errorCode, errorString)
    local resp = {
        success = false,
        error = {
            code = errorCode,
            text = errorString
        }
    }
    io.write(json.encode(resp))
end

function printResponse(data)
    if (data == nil) then
        data = {}
    end

    local resp = {
        success = true,
        response = data
    }
    io.write(json.encode(resp))
end

io.write("Content-Type: application/json\r\n")
io.write("\r\n")

if (POST == nil) then
    printError(ERRORCODE_INVALID_REQUEST, "Malformed request. Cannot parse as JSON")
    return
end

local request = json.decode(POST);
if (request.cmd == nil) then
    printError(ERRORCODE_INVALID_REQUEST, "Request parameter 'cmd' missing")
    return
end

function loadConfigAndStatus()
    return {
        config = heating.loadConfig(),
        status = loadStatus()
    }
end

function loadStatus()
    return {
        enabled = heating.isHeatingEnabled();
    }
end

local cmds = {
    getConfigAndStatus = function(params)
        printResponse(loadConfigAndStatus())
    end,
    setConfig = function(params)
        if (params == nil) then
            printError(ERRORCODE_INVALID_REQUEST, "Request paramameter missing")
            return
        end
        
        heating.writeConfig(params);
        printResponse(loadConfigAndStatus());
    end,
    getStatus = function(params)
        printResponse(loadStatus())
    end
}


if (cmds[request.cmd] ~= nil) then
    cmds[request.cmd](request.params)
else
    printError(ERRORCODE_CMD_UNKNOWN, "Unknown cmd '" .. request.cmd .. "'")
    return
end