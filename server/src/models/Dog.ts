import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

export default class Dog extends Model {}

Dog.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'dog',
    timestamps: false
  }
);
