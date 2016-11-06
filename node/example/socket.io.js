var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('events');
var emitter = new events.EventEmitter();
var id = null;

app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});

//接受
app.get("/receiveMessage", function(req, res) {
    emitter.emit("webreceive", { id:10 });
    res.send("i can play");
});

io.on('connection', function(socket){
    if(id == null) {
        id = socket.id;
    };
    //只发给当前客户端
    socket.emit("hello", "socket:" + socket.id);
    //发送给所有连接的客户端
    io.emit("hello", "io:" + socket.id);

    socket.on("disconnect", function() {
        console.log("a user go out");
    });

    socket.on("message", function(obj) {
        io.emit("message", obj);
    });

    emitter.on("webreceive", function(obj) {
        if(socket.id == id) {
            socket.emit("message", obj);
            console.log("i'm webreceive");
        }
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
