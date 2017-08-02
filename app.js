var express = require('express');
var app = express();
var path = require('path');
usernames = [];

app.use(express.static(path.join(__dirname, 'js')));


server = require('http').createServer(app);
io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000);
console.log('server started');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){

    socket.on('new user', function(data, callback){
        if(usernames.indexOf(data) != -1){
            callback(false);
        }else{
            callback(true);
            socket.username = data;
            usernames.push(socket.username);
            updateUsernames();
        }
    });

    //Update usernames function
    function updateUsernames(){
        io.sockets.emit('usernames', usernames);
    }


    //Send message
    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data, user: socket.username});

    });

    //disconnect user
    socket.on('disconnect', function(data){
        if(!socket.username) return;
        usernames.splice(usernames.indexOf(socket.username), 1);
        updateUsernames();
    })
});