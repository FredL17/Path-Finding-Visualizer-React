import React from "react";
import "./Node.css";

function Node(props) {
  const row = props.row;
  const col = props.col;
  const isStart = props.isStart;
  const isFinish = props.isFinish;
  const isWall = props.isWall;

  const extraClassName = isFinish
    ? "nodeFinish"
    : isStart
    ? "nodeStart"
    : isWall
    ? "nodeWall"
    : "";

  const classes = [];
  classes.push(extraClassName);
  classes.push("node");

  return (
    <div
      id={`${row}-${col}`}
      className={classes.join(" ")}
      onClick={props.toggle}
    ></div>
  );
}

export default Node;
