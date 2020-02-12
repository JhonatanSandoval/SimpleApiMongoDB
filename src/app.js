const port = process.env.APP_PORT || 3000

const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('port', port)

// connection to mongo
require('mongoose')
    .connect("mongodb://localhost/testing_api", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection error', err))


// config routes
const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

const postRoute = require('./routes/postRoute')
app.use('/posts', postRoute)

const server = http.createServer(app);
server.listen(port, err => {
    if (err) throw err
    console.log('=======> Server started on port', port)
})
