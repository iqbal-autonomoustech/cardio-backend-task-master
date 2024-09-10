import { Router } from 'express';
import balanceController from '../controllers/balanceController';

const router = Router();

router.post('/deposit/:userId', balanceController.deposit);

export default router;
