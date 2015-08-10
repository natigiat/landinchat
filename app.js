var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//count user online
var userCount = 0;

app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  userCount++;
  io.sockets.emit('userCount',userCount);
  socket.on('disconnect', function(){
    userCount--;
    io.sockets.emit('userCount',userCount);
  });

  socket.on('chat message', function(msg){
   	io.emit('chat message', msg);
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});