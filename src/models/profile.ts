// models/profile.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Profile extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public profession!: string;
  public balance!: number;
  public type!: string;
}

Profile.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Profile',
});

export default Profile;
