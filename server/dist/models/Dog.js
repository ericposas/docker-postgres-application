"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
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
    },
    breed: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: db_1.sequelize,
    modelName: 'dog',
    timestamps: false
});
//# sourceMappingURL=Dog.js.map