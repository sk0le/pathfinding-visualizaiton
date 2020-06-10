import React from "react";

export default function Navbar() {
  return (
    <nav>
      <h1>Pathfinding Visualization</h1>
      <div className="explanation">
        <div className="node-start-exp">
          <div className="node-start-vis"></div>
          <p>Start Node</p>
        </div>
        <div className="node-finish-exp">
          <div className="node-finish-vis"></div>
          <p>Finish Node</p>
        </div>
        <div className="node-wall-exp">
          <div className="node-wall-vis"></div>
          <p>Wall Node</p>
        </div>
        <div className="node-visited-exp">
          <div className="node-visited-vis"></div>
          <p>Visited Node</p>
        </div>
        <div className="node-shortest-path-exp">
          <div className="node-shortest-path-vis"></div>
          <p>Shortest-path Node</p>
        </div>
        <div className="node-unvisited-exp">
          <div className="node-unvisited-vis"></div>
          <p>Unvisited Node</p>
        </div>
      </div>
    </nav>
  );
}
