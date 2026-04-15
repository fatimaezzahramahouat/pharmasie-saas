import { Router } from 'express';
import { getCredits, addCredit, payCredit } from '../controllers/creditController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect); // Require auth

router.get('/', getCredits);
router.post('/', addCredit);
router.post('/:id/pay', payCredit);

export default router;
