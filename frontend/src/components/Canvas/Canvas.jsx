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
  let numberOfResources = 300;
  let enemiesInterval = 600;
  let frame = 0;
  let score = 0;
  let gameOver = false;
  const winningScore = 30;
  const defenders = [];
  const enemies = [];
  const enemyPositions = [];
  const projectiles = [];
  const resources = [];
  // const [numberOfResources, setNumberOfResources] = useState(300)


  /* =====================Mouse Movement===================== */
  const mouse = {
    x: -3,
    y: -3,
    width: 0.1,
    height: 0.1,
  };

  const handleMouseMove = (e) => {
    mouse.x = e.clientX - canvasPositionRef.current.left;
    mouse.y = e.clientY - canvasPositionRef.current.top;

    console.log(e);
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
    createGrid();
    animate();
  }, []);

  /* =====================Create Grid Board===================== */
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
  createGrid();
  function handleGameGrid() {
    for (let i = 0; i < gameGrid.length; i++) {
      gameGrid[i].draw();
    }
  }

  /* =====================Animate on Gameboard===================== */
  function animate() {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    handleGameGrid();
    handleDefenders();
    handleEnemies();
    handleGameStatus();
    handleProjectiles();
    handleResources();
    // ctxRef.current.fillText('Resources: ' + numberOfResources, 20, 55);
    frame++;
    // console.log(frame);
    if (!gameOver) requestAnimationFrame(animate);
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

  /* =====================Defender===================== */
  class Defender {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = cellSize - cellGap*2;
      this.height = cellSize - cellGap*2;
      this.shooting = false;
      this.health = 50;
      this.projectiles = [];
      this.timer = 0;
    }
    draw() {
         // const marine = ctxRef.drawImage(<img src={require("../images/Marine/Marine-Front.png")} alt = "Marine"/>) 
      // ctxRef.current.fillStyle = marine;
      ctxRef.current.fillStyle = "blue";
      ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      ctxRef.current.fillStyle = "black";
      ctxRef.current.font = "20px Arial";
      ctxRef.current.fillText(Math.floor(this.health), this.x, this.y);
    }
    update() {
      if(this.shooting){
      this.timer++;
      if(this.timer % 100 === 0){
        projectiles.push(new Projectile(this.x+15, this.y+15))
      }
    }else {
      this.timer = 0;
    }
    }
  }

  const handleMouseClick = () => {
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    for (let i = 0; i < defenders.length; i++) {
      if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY)
        return;
    }
    let defenderCost = 100;
    if (numberOfResources >= defenderCost) {
      defenders.push(new Defender(gridPositionX, gridPositionY));
      numberOfResources -= defenderCost;
    }
  };

  function handleDefenders() {
    for (let i = 0; i < defenders.length; i++) {
      defenders[i].draw();
      defenders[i].update();
      /* This check if enemy is in row. If so, it will shoot */
      /* Not working correctly */
      if(enemyPositions.indexOf(defenders[i].y) !== -1){
        defenders[i].shooting = true;
      }else{
        defenders[i].shooting = false;
      }
      for (let j = 0; j < enemies.length; j++) {
        if (defenders[i] && collision(defenders[i], enemies[j])) {
          enemies[j].movement = 0;
          defenders[i].health -= 0.2;
        }
        if (defenders[i] && defenders[i].health <= 0) {
          defenders.splice(i, 1);
          i--;
          enemies[j].movement = enemies[j].speed;
        }
      }
    }
  }

  /* =====================Enemies===================== */
  class Enemy {
    constructor(verticalPosition) {
      this.x = canvasRef.current.width;
      this.y = verticalPosition;
      this.width = cellSize - cellGap * 2;
      this.height = cellSize - cellGap * 2;
      this.speed = Math.random() * 0.2 + 0.4;
      this.movement = this.speed;
      this.health = 100;
      this.maxHealth = this.health;
    }
    update() {
      this.x -= this.movement;
    }
    draw() {
      ctxRef.current.fillStyle = "red";
      ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      ctxRef.current.fillStyle = "black";
      ctxRef.current.font = "30px Arial";
      ctxRef.current.fillText(Math.floor(this.health), this.x, this.y);
    }
  }

  function handleEnemies() {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].update();
      enemies[i].draw();
      if (enemies[i].x < 0) {
        gameOver = true;
      }
      if(enemies[i].health <= 0){
        let gainedResources = enemies[i].maxHealth/10;
        numberOfResources += gainedResources;
        score += gainedResources;
        const findThisIndex = enemyPositions.indexOf(enemies[i].i);
        enemyPositions.splice(findThisIndex, 1);
        enemies.splice(i, 1);
        i--;
        console.log(enemyPositions)
      }
    }
    if (frame % enemiesInterval === 0 && score < winningScore) {
      /* if set to 25, it brings an enemy one block down, weird */
      let verticalPosition = Math.floor(Math.random() * 24 + 1) * cellSize + cellGap;
      enemies.push(new Enemy(verticalPosition));
      enemyPositions.push(verticalPosition);
      if (enemiesInterval > 120) enemiesInterval -= 50;
      console.log(enemyPositions)
    }
  }

  /* =====================Projectiles===================== */
  class Projectile {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 5;
      this.height = 5;
      this.power = 20;
      this.speed = 5;
    }
    update() {
      this.x += this.speed;
    }
    draw() {
      ctxRef.current.fillStyle = "black";
      ctxRef.current.beginPath();
      ctxRef.current.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      ctxRef.current.fill();
    }
  }
  
  function handleProjectiles () {
    for (let i = 0; i < projectiles.length; i++){
      projectiles[i].update();
      projectiles[i].draw();

      for(let j = 0; j < enemies.length; j++){
        if(enemies[j] && projectiles[i] && collision(projectiles[i],enemies[j])){
          enemies[j].health -= projectiles[i].power;
          projectiles.splice(i, 1);
          i--;
        }
      }

      if(projectiles[i] && projectiles[i].x > canvasRef.current.width - cellSize){
        projectiles.splice(i, 1);
        i--;
      }
      // console.log('projectiles ' + projectiles.length);
    }
  }

  /* =====================Utilities===================== */
  function handleGameStatus() {
    // ctxRef.fillStyle = 'white';
    // ctxRef.font = "30px Arial";
    ctxRef.current.fillStyle = 'gold';
    ctxRef.current.fillText('Score: ' + score,10,35);
    ctxRef.current.fillText('Resources: ' + numberOfResources, 10, 65)
    if (gameOver) {
      ctxRef.current.fillStyle = "black";
      ctxRef.current.font = "60px Arial";
      ctxRef.current.fillText("GAME OVER", 135, 330);
    }
    if (score >= winningScore && enemies.length === 0){
      ctxRef.current.fillStyle = 'black';
      ctxRef.current.font = '60px Arial';
      ctxRef.current.fillText('LEVEL COMPLETE', 130, 300);
      ctxRef.current.font = '30px Arial';
      ctxRef.current.fillText('You win with ' + score + 'points!', 134, 340);
    } 
  }

  /* Resources */
  const amounts = [20, 30, 40];
  class Resource {
    constructor(){
      this.x = Math.random() * (canvasRef.current.width - cellSize);
      this.y = (Math.floor(Math.random() * 5) +1) * cellSize + 25;
      this.width = cellSize * 0.6;
      this.height = cellSize * 0.6;
      this.amount = amounts[Math.floor(Math.random()*amounts.length)];
    }
    draw(){
      ctxRef.current.fillStyle = 'yellow';
      ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      ctxRef.current.fillStyle = 'black';
      ctxRef.current.font = '20px Arial'
      ctxRef.current.fillText(this.amount, this.x + 15, this.y + 25)
    }
  }

  function handleResources(){
    if(frame % 500 === 0 && score < winningScore){
      resources.push(new Resource());
    }
    for(let i = 0; i < resources.length; i++){
      resources[i].draw();
      if(resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
        numberOfResources += resources[i].amount;
        resources.splice(i, 1);
        i--;
      }
    }
  }

// Can't get this to work
/* window.addEventListener('resize',function(){
  canvasPositionRef = canvasRef.getBoundingClientReact();
})  */


  return (
    <div>
      <div id="utility">{numberOfResources}</div>
 
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
