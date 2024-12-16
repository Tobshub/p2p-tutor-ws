const events = {
	"conv:join": (_, socket, convId) => {
		socket.join(convId);
	},
	"conv:leave": (_, socket, convId) => {
		socket.leave(convId);
	},
  /** @param {import("socket.io").Socket} socket */
	"conv:message:new": async (_, socket, convId, message) => {
    socket.to(convId).emit("conv:message:receive", message);
	},
  /** @param {import("socket.io").Socket} socket */
  "conv:call:init": async (_, socket, convId, peerId) => {
    socket.to(convId).emit("conv:call:req", peerId);
  },
};

export function RegisterEvents(io, socket) {
  for (const key in events) {
    socket.on(key, (...args) => {
      console.log("RECEIVED:", key);
      return events[key](io, socket, ...args)
    });
  }
}
