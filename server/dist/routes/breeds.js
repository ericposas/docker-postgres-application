"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BreedsController_1 = require("../controllers/BreedsController");
const breedsRouter = express_1.default.Router();
breedsRouter.get('/', BreedsController_1.getDags);
breedsRouter.delete('/', BreedsController_1.deleteDags);
breedsRouter.post('/', BreedsController_1.createDog);
exports.default = breedsRouter;
//# sourceMappingURL=breeds.js.map