const path = require("path")
const express = require('express')
const cors = require('cors')
const geo = require('./utils/geocode')
const forecast = require('./utils/forecast')
const fetch = require("node-fetch");
console.log(__dirname)
console.log(path.join(__dirname, '../../weatherApp/src'));


const app = express()
const port = process.env.PORT || 3000

const frontend = path.join(__dirname, '../public')
var corsOptions = {
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.set('view engine', 'hbs')
app.use(express.static(frontend))
app.use(cors())


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: " please add an address"
        })
    }
    geo.geo(req.query.address, (error, { place, lat, long } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast.forecast(lat, long, (error, temperature) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                temperature,
                lat,
                long,
                place
            })
        })

    })


})
app.get('', (req, res) => {
    res.render("index", {
        title: "HBS",
        author: "Ashraf"
    })
})
app.get('/products', cors(corsOptions), (req, res) => {
    const query = req.query
    resp = {
        produit: "manette",
        prix: 5000
    }

    res.send(JSON.stringify(resp)
    )


})
fetch("http://localhost:3000/weather?address=Djibouti").then(
    (_data) => {
        _data.json().then(
            (data) => {
                if (data.error) {
                    console.log(data)

                }
                console.log(data)
            }
        )
    }

);


// app.listen(3000, () => {    without heroku
//     console.log("server started on port 3000");

// })
app.listen(port, () => {
    console.log("server started on port " + port);

})