"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LoginValidator = joi_1.default.object({
    email: joi_1.default.string().required().email().message('Email must be a valid email'),
    password: joi_1.default.string().required().min(8).message('Too long password')
});
