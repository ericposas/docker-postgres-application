"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const breeds_1 = __importDefault(require("./routes/breeds"));
const app = express_1.default();
const apiBase = '/api/v1';
const port = process.env.API_PORT;
app.use(cors_1.default());
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
app.use(`${apiBase}/breeds`, breeds_1.default);
const createTestTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('try and create table..');
        yield db_1.sequelize.query(`
      CREATE TABLE IF NOT EXISTS dogs (
        id  SERIAL  PRIMARY KEY NOT NULL,
        name  TEXT  NOT NULL,
        age  INTEGER  NOT NULL,
        breed  TEXT
      )
    `);
    }
    catch (err) {
        console.log('error creating table thru sequelize');
    }
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.sequelize.authenticate();
        console.log(`Connected to db, running on port ${port}`);
        yield createTestTable();
        // await getDogs();
    }
    catch (err) {
        console.log(err, 'trying connection again...');
        setTimeout(connectDB, 2000);
    }
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
    }
    catch (err) {
        console.log(err);
    }
}));
//# sourceMappingURL=index.js.map