import React from "react";

import { DragPreviewImage, useDrag } from "react-dnd";

const pawnImage = "w_pawn.png";

const pawnStyle: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 'bold',
  cursor: 'move',
}

const Pawn = () => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'pawn'},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <>
      <DragPreviewImage connect={preview} src={pawnImage} />
      <div
        ref={drag}
        style={{
          ...pawnStyle,
          opacity: isDragging ? 0 : 1,
        }}
      >
        <img src={pawnImage} alt="pawn" />
      </div>
    </>
  );
};

export default Pawn;
