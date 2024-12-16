const pool = require("../config/db");

// Obtener joyas con HATEOAS, paginación y ordenamiento seguro
const getJoyas = async ({ limits, page, order_by }) => {
  const offset = (page - 1) * limits;

  // Validar y desglosar order_by
  const [column, direction] = order_by.split("_"); // Divide en columna y dirección
  const validColumns = ["stock", "precio", "id"]; // Columnas válidas
  const validDirections = ["ASC", "DESC"]; // Tipos de orden válidos

  // Validación de parámetros
  if (!validColumns.includes(column) || !validDirections.includes(direction)) {
    throw new Error("Parámetro order_by inválido");
  }

  // Consulta SQL segura
  const query = `
    SELECT * FROM inventario 
    ORDER BY ${column} ${direction}
    LIMIT $1 OFFSET $2
  `;
  const values = [limits, offset];
  const { rows } = await pool.query(query, values);
  return rows;
};

// Filtrar joyas por precio, categoría y metal (parámetros opcionales)
const filterJoyas = async ({ precio_min, precio_max, categoria, metal }) => {
  const conditions = [];
  const values = [];

  // Construir condiciones dinámicamente
  if (precio_min) {
    conditions.push(`precio >= $${values.length + 1}`);
    values.push(precio_min);
  }
  if (precio_max) {
    conditions.push(`precio <= $${values.length + 1}`);
    values.push(precio_max);
  }
  if (categoria) {
    conditions.push(`categoria = $${values.length + 1}`);
    values.push(categoria);
  }
  if (metal) {
    conditions.push(`metal = $${values.length + 1}`);
    values.push(metal);
  }

  // Construir la cláusula WHERE solo si hay condiciones
  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // Consulta SQL segura
  const query = `
    SELECT * FROM inventario
    ${whereClause}
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};

module.exports = { getJoyas, filterJoyas };
