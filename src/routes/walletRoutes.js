import { Router } from 'express';
import { getAssets, getNetworks, getPortfolio, getTransactions } from '../controllers/walletController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();
router.use(requireAuth);
router.get('/portfolio', getPortfolio);
router.get('/assets', getAssets);
router.get('/transactions', getTransactions);
router.get('/networks', getNetworks);

export default router;