import { Request, Response } from 'express';
import ContractService from '../services/contractService';
import { Contract } from '../models/contract'; // Use named import if Contract is exported as named export

const contractService = new ContractService();

class ContractController {
  async getContract(req: Request, res: Response): Promise<void> {
    try {
      const contract: Contract | null = await contractService.getContractById(+req.params.id);
      if (!contract) {
        res.status(404).json({ error: 'Contract not found' });
        return;
      }

      // Check if the profile ID is either the ClientId or ContractorId
      if (contract.ClientId !== req.profile?.id && contract.ContractorId !== req.profile?.id) {
        res.status(403).json({ error: 'You do not have access to this contract' });
        return;
      }

      res.json(contract);
    } catch (error) {
      console.error('Error fetching contract:', error); // Added logging
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getContracts(req: Request, res: Response): Promise<void> {
    try {
      // Ensure req.profile exists and is properly typed
      if (!req.profile?.id) {
        res.status(400).json({ error: 'Profile ID is missing' });
        return;
      }

      const contracts: Contract[] = await contractService.getContractsByUser(req.profile.id);
      const activeContracts = contracts.filter((contract: Contract) => contract.status !== 'terminated');
      res.json(activeContracts);
    } catch (error) {
      console.error('Error fetching contracts:', error); // Added logging
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ContractController();
