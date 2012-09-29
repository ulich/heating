#!/usr/bin/lua

json = require("luci.json")
url = require("socket.url")

local DB_CFG = '/etc/heating'

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
local POST = {};
function parseGetAndPost()
    local gets = os.getenv("QUERY_STRING")
    if (gets ~= nil) then
        GET = parse_query(gets)
    else
        GET = {}
    end
    
    local posts = nil;
    local contentLength = os.getenv("CONTENT_LENGTH")
    if (contentLength ~= nil) then
        local len = tonumber(contentLength);
        if (len > 0) then
            posts = io.read(len)
        end
    end
    
    if (posts ~= nil) then
        POST = parse_query(posts)
    else
        POST = {}
    end
end
parseGetAndPost()

function readFile(file)
    local fh = io.open(file, "r")
    if (fh == nil) then
        return nil;
    end
    local str = fh:read("*all")
    fh:close()
    return str
end

function writeFile(file, str)
    local fh = io.open(file, "w+")
    fh:write(str)
    fh:close()
end

function readConfig()
    return json.decode(readFile(DB_CFG))
end

function writeConfig(cfg)
    return writeFile(DB_CFG, json.encode(cfg))
end

print("Content-Type: application/json\r\n")

if GET.cmd == nil and POST.cmd == nil then
    print(json.encode({success = false, response = "Unknown request. GET or POST parameter 'cmd' is required"}))
elseif GET.cmd == "getConfig" then
    local cfg = readConfig()
    print(json.encode({success = true, response = cfg}))
elseif POST.cmd == "setConfig" then
    if POST.args == nil then
        print(json.encode({success = false, response = "args parameter is required"}))
    else
        local args = json.decode(POST.args)
        if args.config == nil then
            print(json.encode({success = false, response = "args.config parameter is required"}))
        else
            writeConfig(args.config)
            print(json.encode({success = true, response = true}))
        end
    end
else
    local cmd
    if GET.cmd ~= nil then
        cmd = GET.cmd
    else 
        cmd = POST.cmd
    end
    print(json.encode({success = false, response = "Unknown command "..cmd}))
end