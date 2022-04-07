require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require("path");

const app = express()
const port = process.env.PORT

app.set('views', 'views')
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(logger('dev'))
// app.use(cors({origin: '*'}))

app.use('/', require('./router/router'))
app.get('*', (req, res) => res.render('react'))

const server = http.createServer(app)

async function start() {
    try {
        await mongoose.connect(process.env.MONGO, () => console.log('Connect Mongodb'))
    } catch (e) {
        console.log(e)
    }
}
start()

server.listen(port, () => console.log(`Start server in port ${port}...`))
