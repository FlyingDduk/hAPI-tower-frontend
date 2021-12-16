import logo from "./logo.svg";
import "./App.css";
import Gameboard from './components/Gameboard/Gameboard.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Tower Boiz</h1>
        <nav>
          <ul>
            <li>Rules</li>
            <li>GitHub</li>
          </ul>
        </nav>
      </header>
      <main>
      <Gameboard />
      </main>
      <footer>
        <h3>The Tower Boiz</h3>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </footer>
    </div>
  );
}

export default App;
