import { authenticateUser, registerUser } from '../services/authService.js';
import { sendVerificationEmail } from '../services/emailService.js';
import { createAccessToken } from '../utils/jwt.js';
import { validateEmail, validatePassword } from '../utils/validation.js';

function validateRegistration(body) {
  if (!body?.name?.trim() || !validateEmail(body.email) || !validatePassword(body.password)) {
    const error = new Error('Name, valid email, and a password of at least 12 characters are required.');
    error.statusCode = 400;
    throw error;
  }
}

export async function register(req, res, next) {
  try { validateRegistration(req.body); const user = await registerUser({ ...req.body, email: req.body.email.trim().toLowerCase() }); await sendVerificationEmail(user.email); console.info(`[AUTH] Registered: ${user.email} (${user.id})`); res.status(201).json({ user, accessToken: createAccessToken(user.id) }); } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try { const rawEmail = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''; const email = rawEmail === 'admin' ? 'admin@wallet.local' : rawEmail; if (!validateEmail(email) || typeof req.body?.password !== 'string' || !req.body.password) { const error = new Error('A valid email and password are required.'); error.statusCode = 400; throw error; } const user = await authenticateUser({ email, password: req.body.password }); console.info(`[AUTH] Login successful: ${user.email} (${user.id})`); res.json({ user, accessToken: createAccessToken(user.id) }); } catch (error) { if (req.body?.email) console.warn(`[AUTH] Login failed: ${req.body.email}`); next(error); }
}
