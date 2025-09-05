// src/controllers/auth.js
// Controladores vacíos para que vos agregues la lógica real después

module.exports.register = async (req, res, next) => {
  try {
    // TODO:
    // 1) normalizar email
    // 2) chequear duplicado
    // 3) hashear password
    // 4) crear usuario
    // 5) (opcional) autologin: emitir JWT + setear cookie
    return res.status(201).json({ ok: true, route: 'register' });
  } catch (err) {
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    // TODO:
    // 1) buscar usuario por email
    // 2) comparar password
    // 3) emitir JWT
    // 4) setear cookie httpOnly
    return res.json({ ok: true, route: 'login' });
  } catch (err) {
    return next(err);
  }
};

module.exports.me = async (req, res, next) => {
  try {
    // req.user viene del middleware requireAuth
    return res.json({ ok: true, user: req.user });
  } catch (err) {
    return next(err);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    // borrar cookie con los mismos flags que usaste al setearla
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
