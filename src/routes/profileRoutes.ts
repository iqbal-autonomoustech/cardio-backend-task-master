import { Router } from 'express';
import profileController from '../controllers/profileController';  // Import the default export

const router = Router();

router.get('/:id', profileController.getProfile);

export default router;
