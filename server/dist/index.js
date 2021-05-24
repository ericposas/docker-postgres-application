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
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const random_1 = __importDefault(require("random"));
const random_name_1 = __importDefault(require("random-name"));
const Dog_1 = __importDefault(require("./models/Dog"));
require('dotenv').config();
// db
const sequelize = new sequelize_1.Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_USER,
    port: 5432,
    dialect: 'postgres',
    logging: true
});
// express
const app = express_1.default();
const port = 3000;
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log(`Connected to db, running on port ${port}`);
        console.log('getting dogs..');
        try {
            yield Dog_1.default.create({ name: random_name_1.default.first(), age: random_1.default.int(1, 100) });
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