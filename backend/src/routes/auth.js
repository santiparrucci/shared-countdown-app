// src/routes/auth.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const requireAuth = require('../middlewares/requireAuth');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../schemas/auth');

// Registro
router.post('/register', validate(registerSchema), authController.register);

// Login
router.post('/login', validate(loginSchema), authController.login);

// Info de sesión (protegida)
router.get('/me', requireAuth, authController.me);

// Logout (borra cookie)
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
