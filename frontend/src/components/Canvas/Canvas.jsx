import React from "react";
import { useState, useEffect, useRef } from "react"
import "./Canvas.css";


function Canvas(props) {

 



    const cellSize = 30;
    const cellGap = 3;
    const gameGrid = [];
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    useEffect(() =>{
        const canvas = canvasRef.current;

        canvas.width = 1650;
        canvas.height = 750;

        const ctx = canvas.getContext('2d');

        ctxRef.current = ctx;


        createGrid();
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
        const canvas = canvasRef.current;
        console.log(canvas);
        if(canvas!=null){
        for(let y = 0; y<canvasRef.current.height; y+=cellSize){
            for(let x = 0; x<canvasRef.current.width; x+= cellSize){
                gameGrid.push(new Cell(x,y));
            }
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