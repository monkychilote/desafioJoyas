const fs = require("fs");
const path = require("path");

// Middleware para registrar rutas consultadas
const loggerMiddleware = (req, res, next) => {
  const logMessage = `${new Date().toISOString()} - Ruta: ${
    req.originalUrl
  } - Método: ${req.method}\n`;

  // Definir la ruta del archivo de log
  const logFilePath = path.join(__dirname, "../logs/logs.txt");

  // Crear la carpeta "logs" si no existe
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  }

  // Escribir el log en el archivo (crear si no existe)
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error al escribir en el archivo de log:", err.message);
    }
  });

  // Continuar con el siguiente middleware
  next();
};

module.exports = loggerMiddleware;
