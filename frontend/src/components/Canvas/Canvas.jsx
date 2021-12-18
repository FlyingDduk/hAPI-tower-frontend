<<<<<<< HEAD
import React, { useEffect } from 'react';
import "./Canvas.css";

function Canvas(props) {

    let ctx = 0;
    let canvas = 0;

    const cellSize = 20;
    const cellGap = 3;
    const gameGrid = [];

    createGrid();

    useEffect(() => {
        const canvas = document.getElementById("canvas1");
        const ctx = canvas.getContext("2d");
=======
import React from 'react';
import { useState, useEffect } from 'react';
import "./Canvas.css"

function Canvas(props) {
    /* const canvas = document.getElementById(`canvas1`);
    const ctx = canvas.getContext(`2d`); */
    let canvas;
   /*  let ctx; */
    
     const [ctx, setCtx] = useState();
    useEffect(() => {
        console.log('hi');
        canvas = document.getElementById(`canvas1`);
        setCtx(canvas.getContext('2d'));
>>>>>>> Canvas Implementation
        canvas.width = 1400;
        canvas.height = 700;

        animate();
    }, []);
<<<<<<< HEAD

    
=======
    
/*     canvas.width = 1400;
    canvas.heigh = 700;  */

   

    const cellSize = 20;
    const cellGap = 3;
    const gameGrid = [];

   
>>>>>>> Canvas Implementation

    class Cell {
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.width = cellSize;
            this.height = cellSize;
        }
        draw() {
<<<<<<< HEAD
            ctx.strokeStyle = "black";
=======
            ctx.strokeStyle = `black`;
>>>>>>> Canvas Implementation
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    function createGrid() {
<<<<<<< HEAD
        for(let y = cellSize; y < canvas.height; y += cellSize) {
            for(let x = 0; x < canvas.width; x += cellSize) {
                gameGrid.push(new Cell(x,y));
            }
        }
    }

    function handleGameGrid() {
        for(let i = 0; i < gameGrid.length; i++) {
            gameGrid[i].draw();
        }
    }

    function animate() {
        handleGameGrid();
        requestAnimationFrame(animate);
    }

=======
        for(let y = cellSize; y < 1400; y += cellSize){
            for(let x = 0; x < 700; x += cellSize){
                gameGrid.push(new Cell((x,y)))
            }
        }
    }
    createGrid()
    

    function handleGameGrid(){
        for(let i = 0; gameGrid.length; i++){
            gameGrid[i].draw()
        }
    }
    console.log(gameGrid)
    function animate() {
      /*   ctx.fillStyle = `blue`;
        ctx.fillRect(0,0,controlsBar.width, controlsBar.height); */
        handleGameGrid();
        requestAnimationFrame(animate);
    }
    animate(); 
>>>>>>> Canvas Implementation
    return (
        <div>
            <canvas id="canvas1"></canvas>
        </div>
    );
}

export default Canvas;