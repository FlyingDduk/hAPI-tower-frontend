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
        canvas.width = 1400;
        canvas.height = 700;

        animate();
    }, []);

    

    class Cell {
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.width = cellSize;
            this.height = cellSize;
        }
        draw() {
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    function createGrid() {
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

    return (
        <div>
            <canvas id="canvas1"></canvas>
        </div>
    );
}

export default Canvas;