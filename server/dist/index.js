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
const random_1 = __importDefault(require("random"));
const random_name_1 = __importDefault(require("random-name"));
const dog_breeds_1 = __importDefault(require("dog-breeds"));
const Dog_1 = __importDefault(require("./models/Dog"));
const db_1 = require("./db");
const app = express_1.default();
const port = 3000;
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
const createTestTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('try and drop tables..');
        // await sequelize.query(`
        //   DROP TABLE IF EXISTS dogs
        // `);
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
const getDogs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('try getting dogs..');
        const breed = dog_breeds_1.default.random();
        const doggie = {
            name: random_name_1.default.first(),
            age: random_1.default.int(1, 100),
            breed: breed.name
        };
        yield Dog_1.default.create(doggie);
        const dogs = yield Dog_1.default.findAll({
            raw: true,
            limit: 5,
            order: [['name', 'ASC']]
        });
        console.log('dogs: ', dogs);
    }
    catch (err) {
        console.log(err, 'error in findAll() query method');
    }
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.sequelize.authenticate();
        console.log(`Connected to db, running on port ${port}`);
        yield createTestTable();
        yield getDogs();
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