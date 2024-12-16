require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const cors = require("cors");
const joyasRoutes = require("./routes/joyasRoutes");
const loggerMiddleware = require("./middlewares/loggerMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors()); // Permitir solicitudes desde otros orígenes
app.use(express.json()); // Parsear JSON en el body
app.use(loggerMiddleware); // Registrar cada consulta en logs

// Rutas
app.use("/joyas", joyasRoutes); // Rutas para la API de joyas

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
