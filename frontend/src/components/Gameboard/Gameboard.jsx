import React from "react";
import "./Gameboard.css";
import Cell from "../Cell/Cell.jsx";

function Gameboard(props) {
  const grid = [];

  for (let row = 0; row < 20; row++) {
    grid.push([]);
    for (let col = 0; col < 20; col++) {
      grid[row].push(<Cell key={`${col}${row}`}/>);
      
    }
  }
  return (
      <div className = "game-board">
          {grid}
      </div>
  )
}

export default Gameboard;
