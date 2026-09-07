import { verifyAccessToken } from '../utils/jwt.js';
import { findPublicUserById } from '../models/userModel.js';
import { validateUserId } from '../utils/validation.js';

export async function requireAuth(req, res, next) {
  try {
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Authentication required.' });
    const payload = verifyAccessToken(token);
    if (!validateUserId(payload.sub)) return res.status(401).json({ message: 'Invalid user ID in access token.' });
    const user = await findPublicUserById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Session is no longer valid.' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired access token.' });
  }
}
