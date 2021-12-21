import React from "react";
import { useState, useEffect, useRef } from "react";
import { DragSource } from "react-dnd";
import "./Canvas.css";
import smiley from '../../images/smiley.gif'
import grunt from '../../images/Enemies/Grunt.png'
import marine from '../../images/Marine/Marine-Front.png'
import odst from '../../images/ODST/ODST-Front.png'
import mc from '../../images/MC/MC-Front.png'
import johnson from '../../images/Johnson/Johnson-Front.png'


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
  const enemyPositions = []
  const projectiles = [];
  const resources = [];
  const pathCells = [];
  const enemyImg = new Image();

  // const [numberOfResources, setNumberOfResources] = useState(300)

//25 55
 
const mapArr = [
    ["O","O","O","O","O","O","O","O","O","O","O","O","X","O","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O",],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","X","X","O","O","O","X","X","X","X","X","O","O","O",],
    ["O","O","O","O","O","O","O","O","O","O","O","X","O","O","O","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","O","X","X","X","X","X","O","O","O","X","O","O","O",],
    ["O","O","O","O","O","O","O","O","O","O","O","O","X","X","X","O","O","O","O","O","O","O","X","X","X","X","X","X","O","O","O","O","O","O","O","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","X","O","O","O",],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","X","X","O","O","O","O","X","X","O","O","O","O","O","O","O","O","O","O","O","O","X","X","X","X","X","O","O","O","O","O","X","O","O","O",],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","X","O","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","O","O","O","O","O","X","O","O","O",],
    ["X","X","X","X","X","O","O","O","O","O","O","O","O","O","X","X","X","O","X","X","O","O","O","O","O","O","O","O","X","O","O","X","X","X","X","O","O","O","O","O","O","O","O","O","O","X","X","X","X","X","O","X","O","O","O",],
    ["O","O","O","O","X","O","O","O","X","X","X","X","X","O","X","O","X","O","X","O","O","O","O","O","O","O","O","O","X","O","O","X","O","O","X","O","O","O","O","O","X","X","X","X","O","O","O","O","O","X","O","X","X","O","O",],
    ["O","O","O","O","X","O","O","O","X","O","O","O","X","O","X","O","X","O","X","O","O","O","O","O","O","O","O","O","X","X","O","X","O","O","X","O","O","O","O","O","X","O","O","X","O","O","O","O","O","X","O","O","X","O","O",],
    ["O","O","O","O","X","O","O","O","X","O","O","O","X","O","X","O","X","O","X","O","O","O","O","O","O","O","O","O","O","X","O","X","O","O","X","O","O","O","O","O","X","O","O","X","O","O","O","O","O","X","O","O","X","O","O",],
    ["O","O","O","O","X","O","O","O","X","O","O","O","X","X","X","O","X","O","X","O","O","O","O","O","O","O","O","O","O","X","X","X","O","O","X","O","O","O","O","O","X","O","O","X","O","O","O","O","O","X","O","O","X","O","O",],
    ["O","O","X","X","X","O","O","O","X","X","O","O","O","O","O","O","X","O","X","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","O","O","O","O","O","X","O","O","X","O","O","O","O","O","X","O","O","X","O","O",],
    ["O","O","X","O","O","O","O","O","O","X","O","O","O","O","X","X","X","O","O","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","X","O","O","O","X","X","O","O","X","X","X","X","O","O","X","O","O","X","O","O",],
    ["O","O","X","O","O","O","O","O","O","X","X","O","O","O","X","O","O","O","O","X","O","O","O","O","O","O","O","O","O","X","X","X","X","O","O","X","O","O","O","X","O","O","O","O","O","O","X","O","O","X","O","O","X","X","X",],
    ["O","O","X","X","X","O","O","O","O","O","X","O","O","X","X","O","O","O","O","X","O","O","O","O","O","O","O","O","O","X","O","O","X","O","O","X","O","O","X","X","O","O","O","O","O","O","X","O","O","X","O","O","O","O","O",],
    ["O","O","O","O","X","O","O","O","O","O","X","X","O","X","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","X","O","O","X","X","X","X","O","O","X","O","O","O","O","O","O","O","X","X","O","X","O","O","O","O","O",],
    ["O","O","O","O","X","X","X","X","O","O","O","X","O","X","O","O","O","O","O","X","O","O","O","O","O","O","X","X","X","X","O","O","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","X","O","X","O","O","O","O","O",],
    ["O","O","O","O","O","O","O","X","O","O","O","X","O","X","X","O","O","O","O","X","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","O","X","X","O","O","O","O","O","O","O","O","X","O","X","O","O","O","O","O",],
    ["O","O","O","O","O","O","O","X","O","O","O","X","O","O","X","O","O","O","O","X","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","X","O","X","O","O","O","O","O",],
    ["O","O","O","O","O","O","O","X","O","O","O","X","O","O","X","X","O","O","O","X","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","X","X","X","O","O","O","O","O",],
    ["O","O","O","X","X","X","X","X","O","O","O","X","O","O","O","X","X","X","X","X","O","O","O","O","O","O","X","X","X","X","O","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O",],
    ["O","O","O","X","O","O","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","X","X","X","X","X","X","O","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O",],
    ["O","O","O","X","O","O","O","O","O","O","X","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","X","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O",],
    ["O","O","O","X","X","X","X","X","X","X","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O",],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O",]  
  ]

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
    constructor(x, y,path) {
      this.x = x;
      this.y = y;
      this.width = cellSize;
      this.height = cellSize;
      this.path=path;
    }

    draw() {
      if (collision(this, mouse) && !this.path) {
        ctxRef.current.strokeStyle = "black";
        ctxRef.current.strokeRect(this.x, this.y, this.width, this.height);
      }
      if(this.path){
        ctxRef.current.fillStyle = "#b5651e";
        ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }

  function createGrid() {
    const canvas = canvasRef.current;
    if (canvas != null) {
      for (let y = 0; y < canvasRef.current.height; y += cellSize) {
        for (let x = 0; x < canvasRef.current.width; x += cellSize) {
          if(mapArr[y/cellSize][x/cellSize] === "X"){
            gameGrid.push(new Cell(x, y,true));
          }
          else{gameGrid.push(new Cell(x, y,false));}
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
    frame++;
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
    ){
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
      this.target = null; 
    }
    draw() {
      
      ctxRef.current.fillStyle = "blue";
      ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      ctxRef.current.fillStyle = "black";
      ctxRef.current.font = "20px Arial";
      ctxRef.current.fillText(Math.floor(this.health), this.x, this.y);
    }
    update(){
      if(this.shooting){
      this.timer++;
      if(this.timer % 100 === 0){
        projectiles.push(new Projectile(this.x+15, this.y+15, this.target))
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

      defenders[i].shooting = false;
      for(let j=0; j<enemies.length; j++){
      if(
        (enemies[j].y < (defenders[i].y + 150) &&
        enemies[j].y > (defenders[i].y - 150)  &&
        enemies[j].x < (defenders[i].x + 150) &&
        enemies[j].x > (defenders[i].x - 150) ) 
        ){
          defenders[i].shooting = true;
          defenders[i].target = enemies[j];
      }
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
  //24 13
  //gridArr[13][24] is starting path coordinate
  class Enemy {
    constructor() {
      this.gridX = 54;
      this.gridY = 13;
      this.targetX = cellSize*54 + cellGap;
      this.targetY = cellSize*13 + cellGap;
      this.direction = "left";
      this.x = canvasRef.current.width;
      this.y = cellSize*13 + cellGap;
      this.width = cellSize - cellGap * 2;
      this.height = cellSize - cellGap * 2;
      this.speed = Math.random() * 0.2 + 0.4;
      this.movement = this.speed;
      this.health = 100;
      this.maxHealth = this.health;
    }

    updateTarget() {
      if(this.direction !== "down" && this.gridY-1 >=0 && mapArr[this.gridY - 1][this.gridX] === "X" ){
        this.direction = "up";
        this.gridY = this.gridY - 1;
        this.targetY = this.gridY*cellSize + cellGap;
      }
      else if(this.direction !== "up" && this.gridY+1 <=25 && mapArr[this.gridY + 1][this.gridX] === "X" ){
        this.direction = "down";
        this.gridY = this.gridY + 1;
        this.targetY = this.gridY*cellSize + cellGap;
      }
      else if(this.direction !== "right" && this.gridX-1 >=0 && mapArr[this.gridY][this.gridX - 1] === "X" ){
        this.direction = "left";
        this.gridX = this.gridX - 1;
        this.targetX = this.gridX*cellSize + cellGap;
      }
      else if(this.direction !== "left" && this.gridX+1 <=54 && mapArr[this.gridY][this.gridX + 1] === "X" ){
        this.direction = "right";
        this.gridX = this.gridX + 1;
        this.targetX = this.gridX*cellSize + cellGap;
      }
    }

    update() {
      console.log("Direction: " + this.direction);
      console.log("Y: " + this.x);
      console.log("Target Y: " + this.targetX);

      if(this.direction === "left"){
       
        if(this.x >this.targetX){
          this.x -= this.movement;
        }
        
        if(this.x<= this.targetX){
          this.x = this.targetX;
          this.updateTarget();
        }
      }
      else if(this.direction === "right"){
       
        if(this.x <this.targetX){
          this.x += this.movement;
        }
        if(this.x>= this.targetX){
          this.x = this.targetX;
          this.updateTarget();
        }
      }
      else if(this.direction === "up"){
       
        if(this.y >this.targetY){
          this.y -= this.movement;
        }
        if(this.y<= this.targetY){
          this.y = this.targetY;
          this.updateTarget();
        } 
      }
      else if(this.direction === "down"){
       
        if(this.y <this.targetY){
          this.y += this.movement;
        } 
        if(this.y>= this.targetY){
          this.y = this.targetY;
          this.updateTarget();
        }
      }
   
    }
    draw() {
      enemyImg.src = smiley;
      if(enemyImg.complete){
      ctxRef.current.drawImage(enemyImg,
        this.x,
        this.y,
        this.width,
        this.height);
      }else{
        enemyImg.onload = function(){
          ctxRef.current.drawImage(enemyImg,
            this.x,
            this.y,
            this.width,
            this.height); 
        }
      }
      // ctxRef.current.fillStyle = "red";
      // ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
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
        enemies.splice(i, 1);
      }
    }
    if (frame % enemiesInterval === 0 && score < winningScore) {
      /* if set to 25, it brings an enemy one block down, weird */
      enemies.push(new Enemy()); 
    }
  }

  /* =====================Projectiles===================== */
  class Projectile {
    constructor(x, y, target) {
      this.x = x;
      this.y = y;
      this.width = 5;
      this.height = 5;
      this.power = 20;
      this.speed = 10;
      this.target = target;
    }
    update() {
      if (this.x < this.target.x){this.x += this.speed;}
      else if(this.x > this.target.x){this.x -= this.speed;}
      if (this.y < this.target.y){this.y += this.speed;}
      else if(this.y > this.target.y){this.y -= this.speed;}
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
      <div id="title-title">Defend the Pillar of Autumn</div>
 
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
