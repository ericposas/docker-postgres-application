require('dotenv').config();
import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'postgres',
    port: 5432,
    dialect: 'postgres',
    logging: true
  }
);

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
    }
  },
  {
    sequelize,
    modelName: 'dog',
    tableName: 'dogs',
    timestamps: false
  }
);
