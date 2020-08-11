import * as express from "express";
import * as http from "http";
import * as cors from "cors";
import * as io from "socket.io";

import { PieceColor } from "../../web/src/types/Piece";

const app: express.Application = express();

app.use(cors({ origin: "*" }));

const server = http.createServer(app);

const socket = io(server);

type Match = {
  id: number;
  opponent: string;
};

let players: io.Socket[] = [];

const colors: PieceColor[] = ["white", "black"];

const startMatch = () => {
  const id = Math.floor(Math.random() * 1000) + 1;
  console.log(players.map(p => p.id));
  console.log("Match ID: ", id);
  for (let i = players.length - 2; i < players.length; i++) {
    const match: Match = {
      id,
      opponent: i % 2 === 0 ? players[i + 1].id : players[i - 1].id
    };
    console.log(match);
    players[i].emit("new_match", match);
  }
};

const handleMatchmaking = (s: io.Socket) => {
  players.push(s);

  const payload = {
    id: s.id,
    color: colors[players.length % 2]
  };

  s.emit("info", payload);

  if (players.length % 2 === 0) startMatch();
};

const handleMove = (ws: WebSocket, message: any) => {
  console.log(ws, message);
};

socket.on("connection", (s: io.Socket) => {
  handleMatchmaking(s);

  socket.on("move", handleMove);

  socket.on("disconnect", () => {
    console.log("Disconnected", s.id);

    players = players.filter(p => p.id !== s.id);
  });
});


server.listen(process.env.PORT || 8889, () => {
  console.log(`Server started on port ${server.address()} :)`);
});
