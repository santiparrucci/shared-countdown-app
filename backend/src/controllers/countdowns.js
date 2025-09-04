// src/controllers/countdowns.js
const db = require("../../models"); // controllers -> ../../models
// const { Op } = require("sequelize"); // si luego querés operadores como like, gt, etc.

module.exports = {
  // GET /countdowns?ownerId=<uuid>
  list: async (req, res) => {
    try {
      // Armado dinámico del WHERE
      const where = {};
      if (req.query.ownerId) where.owner_id = req.query.ownerId;

      // Consulta con include (JOIN) y orden
      const list = await db.Countdown.findAll({
        where, // genera el WHERE en SQL
        include: [
          { model: db.User, as: "owner", attributes: ["id", "email", "name"] },
        ],
        order: [["created_at", "DESC"]], // si usás underscored:true
        // Si NO usás underscored: usa "createdAt"
      });

      return res.json(list);
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ ok: false, error: "failed to fetch countdowns" });
    }
  },

  // Ejemplos para cuando quieras sumar CRUD:
  /*
  getOne: async (req, res) => {
    try {
      const item = await db.Countdown.findByPk(req.params.id, {
        include: [{ model: db.User, as: "owner", attributes: ["id", "email", "name"] }],
      });
      if (!item) return res.status(404).json({ ok: false, error: "not found" });
      return res.json(item);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ ok: false, error: "failed to fetch countdown" });
    }
  },

  create: async (req, res) => {
    try {
      const { title, deadline, ownerId } = req.body;
      if (!title || !deadline || !ownerId) {
        return res.status(400).json({ ok: false, error: "title, deadline y ownerId son requeridos" });
      }

      const created = await db.Countdown.create({
        title,
        deadline,
        owner_id: ownerId,
      });

      return res.status(201).json(created);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ ok: false, error: "failed to create countdown" });
    }
  },

  update: async (req, res) => {
    try {
      const item = await db.Countdown.findByPk(req.params.id);
      if (!item) return res.status(404).json({ ok: false, error: "not found" });

      if (req.body.title !== undefined) item.title = req.body.title;
      if (req.body.deadline !== undefined) item.deadline = req.body.deadline;
      await item.save();

      return res.json(item);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ ok: false, error: "failed to update countdown" });
    }
  },

  remove: async (req, res) => {
    try {
      const deleted = await db.Countdown.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ ok: false, error: "not found" });
      return res.status(204).send();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ ok: false, error: "failed to delete countdown" });
    }
  },
  */
};
