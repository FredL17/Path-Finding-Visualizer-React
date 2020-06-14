import React, { Component } from "react";
import Node from "./Node/Node";
import Row from "react-bootstrap/Row";

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    this.setState({
      grid: this.getInitialGrid()
    });
  }

  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const row = [];
      for (let col = 0; col < 30; col++) {
        row.push({
          row: row,
          col: col,
          isStart: false,
          isFinish: false,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null
        });
      }
      grid.push(row);
    }
    return grid;
  };

  render() {
    return (
      <div>
        {this.state.grid.map((row, rowIndex) => {
          return (
            <Row key={rowIndex} className="d-flex justify-content-center">
              {row.map(node => {
                return (
                  <Node
                    key={`${node.row}-${node.col}`}
                    row={node.row}
                    col={node.col}
                  ></Node>
                );
              })}
            </Row>
          );
        })}
      </div>
    );
  }
}

export default Visualizer;
