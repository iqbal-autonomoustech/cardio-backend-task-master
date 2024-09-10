import { Request, Response } from 'express';
import JobService from '../services/jobService';
import ProfileService from '../services/profileService';

const jobService = new JobService();
const profileService = new ProfileService();

class JobController {
  async getUnpaidJobs(req: Request, res: Response): Promise<void> {
    try {
      if (!req.profile?.id) {
        res.status(400).json({ error: 'Profile ID is missing' });
        return;
      }
      
      const unpaidJobs = await jobService.getUnpaidJobs(req.profile.id);
      res.json(unpaidJobs);
    } catch (error) {
      console.error('Error fetching unpaid jobs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async payForJob(req: Request, res: Response): Promise<void> {
    try {
      const job = await jobService.getJobById(+req.params.job_id);
      
      if (!job || job.paid) {
        res.status(400).json({ error: 'Invalid or already paid job' });
        return;
      }

      // Ensure Contract is included in the job object
      const contract = job.ContractId ? await Contract.findByPk(job.ContractId) : null;
      if (!contract) {
        res.status(500).json({ error: 'Contract data is missing' });
        return;
      }

      const client = await profileService.getProfileById(contract.ClientId);
      const contractor = await profileService.getProfileById(contract.ContractorId);

      if (!client || !contractor) {
        res.status(404).json({ error: 'Client or contractor not found' });
        return;
      }

      if (client.balance == null) {
        res.status(500).json({ error: 'Client balance is not available' });
        return;
      }

      if (client.balance < job.price) {
        res.status(400).json({ error: 'Insufficient balance' });
        return;
      }

      client.balance -= job.price;
      contractor.balance = (contractor.balance ?? 0) + job.price;

      await client.save();
      await contractor.save();

      job.paid = true;
      job.paymentDate = new Date();
      await job.save();

      res.json({ message: 'Payment successful', job });
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new JobController();
