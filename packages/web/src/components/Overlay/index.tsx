import React from "react";

const Overlay = () => {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: '33%',
    height: '33%',
    top: '2px',
    left: '2px',
    right: '2px',
    bottom: '2px',
    zIndex: 5,
    margin: 'auto',
    background: 'black',
    borderRadius: '50%',
    opacity: 0.3
  };

  return (
    <div style={style}></div>
  );
};

export default Overlay;
