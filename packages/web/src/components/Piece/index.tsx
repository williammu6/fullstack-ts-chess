import React, { ReactNode } from "react";
import { PieceType } from "@fullstack-ts-chess/shared";

type Props = {
  piece: PieceType;
  children?: ReactNode;
};

const Piece: React.FC<Props> = ({ piece }: Props) => {
  const style: React.CSSProperties = {
    fontSize: "4.5rem",
    zIndex: 20
  };

  const renderPiece = () => {
    return (
      <div className="flex items-center content-center justify-center unselectable">
        <span style={style}>{piece.char}</span>
      </div>
    );
  };

  return renderPiece();
};

export default Piece;
