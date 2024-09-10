import { Contract } from '../models/contract';
import { Op } from 'sequelize';

class ContractService {
  async getContractById(id: number): Promise<Contract | null> {
    return Contract.findByPk(id);
  }

  async getContractsByUser(userId: number): Promise<Contract[]> {
    return Contract.findAll({
      where: {
        [Op.or]: [
          { ClientId: userId },
          { ContractorId: userId }
        ]
      }
    });
  }
}

export default ContractService;
