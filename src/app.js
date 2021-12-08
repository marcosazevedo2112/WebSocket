const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.use(express.static(__dirname + '/../public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname +'/../public/index.html'));
});

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    io.emit('message', data);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
