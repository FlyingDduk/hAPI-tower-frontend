
import React from "react";
import { useState, useEffect, useRef } from "react"
import "./Canvas.css";


function Canvas(props) {





    const cellSize = 20;
    const cellGap = 3;
    const gameGrid = [];


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
            this.x = x;
            this.y = y;
            this.width = cellSize;
            this.height = cellSize;
        }
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
