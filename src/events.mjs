const events = {
	"conv:join": (socket, convId) => {
		socket.join(convId);
	},
	"conv:leave": (socket, convId) => {
		socket.leave(convId);
	},
	"conv:message:new": (socket, convId, message) => {
		socket.to(convId).emit("conv:message:new", message);
	},
};

export function RegisterEvents(socket) {
  for (const key in events) {
    socket.on(key, (...args) => events[key](socket, ...args));
  }
}
