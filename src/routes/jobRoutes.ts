import { Router } from 'express';
import jobController from '../controllers/jobController';

const router = Router();

router.get('/unpaid', jobController.getUnpaidJobs);
router.post('/pay/:job_id', jobController.payForJob);

export default router;
