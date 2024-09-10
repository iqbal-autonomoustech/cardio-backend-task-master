import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Contract } from './contract'; // Use named import

// Define the interface for the Job attributes
interface JobAttributes {
  id: number;
  price: number;
  paid: boolean;
  paymentDate?: Date;
  ContractId?: number;
}

// Define the interface for the Job creation attributes
interface JobCreationAttributes extends Optional<JobAttributes, 'id'> {}

class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public price!: number;
  public paid!: boolean;
  public paymentDate?: Date;
  public ContractId?: number;
}

// Initialize the Job model
Job.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ContractId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'contracts', // Name of the contracts table
      key: 'id'
    }
  },
}, {
  sequelize,
  tableName: 'jobs',
});

// Define associations
Job.belongsTo(Contract, { foreignKey: 'ContractId' });

export default Job;
