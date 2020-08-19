import React, { ReactNode } from "react";
import { PieceType } from "@fullstack-ts-chess/shared";
import { useDrag } from "react-dnd";

type Props = {
  piece: PieceType;
  row: number;
  col: number;
  handleTileClick(row: number, col: number): void;
  children?: ReactNode;
};

const Piece: React.FC<Props> = ({ piece, handleTileClick, row, col }: Props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id: piece.name, piece, type: piece.name },
    begin: () => handleTileClick(row, col),
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const style: React.CSSProperties = {
    fontSize: "4.5rem",
    zIndex: 20
  };
  const renderPiece = () => {
    return (
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0 : 1,
        }}
        className="flex items-center content-center justify-center unselectable"
      >
        {isDragging}
        <span style={style}>{piece.char}</span>
      </div>
    );
  };

  return renderPiece();
};

export default Piece;
