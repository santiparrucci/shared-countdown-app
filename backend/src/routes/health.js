// src/routes/health.js
const express = require("express");
const router = express.Router();
const healthController = require("../controllers/health");

// GET /health
router.get("/", healthController.check);

module.exports = router;
