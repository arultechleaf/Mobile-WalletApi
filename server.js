import 'dotenv/config';
import app from './src/app.js';
import { ensureLocalAdmin } from './src/services/authService.js';

const required = ['JWT_SECRET'];
for (const key of required) if (!process.env[key] || process.env[key].startsWith('replace-')) throw new Error(`${key} must be set in backend/.env.`);
if (process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET must be at least 32 characters.');

const port = Number(process.env.PORT || 4000);
ensureLocalAdmin().then(() => app.listen(port, () => console.log(`API listening on http://localhost:${port}`))).catch((error) => { console.error('Startup failed:', error.message); process.exit(1); });
