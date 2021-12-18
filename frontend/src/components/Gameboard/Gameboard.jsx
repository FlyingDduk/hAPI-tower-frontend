import React from "react";
import "./Gameboard.css";
import Cell from "../Cell/Cell.jsx";

function Gameboard(props) {
  const grid = [];
  for (let row = 0; row < 35; row++) {
      const currentRow = []
    for (let col = 0; col < 70; col++) { 
        currentRow.push(<Cell key={`${col}${row}`}/>) 
    }
    grid.push(currentRow)
  }
  return (
      <div className = "game-board">
          
          {grid}
      </div>
  )
}

export default Gameboard;
