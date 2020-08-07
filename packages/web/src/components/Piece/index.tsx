import React, { ReactNode } from "react";
import { PieceType } from "../../types/Piece";

type Props = {
  piece: PieceType;
  children?: ReactNode;
};

const Piece: React.FC<Props> = ({ piece }: Props) => {
  const style = {
    fontSize: "4rem",
    zIndex: 20
  };

  const renderPiece = () => {
    return (
      <div className="flex items-center content-center justify-center">
        <span style={style}>{piece.char}</span>
      </div>
    );
  };

  return renderPiece();
};

export default Piece;
