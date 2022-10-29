"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.status(404).json({
                message: "Permission set denies you access"
            });
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.KEY);
        req.info = data;
    }
    catch (error) {
        res.json({
            message: error
        });
    }
    next();
};
exports.verifyToken = verifyToken;
