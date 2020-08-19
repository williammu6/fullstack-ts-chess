import React, { ReactNode } from "react";
import clsx from "clsx";
import Overlay from "../Overlay";
import { Position, PieceColor, PieceName } from "@fullstack-ts-chess/shared";
import { useDrop } from "react-dnd";

interface Props {
  col: number;
  row: number;
  xLegend: string | null;
  yLegend: number | null;
  side: PieceColor;
  isValid: boolean;
  isEmpty: boolean;
  children?: ReactNode;
  handleTileClick(row: number, col: number): void;
  handleMovePiece(to: Position): void;
}

const legendFont: React.CSSProperties = {
  fontSize: "0.9rem",
  fontWeight: "bolder",
  MozUserSelect: "none",
  WebkitUserSelect: "none",
  fontFamily: "Monaco"
};

const styleXLegend: React.CSSProperties = {
  position: "absolute",
  bottom: "4px",
  right: "4px",
  zIndex: 5
};
const styleYLegend: React.CSSProperties = {
  position: "absolute",
  top: "4px",
  left: "4px",
  zIndex: 5
};

const Tile: React.FC<Props> = ({
  xLegend,
  yLegend,
  isValid,
  isEmpty,
  col,
  side,
  row,
  children,
  handleTileClick,
  handleMovePiece
}: Props) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [
      PieceName.KING,
      PieceName.PAWN,
      PieceName.BISHOP,
      PieceName.QUEEN,
      PieceName.ROOK,
      PieceName.KNIGHT,
    ],
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: isValid,
    }),
    drop: () => {
      if (isValid)
        handleMovePiece({ row, col });
    }
  });

  const isDark = (row: number, col: number) => {
    return (row + col) % 2 === (side === "black" ? 1 : 0);
  };

  const getBackground = (): string => {
    if (isOver && isValid) return 'bg-green-200';
    if (isOver && !isValid) return 'bg-red-200';
    return isDark(row, col) ? "bg-gray-600" : "bg-white";
  };

  const isClickable = (): boolean => {
    return !isEmpty || isValid;
  };

  const handleClick = () => {
    if (isValid) {
      handleMovePiece({ row, col });
    } else {
      handleTileClick(row, col);
    }
  };

  return (
    <div
      ref={drop}
      className={clsx(
        "relative flex-1 unselectable",
        getBackground(),
        isClickable() && "cursor-pointer"
      )}
      onClick={handleClick}
    >
      {children}
      {isValid && <Overlay />}
      <span style={{ ...styleYLegend, ...legendFont }}>{yLegend}</span>
      <span style={{ ...styleXLegend, ...legendFont }}>{xLegend}</span>
    </div>
  );
};

export default Tile;
