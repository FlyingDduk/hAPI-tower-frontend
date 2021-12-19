import logo from "./logo.svg";
import "./App.css";
import Gameboard from "./components/Gameboard/Gameboard.jsx";
import Towers from "./components/Towers/Towers.jsx";
import Enemies from "./components/Enemies/Enemies.jsx";
import Canvas from "./components/Canvas/Canvas.jsx"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <div className = "gameboard">
          <Canvas />
          {/* <Gameboard /> */}
        </div>
        <div className="tower-choice">
          <Towers />
        </div>
        <div className="enemy">
          <Enemies />
        </div>
      </main>
      <footer>
        <em>The Tower Boiz</em>
        <ul className="navbar-boiz">
          <li>
            <a href="#">Chance</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/kinglogan3/" target="_blank">
              King
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/abdullah-ga/" target="_blank">
              Abdullah
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/hongssam9/" target="_blank">
              Samuel
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;