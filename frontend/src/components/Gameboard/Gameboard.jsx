import React from "react";
import "./Gameboard.css";
import Cell from "../Cell/Cell.jsx";

function Gameboard(props) {
  const grid = [];
 
    for (let row = 0; row < 10; row++) {
      grid.push([]);
      for (let col = 0; col < 10; col++) {
        grid[row].push(<Cell key={`${col}${row}`} color="red" />);
      }
    }
  return grid
}

export default Gameboard;
