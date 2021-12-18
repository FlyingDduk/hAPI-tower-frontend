import React from "react";
import "./Enemies.css";
function Enemies(props) {
  return (
    <div>
      <div id="Enemy1" className="Enemies">
        <img
          id="Grunt"
          src={require("../images/Enemies/Grunt.png")}
          alt="Grunt"
        />
      </div>

      <div id="Enemy2" className="Enemies">
        <img
          id="Elite"
          src={require("../images/Enemies/Elite.png")}
          alt="Elite"
        />
      </div>

      <div id="Enemy3" className="Enemies">
        <img
          id="Flood"
          src={require("../images/Enemies/Flood.png")}
          alt="Flood"
        />

        <div id="Enemy4" className="Enemies">
          <img
            id="Hunter"
            src={require("../images/Enemies/Hunter.png")}
            alt="Hunter"
          />
        </div>
        <div id="Enemy5" className="Enemies">
          <img
            id="Elite-Master"
            src={require("../images/Enemies/Elite-Master.png")}
            alt="Elite Master"
          />
        </div>
      </div>
    </div>
  );
}

export default Enemies;
