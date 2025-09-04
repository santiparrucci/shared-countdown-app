//Middleware de errores centralizado. Si lo usás, en tus controladores podés hacer next(e) en vez de try/catch por todos lados.

// src/middlewares/error.js
module.exports = (err, _req, res, _next) => {
  console.error(err);
  // Nunca expongas detalles internos en prod
  res.status(500).json({ ok: false, error: "internal_error" });
};
