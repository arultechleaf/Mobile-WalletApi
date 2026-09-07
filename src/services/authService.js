import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../models/userModel.js';

const localAdminEmail = 'admin@wallet.local';

// Development convenience only. Do not enable this account in production.
export async function ensureLocalAdmin() {
  if (process.env.NODE_ENV === 'production' || await findUserByEmail(localAdminEmail)) return;
  const passwordHash = await bcrypt.hash('admin', 12);
  await createUser({ name: 'Admin', email: localAdminEmail, passwordHash });
  console.info('Local development admin account created.');
}

export async function registerUser({ name, email, password }) {
  const existing = await findUserByEmail(email);
  if (existing) {
    const error = new Error('An account already exists for this email.');
    error.statusCode = 409;
    throw error;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  return createUser({ name, email, passwordHash });
}

export async function authenticateUser({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }
  const { password_hash, ...publicUser } = user;
  return publicUser;
}
