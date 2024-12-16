import React from "react";
import ReactDOM from "react-dom/client"; // Importa createRoot
import App from "./App";

// Busca el contenedor raíz
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza la aplicación con createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
