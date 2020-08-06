import React from "react";

import Tile from "../Tile";

import "./styles.css";

const Board = () => {
  return (
    <div className="border-solid border-4 border-gray-700 board">
      {Array.from({ length: 8 }).map((_, row) => (
        <div className="flex flex-row row">
          {Array.from({ length: 8 }).map((_, col) => (
            <Tile row={row} col={col} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
