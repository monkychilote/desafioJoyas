# Tienda de Joyas - API REST

Este proyecto implementa una **API REST** para la tienda **My Precious Spa**. La API ofrece funcionalidades como **paginación**, **filtrado**, **ordenamiento**, **estructura HATEOAS** y generación de **logs de registros**. Está construida con **Node.js**, **Express** y **PostgreSQL**.

---

## **Requerimientos Implementados**

### **1. Estructura HATEOAS**
- Se implementó en la ruta **GET `/joyas`**.
- Devuelve las joyas con enlaces `href` para cada recurso.

### **2. Filtrado de recursos**
- La ruta **GET `/joyas/filtros`** permite filtrar joyas mediante parámetros:
   - `precio_max`: Joyas con precio mayor al valor especificado.
   - `precio_min`: Joyas con precio menor al valor especificado.
   - `categoria`: Filtrar joyas por categoría.
   - `metal`: Filtrar joyas por tipo de metal.

### **3. Middleware de registros**
- Se implementó un **middleware** que registra las consultas realizadas en un archivo **`logs/logs.txt`**.
- Los registros incluyen:
   - Fecha y hora de la consulta.
   - Ruta solicitada.
   - Método HTTP utilizado.

### **4. Paginación**
- La ruta **GET `/joyas`** recibe el parámetro `limits` para limitar la cantidad de joyas por página y `page` para definir la página actual.

### **5. Ordenamiento**
- La ruta **GET `/joyas`** recibe el parámetro `order_by` para ordenar los resultados, por ejemplo:
   - `stock_ASC`: Ordena por stock en orden ascendente.
   - `precio_DESC`: Ordena por precio en orden descendente.

### **6. Logs de registros**
- Todas las rutas se registran en el archivo **`logs/logs.txt`**.
- Cada consulta incluye:
   - Fecha y hora.
   - Ruta consultada.
   - Método HTTP.

---

## **Tecnologías utilizadas**
- **Node.js** + **Express** (Backend)
- **PostgreSQL** (Base de datos)
- **dotenv** para variables de entorno
- **fs** para creación y manejo de archivos (logs)
- **nodemon** para desarrollo en caliente
- **Postman** para pruebas de la API

---

## **Estructura del proyecto**
# Estructura del Proyecto

```plaintext
tiendaJoyas/
│
├── backend/                      # Backend del proyecto
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js             # Configuración de la conexión a PostgreSQL
│   │   ├── controllers/
│   │   │   └── joyasController.js # Lógica de las rutas y controladores
│   │   ├── models/
│   │   │   └── joyasModel.js     # Consultas SQL parametrizadas
│   │   ├── middlewares/
│   │   │   └── loggerMiddleware.js # Middleware para registrar logs
│   │   ├── routes/
│   │   │   └── joyasRoutes.js    # Definición de rutas para la API
│   │   ├── logs/
│   │   │   └── logs.txt          # Archivo de registros de rutas consultadas
│   │   └── index.js              # Archivo principal para levantar el servidor
│   │
│   ├── .env                      # Variables de entorno del servidor
│   ├── package.json              # Configuración de dependencias del backend
│   └── README.md                 # Documentación del backend
│
├── frontend/                     # Frontend del proyecto
│   ├── public/
│   │   ├── index.html            # Archivo principal HTML
│   │   └── vite.svg              # Logo por defecto de Vite
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg         # Logo de React
│   │   ├── components/
│   │   │   └── JewelryList.js    # Componente principal de la lista de joyas
│   │   ├── App.jsx               # Componente principal de React
│   │   ├── index.js              # Punto de entrada para React
│   │   └── App.css               # Estilos del frontend
│   │
│   ├── .env                      # Variables de entorno del frontend
│   ├── vite.config.js            # Configuración de Vite
│   ├── package.json              # Configuración de dependencias del frontend
│   └── README.md                 # Documentación del frontend
│
└── README.md                     # Documentación general del proyecto
```
## **Implementa mi codigo en tu propia maquina.**
# Instalar dependencias
```plaintext
npm install
```

# Configurar variables de entorno
```plaintext
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tuclave
DB_NAME=joyas
```

# Inicializar la base de datos
Ejecuta el siguiente script SQL en tu base de datos PostgreSQL:
```plaintext
CREATE DATABASE joyas;
\c joyas;

CREATE TABLE inventario (
  id SERIAL,
  nombre VARCHAR(50),
  categoria VARCHAR(50),
  metal VARCHAR(50),
  precio INT,
  stock INT
);

INSERT INTO inventario VALUES
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000, 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000, 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000, 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000, 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000, 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000, 2);

```

# Iniciar el servidor
```plaintext
npm run dev
```

# Pruebas con Postman
Realiza las siguientes pruebas en Postman:
1. Tabla para las consultas de /joyas

| **Consulta**                                    | **Descripción**                         | **Respuesta Esperada**                |
|-------------------------------------------------|-----------------------------------------|---------------------------------------|
| `/joyas`                                       | Devuelve todas las joyas en HATEOAS     | Todas las joyas en formato HATEOAS    |
| `/joyas?limits=2`                              | Devuelve las primeras 2 joyas           | 2 joyas en formato HATEOAS            |
| `/joyas?limits=2&page=2`                       | Segunda página con 2 joyas              | 2 joyas (paginación)                  |
| `/joyas?limits=3&page=1&order_by=stock_ASC`    | Joyas ordenadas por stock (ascendente)  | Joyas ordenadas por stock (ASC)       |
| `/joyas?limits=3&page=1&order_by=precio_DESC`  | Joyas ordenadas por precio (descendente)| Joyas ordenadas por precio (DESC)     |

2. Tabla para las consultas de /joyas/filtros


| **Consulta**                                    | **Descripción**                         | **Respuesta Esperada**                |
|-------------------------------------------------|-----------------------------------------|---------------------------------------|
| `/joyas`                                       | Devuelve todas las joyas en HATEOAS     | Todas las joyas en formato HATEOAS    |
| `/joyas?limits=2`                              | Devuelve las primeras 2 joyas           | 2 joyas en formato HATEOAS            |
| `/joyas?limits=2&page=2`                       | Segunda página con 2 joyas              | 2 joyas (paginación)                  |
| `/joyas?limits=3&page=1&order_by=stock_ASC`    | Joyas ordenadas por stock (ascendente)  | Joyas ordenadas por stock (ASC)       |
| `/joyas?limits=3&page=1&order_by=precio_DESC`  | Joyas ordenadas por precio (descendente)| Joyas ordenadas por precio (DESC)     |

# Logs de registros
El middleware guarda los registros de todas las consultas en el archivo logs/logs.txt.
```plaintext
2024-12-15T18:00:00.000Z - Ruta: /joyas?limits=2&page=1 - Método: GET
2024-12-15T18:05:00.000Z - Ruta: /joyas/filtros?precio_min=20000 - Método: GET
2024-12-15T18:10:00.000Z - Ruta: /joyas?order_by=stock_ASC - Método: GET

```

# Conclusión
Este proyecto implementa todas las funcionalidades requeridas para la tienda de joyas, garantizando un backend funcional y documentado. Sigue las instrucciones para configurarlo y ejecutarlo localmente.
