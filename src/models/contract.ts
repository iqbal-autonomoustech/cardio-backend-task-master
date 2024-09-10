import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Profile from './profile';

// Define the interface for the Contract attributes
interface ContractAttributes {
  id: number;
  terms?: string;
  status?: 'new' | 'in_progress' | 'terminated';
  ClientId?: number;
  ContractorId?: number;
}

// Define the interface for the Contract creation attributes
interface ContractCreationAttributes extends Optional<ContractAttributes, 'id'> {}

class Contract extends Model<ContractAttributes, ContractCreationAttributes> implements ContractAttributes {
  public id!: number;
  public terms?: string;
  public status?: 'new' | 'in_progress' | 'terminated';
  public ClientId?: number;
  public ContractorId?: number;
}

// Initialize the Contract model
Contract.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  terms: DataTypes.STRING,
  status: DataTypes.ENUM('new', 'in_progress', 'terminated'),
}, {
  sequelize,
  tableName: 'contracts',
});

// Define associations
Contract.belongsTo(Profile, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Contractor', foreignKey: 'ContractorId' });

export { Contract };
