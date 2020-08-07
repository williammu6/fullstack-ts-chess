import React, { ReactNode } from "react";
import { pieceString } from "../../Constants";

type Props = {
  color: string;
  children?: ReactNode;
};

const Pawn: React.FC<Props> = ({ color }: Props) => {
  const style = {
    fontSize: "4rem"
  };
  return (
    <div className="flex items-center content-center justify-center">
      <span style={style}>
        {color === "black" ? pieceString.BLACK_PAWN : pieceString.WHITE_PAWN}
      </span>
    </div>
  );
};

export default Pawn;
