// src/middlewares/requireAuth.js
const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ ok: false, error: 'unauthorized' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload sugerido: { sub: userId, email? }
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'invalid_or_expired_token' });
  }
};
