import Job from '../models/job';
import { Contract } from '../models/contract'; // Use named import

class JobService {
  async getUnpaidJobs(profileId: number) {
    return Job.findAll({
      where: {
        paid: false,
        '$Contract.ClientId$': profileId
      },
      include: [{ model: Contract, as: 'Contract' }] // Ensure the alias matches
    });
  }

  async getJobById(id: number) {
    return Job.findByPk(id, { include: [{ model: Contract, as: 'Contract' }] });
  }
}

export default JobService;
