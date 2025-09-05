// src/middlewares/validate.js
// Middleware genérico para validar req.body con Zod (o extender a query/params)

module.exports = (schema) => (req, res, next) => {
  try {
    if (!schema) return next();
    const parsed = schema.parse(req.body);
    req.validated = parsed; // opcional: dejar el body validado aquí
    return next();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: 'validation_error',
      details: error.errors?.map(e => ({ path: e.path, message: e.message })) ?? String(error),
    });
  }
};
