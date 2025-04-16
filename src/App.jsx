import './App.css'
import Background from './components/Background';
import Gameboard from "./components/Gameboard";


export default function App() {
  return (
    <Background>
  <div className="sidebar-left">
      {/* Placeholder for buttons or menu */}
  </div>
  <div className="App">
      <h1>Memory Game</h1>
      <Gameboard />
  </div>
  <div className="sidebar-right">
      {/* Placeholder for future features */}
  </div>
</Background>
  );
}
