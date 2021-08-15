const http = require('http');
const db = require('./server/db/db');
const socket = require('socket.io');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = socket(server);
const path = require('path');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;

// handle sockets
require('./server/socket/index')(io);

module.exports = app;

// syncing db
db.sync().then(() => console.log('Database is synced'));

// serving up files in the public folder
app.use(express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, '/public')));

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// requests to our api is sent mounted on /api
app.use('/api', require('./server/api/index'));

// requests not match api should default to 
app.use('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '/public/index.html'))
})

// error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'Internal server error');
})
server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));