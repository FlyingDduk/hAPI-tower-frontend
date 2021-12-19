import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Canvas.css";

function Canvas(props) {
  const cellSize = 30;
  const cellGap = 3;
  const gameGrid = [];
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const canvasPositionRef = useRef(null);
  const defenders= [];
  let numberOfResources = 300;
  const mouse = {
    x: -3,
    y: -3,
    width: 0.1,
    height: 0.1,
  };

  const handleMouseMove = (e) => {
    mouse.x = e.clientX - canvasPositionRef.current.left;
    mouse.y = e.clientY - canvasPositionRef.current.top;

    console.log(e)
  };
  const handleMouseLeave = () => {
    mouse.x = -3;
    mouse.y = -3;
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = 1650;
    canvas.height = 750;

    const ctx = canvas.getContext("2d");
    const canvasPosition = canvas.getBoundingClientRect();

    canvasPositionRef.current = canvasPosition;
    ctxRef.current = ctx;
    createGrid()
    animate()
  }, []);

  class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = cellSize;
      this.height = cellSize;
    }

    draw() {
      //console.log(mouse);
     
      if (collision(this, mouse)) {
        //console.log("coliding with: " + this.x)
        ctxRef.current.strokeStyle = "black";
        ctxRef.current.strokeRect(this.x, this.y, this.width, this.height);
      }
    }
  }

  function createGrid() {
    const canvas = canvasRef.current;
    if (canvas != null) {
      for (let y = 0; y < canvasRef.current.height; y += cellSize) {
        for (let x = 0; x < canvasRef.current.width; x += cellSize) {
          gameGrid.push(new Cell(x, y));
        }
      }
    }
  }

  function handleGameGrid() {
    for (let i = 0; i < gameGrid.length; i++) {
      gameGrid[i].draw();
    }
  }

  function animate() {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    
    handleGameGrid();
    handleDefenders();
    requestAnimationFrame(animate);
  }

  function collision(first, second) {
    if (
      !(
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
      )
    ) {
      return true;
    }
  }

  class Defender {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = cellSize;
      this.height = cellSize;
      this.shooting = false;
      this.health = 100;
      this.projectiles = [];
      this.timer = 0;
    }
    draw(){
      ctxRef.current.fillStyle = 'blue';
      ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      ctxRef.current.fillStyle = 'gold';
      ctxRef.current.font = '20px Arial';
      ctxRef.current.fillText(Math.floor(this.health), this.x, this.y);
    }
  }

  const handleMouseClick = () =>{
    const gridPositionX = mouse.x - (mouse.x % cellSize);
    const gridPositionY = mouse.y - (mouse.y % cellSize);
    if(gridPositionY < cellSize) return;
    let defenderCost = 100;
    if(numberOfResources >= defenderCost){
      defenders.push(new Defender(gridPositionX, gridPositionY));
      numberOfResources -= defenderCost;
    }
  }

  function handleDefenders(){
    for(let i = 0; i < defenders.length; i++){
      defenders[i].draw()
    }
  }
  return (
    <div>
      <canvas
        id="canvas1"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
      ></canvas>
    </div>
  );
}

export default Canvas;
