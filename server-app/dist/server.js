"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 5001;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("hello,world");
});
app.listen(port, () => {
    console.log(`Server sucessfully running on port ${port}`);
});
