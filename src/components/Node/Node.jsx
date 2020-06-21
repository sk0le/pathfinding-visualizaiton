import React, { Component } from "react";

class Node extends Component {
  // handeDragStart(e) {
  //   e.dataTransfer.setData("Node", e.target.id);
  // }

  // handleDragDrop(e, col, row) {
  //   e.preventDefault();
  //   let data = e.dataTransfer.getData("Node");
  //   // e.target.appendChild(document.getElementById(data));
  //   // e.dataTransfer.clearData();
  //   // e.target.parentNode.replaceChild(
  //   //   document.getElementById(data),
  //   //   e.target.getAttribute("id")
  //   // );
  //   data = `node-${row}-${col}`;
  //   console.log(data);
  //   e.target.replaceWith(document.getElementById(data));
  // }

  // handleDragOver(e) {
  //   e.preventDefault();
  // }

  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";

    // const draggableTF = isStart ? true : isFinish ? true : false;
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        // draggable={draggableTF}
        // onDragStart={this.handeDragStart}
        // onDrop={this.handleDragDrop}
        // onDragOver={this.handleDragOver}
      ></div>
    );
  }
}

export default Node;
