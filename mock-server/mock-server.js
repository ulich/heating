var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static('../sw/src/app'))

app.post('/api.lua', function (req, res) {
    switch (req.body.cmd) {
        case 'getConfigAndStatus':
            res.json(response({
                config: {
                    mode: 'timed',
                    weekly: {
                        sets: [
                            { name: 'test 1', weekdays: [ [], [], [], [], [], [], [] ] },
                            { name: 'test 2', weekdays: [ [], [], [], [], [], [], [] ] }
                        ],
                        activeSet: 1
                    },
                    specials: []
                },
                status: {
                    enabled: true
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
