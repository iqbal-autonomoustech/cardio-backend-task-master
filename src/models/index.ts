import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Contract extends Model {
  public id!: number;
  public ClientId!: number;
  public ContractorId!: number;
}

Contract.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ClientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ContractorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'contracts',
});

export { Contract };
