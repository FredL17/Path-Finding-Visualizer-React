import React, { Component } from "react";
// Custom components.
import Node from "./Node/Node";
import Menu from "./Menu/Menu";
//  Path finding algorithms.
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
// React bootstrap.
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 25;

class Visualizer extends Component {
  // Constructor method.
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false
    };
  }

  // Initialize the grid after the view is rendered.
  componentDidMount() {
    this.setState({
      grid: this.getInitialGrid()
    });
  }

  // Generate the initial grid.
  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 30; col++) {
        currentRow.push({
          row: row,
          col: col,
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null
        });
      }
      grid.push(currentRow);
    }
    return grid;
  };

  // Reset the grid.
  resetGrid = () => {
    this.setState(
      {
        grid: []
      },
      () => {
        this.setState({
          grid: this.getInitialGrid()
        });
      }
    );
  };

  //
  mouseDownHandler = (row, col) => {
    const newGrid = this.getNewGridWithWall(this.state.grid, row, col);
    this.setState({
      grid: newGrid,
      mouseIsPressed: true
    });
  };

  mouseEnterHandler = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWall(this.state.grid, row, col);
    this.setState({
      grid: newGrid
    });
  };

  mouseUpHandler = () => {
    this.setState({
      mouseIsPressed: false
    });
  };

  animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`${node.row}-${node.col}`).className =
          "node nodeVisited";
      }, 10 * i);
    }
  };

  animateShortestPath = nodesInShortestPathOrder => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`${node.row}-${node.col}`).className =
          "node nodeShortestPath";
      }, 50 * i);
    }
  };

  getNewGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  visualizeDijkstra = () => {
    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    console.log(this.state.grid);
  };

  render() {
    return (
      <Container className="d-flex w-100 h-75 mx-auto my-auto">
        <Row className="d-flex w-100 h-75 mx-auto my-auto">
          <Col className="mw-75 my-3" sm={8}>
            {this.state.grid.map((row, rowIndex) => {
              return (
                <Row
                  key={rowIndex}
                  className="d-flex w-100 justify-content-center"
                >
                  {row.map(node => {
                    return (
                      <Node
                        key={`${node.row}-${node.col}`}
                        row={node.row}
                        col={node.col}
                        isStart={node.isStart}
                        isFinish={node.isFinish}
                        isWall={node.isWall}
                        onMouseDown={this.mouseDownHandler.bind(
                          this,
                          node.row,
                          node.col
                        )}
                        onMouseEnter={this.mouseEnterHandler.bind(
                          this,
                          node.row,
                          node.col
                        )}
                        onMouseUp={this.mouseUpHandler}
                      ></Node>
                    );
                  })}
                </Row>
              );
            })}
          </Col>
          <Col className="mw-25 my-3" sm={4}>
            <Menu reset={this.resetGrid} start={this.visualizeDijkstra}></Menu>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Visualizer;
