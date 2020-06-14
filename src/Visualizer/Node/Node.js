import React from "react";
import classes from "./Node.module.css";

const node = props => {
  const row = props.row;
  const col = props.col;

  return (
    <div
      id={`${row}-${col}`}
      className={classes.node}
      //   onMouseDown={onMouseDown.bind(this, row, col)}
      //   onMouseUp={onMouseUp.bind(this, row, col)}
      //   onMouseEnter={onMouseEnter.bind(this, row, col)}
    ></div>
  );
};

export default node;
