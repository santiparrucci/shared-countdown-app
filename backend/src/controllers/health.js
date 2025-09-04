// src/controllers/health.js
const db = require("../../models"); // ojo con la ruta: controllers -> ../../models

module.exports = {
  check: async (_req, res) => {
    try {
      await db.sequelize.authenticate();
      return res.json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ ok: false, error: "db auth failed" });
    }
  },
};
