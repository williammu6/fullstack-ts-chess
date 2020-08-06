import React from "react";

import Tile from "../Tile";

import "./styles.css";

const Board = () => {

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <div>
      <div className="flex">
        <div className="flex font-bold flex-col items-center justify-around w-4 ">
          { Array.from({length: 8}).map((_, row) => (
            <div className="flex-initial">
              <h1>{ 8 - row }</h1>
            </div>
          ))}
        </div>

        <div className="border-solid border-4 border-gray-700 board">
          {Array.from({ length: 8 }).map((_, row) => (
            <div className="flex flex-row row">
              {Array.from({ length: 8 }).map((_, col) => (
                <Tile row={row} col={col} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex ml-4 font-bold flex-row items-center justify-around">
        { letters.map(letter => (
          <div className="flex-initial">
            <h1>{ letter }</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
