const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const peerServer = ExpressPeerServer(server, { debug: true, path: "/" });

app.use(cors());
app.use("/peerjs", peerServer);
app.get("/ping", (_, res) => res.send("pong"));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});

// PeerJS server events (if needed)
peerServer.on('connection', (client) => {
  console.log('A peer connected:', client.getId());
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
