import io from "socket.io-client";

const socket = io.connect("http://localhost:8889");

export { socket };
