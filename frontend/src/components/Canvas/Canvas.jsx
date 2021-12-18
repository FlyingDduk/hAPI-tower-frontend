<<<<<<< HEAD
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
        canvas.width = 1400;
        canvas.height = 700;

        animate();
    }, []);

/*     canvas.width = 1400;
    canvas.heigh = 700;  */

   
=======
import React from "react";
import { useState, useEffect, useRef } from "react"
import "./Canvas.css";


function Canvas(props) {




>>>>>>> Started canvas stuff

    const cellSize = 20;
    const cellGap = 3;
    const gameGrid = [];


<<<<<<< HEAD

    class Cell {
        constructor(x,y) {
=======
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    createGrid();

    useEffect(() =>{
        const canvas = canvasRef.current;
        canvas.width = 1400;
        canvas.height = 700;

        const ctx = canvas.getContext('2d');

        ctxRef.current = ctx;


        console.log(ctxRef);
        animate();

    }, []);


    class Cell {
        constructor(x,y){
>>>>>>> Started canvas stuff
            this.x = x;
            this.y = y;
            this.width = cellSize;
            this.height = cellSize;
        }
<<<<<<< HEAD
        draw() {

            ctx.strokeStyle = `black`;

            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    function createGrid() {

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

    return (
        <div>
            <canvas id="canvas1"></canvas>
        </div>
    );
}

export default Canvas;
=======
        draw(){
            ctxRef.current.strokeStyle = 'black';
            ctxRef.current.strokeRect(this.x, this.y, this.width, this.height);

        }

    }

    function createGrid(){
        console.log(canvasRef.current);
        for(let y = cellSize; y<canvasRef.current.height; y+=cellSize){
            for(let x = 0; x<canvasRef.current.width; x+= cellSize){
                gameGrid.push(new Cell(x,y));
            }
        }

    }

    function handleGameGrid(){
        for(let i=0; i<gameGrid.length; i++){
            gameGrid[i].draw();
        }

    }



    function animate(){

        handleGameGrid();
        requestAnimationFrame(animate);

    }



  return (
    <div>
        <canvas id="canvas1" ref={canvasRef}></canvas>
    </div>
  )
}

export default Canvas;
>>>>>>> Started canvas stuff
