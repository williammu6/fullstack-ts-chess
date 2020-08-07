import React, { ReactNode } from "react";
import { IPiece } from "../../types/Piece";

type Props = {
  piece: IPiece | null;
  children?: ReactNode;
};

const Piece: React.FC<Props> = ({ piece }: Props) => {
  const style = {
    fontSize: "4rem"
  };

  const renderPiece = () => {
    if (piece)
      return (
        <div className="flex items-center content-center justify-center">
          <span style={style}>{piece.char}</span>
        </div>
      );

    return null;
  };

  return renderPiece();
};

export default Piece;
