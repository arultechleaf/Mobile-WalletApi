import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { validateEmail, validateUserId } from '../utils/validation.js';

const usersFile = resolve(process.cwd(), 'data', 'users.json');

async function readUsers() {
  try {
    return JSON.parse(await readFile(usersFile, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function saveUsers(users) {
  await mkdir(dirname(usersFile), { recursive: true });
  await writeFile(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

function publicUser({ id, name, email, created_at }) {
  return { id, name, email, created_at };
}

export async function findUserByEmail(email) {
  if (!validateEmail(email)) return null;
  const users = await readUsers();
  return users.find((user) => user.email === email.toLowerCase()) || null;
}

export async function findPublicUserById(id) {
  if (!validateUserId(id)) return null;
  const users = await readUsers();
  const user = users.find((item) => item.id === id);
  return user ? publicUser(user) : null;
}

export async function createUser({ name, email, passwordHash }) {
  if (!validateEmail(email)) throw new Error('Cannot create a user with an invalid email.');
  const users = await readUsers();
  const id = randomUUID();
  if (!validateUserId(id)) throw new Error('Failed to create a valid user ID.');
  const user = { id, name: name.trim(), email: email.trim().toLowerCase(), password_hash: passwordHash, created_at: new Date().toISOString() };
  users.push(user);
  await saveUsers(users);
  return publicUser(user);
}
