const port = process.env.APP_PORT || 3000

const http = require('http');
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
app.set('port', port);

// connection to mongo
require('mongoose')
    .connect("mongodb://localhost/seguridad_ciudadana", {
        useCreateIndex: true,
        useNewUrlParser: true
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
});
