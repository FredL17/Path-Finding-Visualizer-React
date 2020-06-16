import React from "react";
import "./Node.css";

function Node(props) {
  const row = props.row;
  const col = props.col;
  const isStart = props.isStart;
  const isFinish = props.isFinish;
  const isWall = props.isWall;
  const onMouseDown = props.onMouseDown;
  const onMouseUp = props.onMouseUp;
  const onMouseEnter = props.onMouseEnter;

  const extraClassName = isFinish
    ? "nodeFinish"
    : isStart
    ? "nodeStart"
    : isWall
    ? "nodeWall"
    : "";

  return (
    <div
      id={`${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={onMouseDown.bind(this, row, col)}
      onMouseUp={onMouseUp.bind(this, row, col)}
      onMouseEnter={onMouseEnter.bind(this, row, col)}
    ></div>
  );
}

export default Node;
