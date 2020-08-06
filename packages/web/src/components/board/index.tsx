import React from "react";

import Tile from "../Tile";

import "./styles.css";

const Board = () => {
  const isDark = (row: number, col: number) => {
    return (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1);
  };

  return (
    <div className="border-solid border-4 border-gray-700 board">
      {Array.from({ length: 8 }).map((_, row) => (
        <div className="flex flex-row row">
          {Array.from({ length: 8 }).map((_, col) => (
            <Tile dark={isDark(row, col)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
