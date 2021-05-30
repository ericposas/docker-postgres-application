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
exports.createDog = exports.deleteDags = exports.getDags = void 0;
const random_1 = __importDefault(require("random"));
const random_name_1 = __importDefault(require("random-name"));
const dog_breeds_1 = __importDefault(require("dog-breeds"));
const Dog_1 = __importDefault(require("../models/Dog"));
const createDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const breed = dog_breeds_1.default.random();
        const doggie = {
            name: random_name_1.default.first(),
            age: random_1.default.int(1, 100),
            breed: breed.name
        };
        yield Dog_1.default.create(doggie);
        return res.status(200).json({
            success: true,
            message: 'created a dag',
            dogs: yield Dog_1.default.findAll({ raw: true, order: [['id', 'asc']] }),
            dog: doggie
        });
    }
    catch (err) {
        console.log(err, 'error creating a new dag');
    }
});
exports.createDog = createDog;
const deleteDags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('deleting all dogs from the database..');
        yield Dog_1.default.destroy({
            where: {},
            truncate: true
        });
        return res.status(200).json({
            success: true,
            message: 'deleted all dags from database',
            dogs: yield Dog_1.default.findAll({ raw: true, order: [['id', 'asc']] })
        });
    }
    catch (err) {
        console.log(err, 'error occurred deleting dags');
    }
});
exports.deleteDags = deleteDags;
const getDags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dogs = yield Dog_1.default.findAll({
            // limit: 5,
            raw: true,
            order: [['id', 'ASC']]
        });
        console.log('dogs: ', dogs);
        return res.status(200).json({
            success: true,
            message: 'retrieved dags',
            dogs: dogs
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getDags = getDags;
//# sourceMappingURL=BreedsController.js.map