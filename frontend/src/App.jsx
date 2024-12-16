import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import JewelryList from "./components/JewelryList"; // Importa el nuevo componente

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Logos de Vite y React */}
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Título principal */}
      <h1>Vite + React</h1>

      {/* Contador */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Componente JewelryList */}
      <div className="jewelry-section">
        <h2>My Precious Spa - Jewelry List</h2>
        <JewelryList /> {/* Aquí se integra el nuevo componente */}
      </div>

      {/* Footer */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
