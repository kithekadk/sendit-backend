"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.parcelValidator = joi_1.default.object({
    sender: joi_1.default.string().email().required(),
    parcelWeight: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
    lat: joi_1.default.number().required(),
    lng: joi_1.default.number().required(),
    senderLat: joi_1.default.number().required(),
    senderLng: joi_1.default.number().required(),
    parcelDescription: joi_1.default.string().required(),
    receiverLocation: joi_1.default.string().required(),
    receiverPhone: joi_1.default.number().required(),
    receiverEmail: joi_1.default.string().required(),
    deliveryDate: joi_1.default.string().required(),
});
