var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
// 请求静态资源部分
app.use(express.static('public'))
// socket部分
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('客户端已经连接');
    socket.on('message', function (msg) {
        console.log(msg);
        socket.send('sever:' + msg);
    });
});
server.listen(3000)