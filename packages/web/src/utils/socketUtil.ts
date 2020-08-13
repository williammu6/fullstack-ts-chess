import io from "socket.io-client";
import { Match } from "@fullstack-ts-chess/shared";

export class SocketClient {
  private socket: SocketIOClient.Socket;

  init() {}

  async findMatch() {
    return new Promise(resolve => {
      this.socket.emit("find_match", "lul");

      this.socket.on("match_found", (match: Match) => {
        resolve(match);
      });
    });
  }

  disconnect() {
    console.log("Socket disconnected");
    this.socket.disconnect();
  }

  constructor() {
    this.socket = io.connect("http://localhost:8889");

    this.init();
  }
}
