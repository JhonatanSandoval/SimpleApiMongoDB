const port = process.env.APP_PORT || 3000

const http = require('http');
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
app.set('port', port);

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
