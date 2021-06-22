const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var emoji = require('emoji.json');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');
     io.emit('emojilist', emoji);
   io.emit('chat message', 'User has Connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
	io.emit('chat message', 'User has Disconnected');
  });
});
io.emit('some event', { someProperty: 'some value', someProperty: 'other value' , otherProperty: 'other value'}); // This will emit the event to all connected sockets




io.on('connection', (socket) => {
  socket.on('is typing', (typing , name) => {
	io.emit('is typing', typing , name);
  });
   socket.on('chat message', (msg , name) => {
    console.log(name + ' '+ msg);
  });
   socket.on('chat message', (msg , name) => {
    io.emit('chat message', name + ' '+ msg);
  });
});



http.listen(3000, () => {
  console.log('listening on *:3000');
});