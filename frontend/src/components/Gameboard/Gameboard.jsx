import React from "react";
import "./Gameboard.css";
import Cell from "../Cell.jsx";

function Gameboard(props) {
  const grid = [];
  const gridMaker = () => {
  for (let row = 0; row < 50; row++) {
    grid.push([]);
    for (let col = 0; col < 50; col++) {
      grid[row].push(<Cell key={`${col}${row}`} color="1" />);
    }
  }
}
  return;
  <div>{gridMaker}</div>;
}

export default Gameboard;
