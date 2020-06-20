import React from "react";
import "./Node.css";

function Node(props) {
  const row = props.row;
  const col = props.col;
  const isStart = props.isStart;
  const isFinish = props.isFinish;
  const isWall = props.isWall;
  const isVisited = props.isVisited;
  const isAnimationFinished = props.isAnimationFinished;
  const onShortestPath = props.onShortestPath;

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
  if (isVisited && isAnimationFinished) {
    classes.push("nodeVisited");
  }
  if (onShortestPath && isAnimationFinished) {
    classes.push("nodeShortestPath");
  }
  return (
    <div
      id={`${row}-${col}`}
      className={classes.join(" ")}
      onClick={props.toggle}
    ></div>
  );
}

export default Node;
