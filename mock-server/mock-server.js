var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var basicAuth = require('basic-auth-connect')

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static('../sw/src/app'))
app.use(basicAuth('root', 'secret'));

const state = {
    config: {
        mode: 'timed',
        weekly: {
            sets: [{
                name: 'Always on',
                weekdays: [
                    [{start: "00:00", stop: "23:59"}],
                    [{start: "00:00", stop: "23:59"}],
                    [{start: "00:00", stop: "23:59"}],
                    [{start: "00:00", stop: "23:59"}],
                    [{start: "00:00", stop: "23:59"}],
                    [{start: "00:00", stop: "23:59"}],
                    [{start: "00:00", stop: "23:59"}]
                ]
            }, {
                name: 'Always off',
                weekdays: [ [], [], [], [], [], [], [] ]
            }, {
                name: 'Normal',
                weekdays: [
                    [{start: "08:00", stop: "22:00"}],
                    [{start: "06:00", stop: "08:00"}, {start: "16:00", stop: "22:00"}],
                    [{start: "06:00", stop: "08:00"}, {start: "16:00", stop: "22:00"}],
                    [{start: "06:00", stop: "08:00"}, {start: "16:00", stop: "22:00"}],
                    [{start: "06:00", stop: "08:00"}, {start: "16:00", stop: "22:00"}],
                    [{start: "06:00", stop: "08:00"}, {start: "16:00", stop: "22:00"}],
                    [{start: "08:00", stop: "22:00"}],
                ]
            }],
            activeSet: 1
        },
        specials: []
    },
    status: {
        enabled: false
    }
}

setInterval(() => {
    state.status.enabled = state.config.weekly.activeSet !== 1
}, 1000 * 5)

app.post('/api.lua', function (req, res) {
    setTimeout(() => {
        switch (req.body.cmd) {
            case 'getConfigAndStatus':
                res.json(response(state))
                break
            case 'getStatus':
                res.json(response(state.status))
                break
            case 'setConfig':
                state.config = req.body.params
                res.json(response(state))
                console.log("Config is now", state.config)
                break
            default:
                res.status(404).send({ error: "Unknown command" })
                break
        }
    }, 300);
})

function response(body) {
    return {
        success: true,
        response: body
    }
}

app.listen(4000, function () {
    console.log('Example app listening on port 3000!')
})
