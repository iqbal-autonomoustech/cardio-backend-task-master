import { Router } from 'express';
import contractController from '../controllers/contractController';

const router = Router();

router.get('/contract/:id', contractController.getContract);
router.get('/contracts', contractController.getContracts);

export default router;
