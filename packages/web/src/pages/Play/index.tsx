import React, { useState, useEffect } from "react";

import Board from "../../components/Board";

import { DndProvider } from "react-dnd";

import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "src/classes/Game";
import { socket } from "src/utils/socketUtil";
import { Match, Player } from "@fullstack-ts-chess/shared";

const Play = () => {
  const [game, setGame] = useState<Game | undefined>();

  const startGame = () => {
    socket.emit("find_game");

    socket.on(
      "game_found",
      ({ player, match }: { player: Player; match: Match }) => {
        console.log(player, match);
        setGame(new Game(player, match));
      }
    );
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 h-full">
      <DndProvider backend={HTML5Backend}>
        {game ? <Board game={game} /> : <h1>Looking for match ...</h1>}
      </DndProvider>
    </div>
  );
};

export default Play;
