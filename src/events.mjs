const events = {
	"conv:join": (_, socket, convId) => {
		socket.join(convId);
	},
	"conv:leave": (_, socket, convId) => {
		socket.leave(convId);
	},
  /** @param {import("socket.io").Socket} io */
	"conv:message:new": async (_, socket, convId, message) => {
    console.log({ convId, message });
    socket.to(convId).emit("conv:message:receive", message);
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
