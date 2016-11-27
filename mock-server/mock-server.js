var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('../sw/src/app'))

app.post('/api.lua', function (req, res) {
    setTimeout(() => {
        switch (req.body.cmd) {
            case 'getConfigAndStatus':
                res.json(response({
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
                }))
                break
            case 'getStatus':
                res.json(response({
                    status: {
                        enabled: false
                    }
                }))
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
