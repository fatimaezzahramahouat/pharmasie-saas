import { Router } from 'express';
import { uploadPrescription } from '../controllers/prescriptionController';
import { protect } from '../middlewares/authMiddleware';
import { upload, uploadToSupabase } from '../middlewares/uploadMiddleware';

const router = Router();

router.use(protect); // Only logged-in users (clients) can upload

// 1. `upload.single('file')` uses Multer to read the file into memory
// 2. `uploadToSupabase` sends the buffer to the 'files' bucket and attaches `fileUrl` to `req`
// 3. `uploadPrescription` creates the DB record
router.post('/upload', upload.single('file'), uploadToSupabase, uploadPrescription);

export default router;
