import React from "react";
import "./Towers.css";
import { useDrag } from "react-dnd";

function Towers(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div class = "tower-container"> 
        <img
          id="Marine-Front"
          src={require("../images/Marine/Marine-Front.png")}
          alt="Marine Front"
          className="towers"
          ref = {drag}
          style={{border: isDragging? "3px solid green":"0px"}}
        />
        <img
          id="ODST-Front"
          src={require("../images/ODST/ODST-Front.png")}
          alt="ODST Front"
          className="towers"
        />      
        <img
          id="MC-Front"
          src={require("../images/MC/MC-Front.png")}
          alt="MC Front"
          className="towers"
        />
        <img
          id="Johnson-Front"
          src={require("../images/Avery-Johnson/Johnson-Front.png")}
          alt="Johnson Front"
          className="towers"
        />
    
      {/* <div id="tower4" class="towers">
        Arbiter
      </div>  */}
    </div>
  );
}

export default Towers;
