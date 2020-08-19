import io from "socket.io-client";

const host = "192.168.15.8";

const socket = io.connect(`http://${host}:8889`);

export { socket };
