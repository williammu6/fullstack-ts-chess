import React, { useState, useEffect } from "react";

import Board from "../../components/Board";

import { DndProvider } from "react-dnd";

import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "src/classes/Game";
import { SocketClient } from "src/utils/socketUtil";

const Play = () => {
  const [game, setGame] = useState<Game | undefined>();

  const startGame = async () => {
    const socket = new SocketClient();
    const match = await socket.findMatch();
    console.log(match);
    setGame(new Game());
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
