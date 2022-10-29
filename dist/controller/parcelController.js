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
exports.updateParcelStatus = exports.updateParcel = exports.deleteParcels = exports.fetchParcels = exports.createParcel = void 0;
const mssql_1 = require("mssql");
const lodash_1 = require("lodash");
;
const dbhelpers_1 = __importDefault(require("../databaseHelpers/dbhelpers"));
const parcelValidator_1 = require("../helpers/parcel/parcelValidator");
const db = new dbhelpers_1.default;
const createParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, parcelWeight, price, lat, lng, senderLat, senderLng, parcelDescription, receiverLocation, receiverPhone, receiverEmail, deliveryDate } = req.body;
        const { error, value } = parcelValidator_1.parcelValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        db.exec('createParcel', { sender,
            parcelWeight,
            price,
            lat,
            lng,
            senderLat,
            senderLng,
            parcelDescription,
            receiverLocation,
            receiverPhone,
            receiverEmail,
            deliveryDate });
        return res.status(200).json({ message: 'Parcel order created successfully' });
    }
    catch (error) {
        if (error instanceof mssql_1.RequestError) {
            res.status(401).json({ error: error });
        }
        else {
            res.status(501).json({ message: error });
        }
    }
});
exports.createParcel = createParcel;
const fetchParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recordset } = yield db.exec('fetchParcels');
        return res.json(recordset);
    }
    catch (error) {
        res.json({ error: error });
    }
});
exports.fetchParcels = fetchParcels;
const deleteParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parcelID = req.params.parcelID;
        const parcelExists = (yield db.query(`SELECT * FROM dbo.PARCELS WHERE parcelID=${parcelID} AND isDeleted=0`)).recordset;
        if ((0, lodash_1.isEmpty)(parcelExists)) {
            return res.status(404).json({ message: 'ParcelID not found' });
        }
        db.exec('deleteParcel', { parcelID });
        return res.status(200).json({ message: 'Parcel deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteParcels = deleteParcels;
const updateParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parcelID = req.params.parcelID;
        const { sender, parcelWeight, price, lat, lng, senderLat, senderLng, parcelDescription, receiverLocation, receiverPhone, receiverEmail, deliveryDate } = req.body;
        const parcelExists = (yield db.query(`SELECT * FROM dbo.PARCELS WHERE parcelID=${parcelID} AND isDeleted=0`)).recordset;
        if ((0, lodash_1.isEmpty)(parcelExists)) {
            return res.status(404).json({ message: 'ParcelID not found' });
        }
        db.exec('updateParcel', {
            parcelID,
            sender,
            parcelWeight,
            price,
            lat,
            lng,
            senderLat,
            senderLng,
            parcelDescription,
            receiverLocation,
            receiverPhone,
            receiverEmail,
            deliveryDate
        });
        return res.json({ message: 'Parcel updated successfully' });
    }
    catch (error) {
        if (error instanceof mssql_1.RequestError) {
            res.json({ message: error });
        }
        else {
            res.json({ message: error });
        }
    }
});
exports.updateParcel = updateParcel;
const updateParcelStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parcelID = req.params.parcelID;
        const { status } = req.body;
        const parcelExists = (yield db.query(`SELECT * FROM dbo.PARCELS WHERE parcelID=${parcelID} AND isDeleted=0`)).recordset;
        if ((0, lodash_1.isEmpty)(parcelExists)) {
            return res.status(404).json({ message: 'ParcelID not found' });
        }
        db.exec('updateStatus', {
            parcelID,
            status
        });
        return res.json({ message: 'Parcel updated successfully...' });
    }
    catch (error) {
        if (error instanceof mssql_1.RequestError) {
            res.json({ message: error.message });
        }
        else {
            res.json({ message: error });
        }
    }
});
exports.updateParcelStatus = updateParcelStatus;
