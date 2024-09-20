import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";
import cors from "cors";
import { RegisterEvents } from "./events.mjs";

const app = express();
const server = createServer(app);
const io = new Server(server);

const peerServer = ExpressPeerServer(server, { debug: true, path: "/" });

app.use(cors());
app.use("/peerjs", peerServer);
app.get("/ping", (_, res) => res.send("pong"));

io.on("connection", (socket) => {
	RegisterEvents(socket);
});

// PeerJS server events (if needed)
peerServer.on("connection", (client) => {
  console.log("A peer connected:", client.getId());
});

peerServer.on("disconnect", (client) => {
  console.log("A peer disconnected:", client.getId());
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
