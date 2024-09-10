import { Request, Response } from 'express';
import ProfileService from '../services/profileService';
import JobService from '../services/jobService';

const profileService = new ProfileService();
const jobService = new JobService();

class BalanceController {
  async deposit(req: Request, res: Response): Promise<void> {
    try {
      const user = await profileService.getProfileById(+req.params.userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const unpaidJobs = await jobService.getUnpaidJobs(user.id);
      const totalUnpaidAmount = unpaidJobs.reduce((sum, job) => sum + job.price, 0);
      const maxDeposit = totalUnpaidAmount * 0.25;

      if (req.body.amount > maxDeposit) {
        res.status(400).json({ error: `You can only deposit up to ${maxDeposit}` });
        return;
      }

      user.balance += req.body.amount;
      await user.save();

      res.json({ message: 'Deposit successful', balance: user.balance });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new BalanceController();
