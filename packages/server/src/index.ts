import express from "express";
import http from "http";
import cors from "cors";
import io from "socket.io";

import { Match, Move, Player, Position } from "@fullstack-ts-chess/shared";

const app: express.Application = express();

app.use(cors({ origin: "*" }));

const server = http.createServer(app);

const socket = io(server);

let connectedPlayers: io.Socket[] = [];
let queuePlayers: io.Socket[] = [];
let matches: { [match_id: number]: Match } = {};

const startGame = () => {
  let lQueue = queuePlayers.length;

  let white: io.Socket = queuePlayers[lQueue - 2];
  let black: io.Socket = queuePlayers[lQueue - 1];

  const id: number = Math.floor(Math.random() * 1e4) + 1;

  let blackPlayer = new Player(black.id, "black");
  let whitePlayer = new Player(white.id, "white");

  let match: Match = {
    id,
    whitePlayer,
    blackPlayer
  };

  white.emit("game_found", { player: whitePlayer, match });
  black.emit("game_found", { player: blackPlayer, match });

  matches[id] = match;
};

const findMatch = (s: io.Socket) => {
  queuePlayers.push(s);

  console.log(
    queuePlayers.map(p => p.id),
    queuePlayers.length
  );

  if (queuePlayers.length % 2 === 0) {
    console.log("Starting game");
    startGame();
  }
};

const getSocketByPlayer = (player: Player): io.Socket => {
  const socket = connectedPlayers.find(p => p.id === player.id);

  if (socket) return socket;

  throw new Error("Player's socket not found.");
};

const flipMove = ({from, to}: Move): { from: Position, to: Position } => {
  from.row = 7 - from.row;
  to.row = 7 - to.row;

  from.col = 7 - from.col;
  to.col = 7 - to.col;

  return { from, to };
}

const handleMovePiece = (move: Move) => {
  const turn = move.turn;

  let player: io.Socket;

  const flippedMove = flipMove(move);

  move = {
    ...move,
    ...flippedMove
  };

  if (turn === "white") {
    player = getSocketByPlayer(move.match.blackPlayer);
  } else {
    player = getSocketByPlayer(move.match.whitePlayer);
  }

  player.emit("update_board", move);
};

socket.on("connection", (s: io.Socket) => {
  console.log(`New connection... ${s.id}`);
  connectedPlayers.push(s);

  s.on("find_game", () => {
    findMatch(s);
  });

  s.on("move_piece", handleMovePiece);

  s.on("disconnect", () => {
    console.log(`User ${s.id} disconnected`);
    connectedPlayers = connectedPlayers.filter(p => p.id !== s.id);
    queuePlayers = queuePlayers.filter(p => p.id !== s.id);
  });
});

const PORT = 8889;

server.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
