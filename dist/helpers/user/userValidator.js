"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidator = joi_1.default.object({
    fullName: joi_1.default.string().required(),
    userName: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    phoneNumber: joi_1.default.number().required(),
    password: joi_1.default.string().required(),
});
