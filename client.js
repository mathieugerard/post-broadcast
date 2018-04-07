
var config = {
    server: process.env.SERVER || 'http://localhost:3005',
    postTo: process.env.POSTTO || 'http://localhost:3004'
};

var request = require('request');

var socket = require('socket.io-client')(config.server, {
    autoConnect: false
});

socket.on('connect', function () {
    console.log('Socket connected.');
});

socket.on('post', function(data){

    request({
        method: 'POST',
        uri: config.postTo + data.path,
        json: data.body
    }, function (error, response, body) {
        console.log('POST ' + (response && response.statusCode) + ' ' + data.path);
    });

});

socket.connect();
