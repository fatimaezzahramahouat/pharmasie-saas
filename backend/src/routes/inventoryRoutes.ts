import { Router } from 'express';
import { getProducts, createProduct, getAlerts } from '../controllers/inventoryController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect); // All routes require authentication

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/alerts', getAlerts);

export default router;
