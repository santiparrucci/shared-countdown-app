// src/schemas/auth.js
const { z } = require('zod');

const email = z.string().trim().toLowerCase().email();
const password = z.string().min(8, 'mínimo 8 caracteres');

const registerSchema = z.object({
  email,
  password,
  name: z.string().trim().min(1, 'nombre requerido').optional(),
});

const loginSchema = z.object({
  email,
  password,
});

module.exports = { registerSchema, loginSchema };
