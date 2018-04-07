'use strict';

var config = {
    port: process.env.PORT || 3005,
    getResponseText: process.env.GETTEXT || 'Hello',
    maxBodySize: process.env.MAX_BODY_SIZE || '50mb',    // See all valid formats in: https://www.npmjs.com/package/bytes
};

var _ = require('lodash');

var app = require('express')();
var server = require('http').Server(app);

// Express configuration
app.use(require('body-parser').json({limit: config.maxBodySize}));

// Socket initialization
const io = require('socket.io')(server, {
    serveClient: false
});

io.on('connection', function (socket) {
    console.log('new client connected');
});

// Sent validator as required by Meraki
app.get('*', function (req, res) {
    res.status(200).send(config.getResponseText);
});

// Receive notifications
app.post('*', function (req, res) {

    console.log(req.path);

    io.emit('post', {
        path: req.path,
        body: req.body
    });

    res.status(200).send();
});

// Start server
server.listen(config.port, function () {
    console.log('Server listening on port ' + config.port);
});
