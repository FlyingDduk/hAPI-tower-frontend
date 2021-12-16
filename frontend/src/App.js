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
        <h1>Where the gameboard is supposed to be</h1>
      <Gameboard />
      
      </main>
      <footer>
        The Tower Boiz
        <p>Chance Broderick</p>
        <p>https://www.linkedin.com/in/kinglogan3/</p>
        <p>https://www.linkedin.com/in/abdullah-ga/</p>
        <p>https://www.linkedin.com/in/hongssam9/</p>
      </footer>
    </div>
  );
}

export default App;
