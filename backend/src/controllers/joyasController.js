const { getJoyas, filterJoyas } = require("../models/joyasModel");

// Handler para obtener joyas con paginación y ordenamiento
const getJoyasHandler = async (req, res, next) => {
  try {
    const { limits = 10, page = 1, order_by = "id_ASC" } = req.query; // Valores por defecto
    const joyas = await getJoyas({ limits, page, order_by });

    res.json({
      totalJoyas: joyas.length,
      results: joyas.map((j) => ({
        name: j.nombre,
        href: `/joyas/${j.id}`,
      })),
    });
  } catch (error) {
    console.error("Error en getJoyasHandler:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Handler para filtrar joyas
const filterJoyasHandler = async (req, res, next) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;

    // Validar al menos un parámetro
    if (!precio_min && !precio_max && !categoria && !metal) {
      return res
        .status(400)
        .json({ error: "Al menos un parámetro debe ser enviado." });
    }

    // Llamar a la función filterJoyas con los parámetros proporcionados
    const joyas = await filterJoyas({
      precio_min: precio_min || null,
      precio_max: precio_max || null,
      categoria: categoria || null,
      metal: metal || null,
    });

    res.json({
      totalJoyas: joyas.length,
      results: joyas,
    });
  } catch (error) {
    console.error("Error en filterJoyasHandler:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getJoyasHandler, filterJoyasHandler };
