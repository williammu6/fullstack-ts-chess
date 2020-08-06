import React, {ReactNode} from "react";
import clsx from "clsx";
import {useDrop} from "react-dnd";

type Props = {
  col: number;
  row: number;
  children?: ReactNode;
};


const Tile: React.FC<Props> = ({col, row, children}: Props) => {
  const [{ canDrop }, drop] = useDrop({
    accept: 'pawn',
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  const isDark = (row: number, col: number) => {
    return (row % 2 === 0 && col % 2 === 1) || (row % 2 === 1 && col % 2 === 0);
  };

  return (
    <div ref={drop} className={clsx("flex-1", isDark(col, row) ? "bg-gray-600" : "bg-white")}>
      { children }
      { canDrop }
    </div>
  );
};

export default Tile;
