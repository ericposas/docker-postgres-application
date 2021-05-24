"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: 'postgres',
    port: 5432,
    dialect: 'postgres',
    logging: true
});
class Dog extends sequelize_1.Model {
}
exports.default = Dog;
Dog.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'dog',
    tableName: 'dogs',
    timestamps: false
});
//# sourceMappingURL=Dog.js.map