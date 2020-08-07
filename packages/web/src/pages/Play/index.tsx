import React, { useState, useEffect } from "react";

import Board from "../../components/Board";

import { DndProvider } from "react-dnd";

import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "../../Game";

const Play = () => {
  const [game, setGame] = useState<Game | undefined>();

  useEffect(() => {
    setGame(new Game());
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 h-full">
      <DndProvider backend={HTML5Backend}>
        { game && <Board game={game} /> }
      </DndProvider>
    </div>
  );
};

export default Play;
