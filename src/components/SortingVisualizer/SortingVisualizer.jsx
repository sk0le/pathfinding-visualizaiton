import React, { Component } from "react";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithms/djikstra";
import Node from "../Node/Node";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 19;
const FINISH_NODE_COL = 49;

class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      sentence: "Start the algorithm!",
      isRunning: false,
    };

    this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
    this.animateDijkstra = this.animateDijkstra.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.randomWalls = this.randomWalls.bind(this);
  }

  componentDidMount() {
    const grid = getGrid();
    this.setState({
      grid: grid,
    });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  clearBoard() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);

    const newGrid = getGrid();
    this.setState({
      grid: newGrid,
      sentence: "Start the algorithm!",
    });

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];

      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node";
    }

    // Todo : find better solution to this problem
    document.getElementById(
      `node-${startNode.row}-${startNode.col}`
    ).className = "node node-start";
    document.getElementById(
      `node-${finishNode.row}-${finishNode.col}`
    ).className = "node node-finish";
    document.getElementById(`node-15-0`).className = "node";
    document.getElementById(`node-16-1`).className = "node";
    document.getElementById(`node-17-0`).className = "node";
    document.getElementById(`node-17-2`).className = "node";
    document.getElementById(`node-18-1`).className = "node";
    document.getElementById(`node-18-3`).className = "node";
    document.getElementById(`node-19-2`).className = "node";
    document.getElementById(`node-19-4`).className = "node";
    document.getElementById(`node-19-21`).className = "node";
  }

  randomWalls(e) {
    const { grid } = this.state;

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 50; j++) {
        let randomNum = Math.random();
        if (randomNum < 0.2) {
          const newGrid = getNewGridWithWallToggled(grid, i, j);
          this.setState({ grid: newGrid });
        }
      }
    }
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }

    if (nodesInShortestPathOrder.length === 1) {
      this.setState({ sentence: "No possible path!" });
    } else {
      this.setState({ sentence: "Done!" });
    }

    this.setState({ isRunning: false });
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.setState({ isRunning: true });
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    return (
      <>
        <Navbar />
        <h1 className="finish">{this.state.sentence}</h1>
        <div className="visualize">
          {this.state.grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="div-node">
                {row.map((node, nodeIndex) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      row={row}
                      mouseIsPressed={this.state.mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    />
                  );
                })}
              </div>
            );
          })}
          <div className="buttons">
            <button
              onClick={this.visualizeDijkstra}
              disabled={this.state.isRunning}
              className="btn"
            >
              Visualize
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                this.clearBoard();
              }}
              disabled={this.state.isRunning}
              className="btn"
            >
              Clear Board
            </button>
            <button
              disabled={this.state.isRunning}
              className="btn"
              onClick={this.randomWalls}
            >
              Random Walls
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const getGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default SortingVisualizer;
