import React from "react";

import Tile from "../Tile";

const Board = () => {
  return (
    <div className="border-solid border-4 border-gray-600">
      {Array.from({ length: 8 }).map(() => (
        <div className="flex flex-row">
          {Array.from({ length: 8 }).map(() => (
            <Tile />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
