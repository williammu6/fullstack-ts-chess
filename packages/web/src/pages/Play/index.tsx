import React from "react";

import Board from "../../components/Board";
import { DndProvider } from "react-dnd";

import { HTML5Backend } from "react-dnd-html5-backend";

const Play = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 h-full">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
};

export default Play;
