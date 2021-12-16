import logo from "./logo.svg";
import "./App.css";
import Gameboard from "./components/Gameboard/Gameboard.jsx";
import Towers from "./components/Towers/Towers.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Halo Towers</h1>
        <nav>
          <ul>
            <li>Rules</li>
            <li>GitHub</li>
          </ul>
        </nav>
      </header>
      <main>
        <Gameboard />
        <div className="tower-choice">
          <Towers />
        </div>
      </main>
      <footer>
        The Tower Boiz
        <ul className="navbar">
        <li><a href = "#">Chance</a></li> 
          <li>
            <a href="https://www.linkedin.com/in/kinglogan3">King</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/abdullah-ga/">Abdullah</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/hongssam9/">Samuel</a>
          </li>
          
        </ul>
      </footer>
    </div>
  );
}

export default App;
