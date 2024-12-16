const express = require("express");
const {
  getJoyasHandler,
  filterJoyasHandler,
} = require("../controllers/joyasController");
const router = express.Router();

router.get("/", getJoyasHandler);
router.get("/filtros", filterJoyasHandler);

module.exports = router;
