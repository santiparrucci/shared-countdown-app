// src/routes/countdowns.js
const express = require("express");
const router = express.Router();
const countdownsController = require("../controllers/countdowns");

// Lista (con filtros por query)
router.get("/", countdownsController.list);

// (Opcional, si luego agregás CRUD)
// router.get("/:id", countdownsController.getOne);
// router.post("/", countdownsController.create);
// router.patch("/:id", countdownsController.update);
// router.delete("/:id", countdownsController.remove);

module.exports = router;
