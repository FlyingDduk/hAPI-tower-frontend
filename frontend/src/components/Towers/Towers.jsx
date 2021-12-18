import React from "react";
import "./Towers.css";
function Towers(props) {
  return (
    <div>
      <div id="tower1" className="towers">
        <img
          id="Marine-Front"
          src={require("../images/Marine/Marine-Front.png")}
          alt="Marine Front"
        />
      </div>
      
      <div id="tower2" className="towers">
        <img
          id="ODST-Front"
          src={require("../images/ODST/ODST-Front.png")}
          alt="ODST Front"
        />
      </div>

      <div id="tower3" className="towers">
        <img
          id="MC-Front"
          src={require("../images/MC/MC-Front.png")}
          alt="MC Front"
        />

        <div id="tower4" className="towers">
          <img
            id="Johnson-Front"
            src={require("../images/Avery-Johnson/Johnson-Front.png")}
            alt="Johnson Front"
          />
        </div>
        {/* <div id="tower4" class="towers">
        Arbiter
      </div>  */}
      </div>
    </div>
  );
}

export default Towers;
