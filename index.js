const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
var ssocket;
io.on('connection', (socket) => {
  console.log('a user connected');
 // socket.emit('chat message',"hello");
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message',msg);
    
  });
  ssocket=socket;
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});