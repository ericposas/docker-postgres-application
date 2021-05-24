"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
//# sourceMappingURL=index.js.map