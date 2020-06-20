import React, { Component } from "react";
// Custom components.
import Node from "./Node/Node";
import Menu from "./Menu/Menu";
import GridControls from "./GridControls/GridControls";
//  Path finding algorithms.
import dijkstra from "../algorithms/dijkstra";
import dfs from "../algorithms/dfs";
import bfs from "../algorithms/bfs";
import getNodesInShortestPathOrder from "../algorithms/utility";
// React Bootstrap.
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class Visualizer extends Component {
  // Constructor method.
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      startNode: {
        row: -1,
        col: -1
      },
      finishNode: {
        row: -1,
        col: -1
      },
      isAnimationFinished: true,
      selectedSymbol: "start"
    };
  }

  // Initialize the grid after the view is rendered.
  componentDidMount() {
    const initialGrid = this.getInitialGrid();
    this.setState({
      grid: initialGrid
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
          isStart: false,
          isFinish: false,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
          onShortestPath: false
        });
      }
      grid.push(currentRow);
    }
    return grid;
  };

  // Start the animation.
  startAnimation = selectedAlgorithm => {
    this.setState({
      isAnimationFinished: false
    });
    switch (selectedAlgorithm) {
      case "dijkstra":
        this.visualizeDijkstra();
        break;
      case "dfs":
        this.visualizeDFS();
        break;
      case "bfs":
        this.visualizeBFS();
        break;
      default:
        break;
    }
  };

  // Reset the grid.
  resetGrid = () => {
    const newGrid = this.getInitialGrid();
    this.setState({
      grid: newGrid
    });
  };

  changeSymbolHandler = event => {
    this.setState({
      selectedSymbol: event.target.value
    });
  };

  nodeToggleHandler = (row, col) => {
    switch (this.state.selectedSymbol) {
      case "start":
        this.startNodeHandler(row, col);
        break;
      case "finish":
        this.finishNodeHandler(row, col);
        break;
      case "wall":
        this.wallNodeHandler(row, col);
        break;
      default:
        break;
    }
  };

  startNodeHandler = (newRow, newCol) => {
    if (
      this.state.startNode.row === newRow &&
      this.state.startNode.col === newCol
    )
      return;
    this.setState({
      startNode: {
        row: newRow,
        col: newCol
      }
    });
  };

  finishNodeHandler = (newRow, newCol) => {
    if (
      this.state.finishNode.row === newRow &&
      this.state.finishNode.col === newCol
    )
      return;
    this.setState({
      finishNode: {
        row: newRow,
        col: newCol
      }
    });
  };

  wallNodeHandler = (newRow, newCol) => {};

  // Generate the new grid with toggled nodes.
  getNewGridWithWall = (grid, row, col) => {
    // Start node and finish node can't be toggled.
    if (row === this.state.startNode.row && col === this.state.startNode.col)
      return grid;
    if (row === this.state.finishNode.row && col === this.state.finishNode.col)
      return grid;

    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  // Animate Dijkstra's algorithm.
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

  // Wrapper method for animateDijkstra().
  visualizeDijkstra = () => {
    const grid = this.state.grid;
    const startNode = grid[this.state.startNode.row][this.state.startNode.col];
    const finishNode =
      grid[this.state.finishNode.row][this.state.finishNode.col];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  // Animate Depth-first Search.
  animateDFS = visitedNodesInOrder => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(visitedNodesInOrder);
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

  // Wrapper method for animateDFS().
  visualizeDFS = () => {
    const grid = this.state.grid;
    const startNode = grid[this.state.startNode.row][this.state.startNode.col];
    const finishNode =
      grid[this.state.finishNode.row][this.state.finishNode.col];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    this.animateDFS(visitedNodesInOrder);
  };

  // Animate Breadth-first Search.
  animateBFS = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
          console.log("state after animation");
          console.log(this.state.grid);
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

  // Wrapper method for animateBFS().
  visualizeBFS = () => {
    const grid = this.state.grid;
    const startNode = grid[this.state.startNode.row][this.state.startNode.col];
    const finishNode =
      grid[this.state.finishNode.row][this.state.finishNode.col];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  // Animate the shortest path from the start node to the finish node.
  animateShortestPath = nodesInShortestPathOrder => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`${node.row}-${node.col}`).className =
          "node nodeShortestPath";
        if (i === nodesInShortestPathOrder.length - 1) {
          this.setState({
            isAnimationFinished: true
          });
        }
      }, 50 * i);
    }
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
                  className="d-flex w-100 justify-content-center mx-auto"
                >
                  {row.map(node => {
                    return (
                      <Node
                        key={`${node.row}-${node.col}`}
                        row={node.row}
                        col={node.col}
                        isStart={
                          node.row === this.state.startNode.row &&
                          node.col === this.state.startNode.col
                        }
                        isFinish={
                          node.row === this.state.finishNode.row &&
                          node.col === this.state.finishNode.col
                        }
                        isWall={node.isWall}
                        isVisited={node.isVisited}
                        isAnimationFinished={this.state.isAnimationFinished}
                        onShortestPath={node.onShortestPath}
                        toggle={this.nodeToggleHandler.bind(
                          this,
                          node.row,
                          node.col
                        )}
                      ></Node>
                    );
                  })}
                </Row>
              );
            })}
          </Col>
          <Col className="mw-25 my-3" sm={4}>
            <Menu
              reset={this.resetGrid}
              start={this.startAnimation}
              isAnimationFinished={this.state.isAnimationFinished}
            ></Menu>
            <GridControls
              changeSymbol={this.changeSymbolHandler}
              currentSymbol={this.state.selectedSymbol}
            ></GridControls>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Visualizer;
