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

   

    const cellSize = 20;
    const cellGap = 3;
    const gameGrid = [];



    class Cell {
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.width = cellSize;
            this.height = cellSize;
        }
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