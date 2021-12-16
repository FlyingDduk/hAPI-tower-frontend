import React from 'react';

export default function Cell(props) {
    const cells = `cell-square color-${props.color}`
    return <div className = {cells} />
}