import express from "express";
import http from "http";
import cors from "cors";
import io from "socket.io";

import { Match } from "@fullstack-ts-chess/shared";

const app: express.Application = express();

app.use(cors({ origin: "*" }));

const server = http.createServer(app);

const socket = io(server);

let connectedPlayers: io.Socket[] = [];
let queuePlayers: io.Socket[] = [];
let matches: { [match_id: number]: Match } = {};

const startGame = () => {
  let lQueue = queuePlayers.length;

  let whitePlayer: io.Socket = queuePlayers[lQueue - 2];
  let blackPlayer: io.Socket = queuePlayers[lQueue - 1];

  const id: number = Math.floor(Math.random() * 1e4) + 1;

  let match: Match = {
    id,
    whitePlayer: whitePlayer.id,
    blackPlayer: blackPlayer.id
  };

  whitePlayer.emit("match_found", JSON.stringify(match));
  blackPlayer.emit("match_found", match);

  matches[id] = match;
};

const findMatch = (s: io.Socket) => {
  queuePlayers.push(s);

  console.log(queuePlayers.map(p => p.id), queuePlayers.length);

  if (queuePlayers.length % 2 === 0) {
    console.log("Starting game");
    startGame();
  }
};

socket.on("connection", (s: io.Socket) => {
  console.log(`New connection... ${s.id}`);
  connectedPlayers.push(s);

  s.on("find_match", () => {
    findMatch(s);
  });

  s.on("disconnect", () => {
    console.log("A user disconnected");
    connectedPlayers = connectedPlayers.filter(p => p.id !== s.id);
    queuePlayers = queuePlayers.filter(p => p.id !== s.id);
  });
});

const PORT = 8889;

server.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
