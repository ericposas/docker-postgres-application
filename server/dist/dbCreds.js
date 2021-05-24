"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.dbCreds = void 0;
const sequelize_1 = require("sequelize");
// db
const dbCreds = {
    userData: {
        db: process.env.PG_DB,
        user: process.env.PG_USER,
        pwd: process.env.PG_PASSWORD
    },
    hostData: {
        host: process.env.PG_USER,
        dialect: process.env.PG_USER,
        port: process.env.PG_PORT,
        logging: true
    }
};
exports.dbCreds = dbCreds;
// sequelize instance
let { db, user, pwd } = dbCreds.userData;
const sequelize = new sequelize_1.Sequelize(db, user, pwd, Object.assign({}, dbCreds.hostData));
exports.sequelize = sequelize;
//# sourceMappingURL=dbCreds.js.map