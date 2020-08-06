import React from "react";

import Tile from "../Tile";

import "./styles.css";

const Board = () => {
  return (
    <div className="border-solid border-4 border-gray-600 board">
      {Array.from({ length: 8 }).map(() => (
        <div className="flex flex-row row">
          {Array.from({ length: 8 }).map(() => (
            <Tile />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
