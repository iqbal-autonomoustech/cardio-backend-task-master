import { Router } from 'express';
import AdminController from '../controllers/adminController'; // Ensure this path is correct

const router = Router();

router.get('/admin/best-profession', AdminController.getBestProfession);
router.get('/admin/best-clients', AdminController.getBestClients);

export default router;
