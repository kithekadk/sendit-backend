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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateUser = exports.setLocation = exports.getClients = exports.checkUserRole = exports.loginUser = exports.registerUser = void 0;
const lodash_1 = require("lodash");
const loginValidator_1 = require("../helpers/user/loginValidator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userValidator_1 = require("../helpers/user/userValidator");
const dbhelpers_1 = __importDefault(require("../databaseHelpers/dbhelpers"));
const db = new dbhelpers_1.default;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, userName, email, phoneNumber, password } = req.body;
        const { error, value } = userValidator_1.userValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        const userNameTaken = (yield db.query(`SELECT * FROM dbo.CLIENTS WHERE userName='${userName}'`)).recordset;
        const emailTaken = (yield db.query(`SELECT * FROM dbo.CLIENTS WHERE email='${email}'`)).recordset;
        if (!(0, lodash_1.isEmpty)(userNameTaken)) {
            return res.status(404).json({ message: 'This username is taken' });
        }
        if (!(0, lodash_1.isEmpty)(emailTaken)) {
            return res.status(404).json({ message: 'An account exists with that email' });
        }
        const hashedPwd = yield bcrypt_1.default.hash(password, 8);
        db.exec('createUser', {
            fullName, userName, email, phoneNumber, password: hashedPwd
        });
        return res.status(200).json({ message: 'Account created successfully' });
    }
    catch (error) {
        res.status(501).json({ message: 'internal server error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { error, value } = loginValidator_1.LoginValidator.validate(req.body);
        if (error) {
            return res.status(404).json({
                message: error.details[0].message
            });
        }
        const emailExists = (yield db.query(`SELECT * FROM dbo.CLIENTS WHERE email='${email}'`)).recordset;
        if ((0, lodash_1.isEmpty)(emailExists)) {
            return res.status(404).json({ message: 'Login email not recognised' });
        }
        const user = (yield db.exec('loginUser', {
            email
        })).recordset;
        const validPassword = yield bcrypt_1.default.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }
        const logins = user.map(item => {
            const { password } = item, rest = __rest(item, ["password"]);
            return rest;
        });
        const token = jsonwebtoken_1.default.sign(logins[0], process.env.KEY, { expiresIn: '300s' });
        return res.status(200).json({
            message: "Logged in successfully", token
        });
    }
    catch (error) {
        res.status(501).json({ message: 'internal server error' });
    }
});
exports.loginUser = loginUser;
//Checking user role
const checkUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        res.json({ email: req.info.email, role: req.info.role, userName: req.info.userName });
    }
});
exports.checkUserRole = checkUserRole;
//Fetching all clients
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = (yield db.exec('getClients')).recordset;
        return res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getClients = getClients;
/**]
 * Listening to users location
 */
const setLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, lat, lng } = req.body;
        const emailExists = (yield db.query(`SELECT * FROM dbo.CLIENTS WHERE email='${email}'`)).recordset;
        if ((0, lodash_1.isEmpty)(emailExists)) {
            return res.status(404).json({ message: 'User not logged in or does not exist' });
        }
        db.exec('setLocation', {
            email, lat, lng
        });
        return res.json({ message: 'Location set successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.setLocation = setLocation;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientID, fullName, phoneNumber, password, email, userName } = req.body;
        const idExists = (yield db.query(`SELECT * FROM dbo.CLIENTS WHERE clientID=${clientID}`)).recordset;
        const userNameTaken = (yield db.query(`SELECT * FROM dbo.CLIENTS WHERE userName='${userName}' AND clientID!=${clientID}`)).recordset;
        const emailTaken = (yield db.query(`SELECT * FROM dbo.CLIENTS WHERE email='${email}' AND clientID!=${clientID}`)).recordset;
        if ((0, lodash_1.isEmpty)(idExists)) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!(0, lodash_1.isEmpty)(userNameTaken)) {
            return res.status(404).json({ message: 'This username is taken' });
        }
        if (!(0, lodash_1.isEmpty)(emailTaken)) {
            return res.status(404).json({ message: 'An account exists with that email' });
        }
        const hashedPwd = yield bcrypt_1.default.hash(password, 8);
        db.exec('updateUser', {
            clientID, fullName, phoneNumber, email, userName, password: hashedPwd
        });
        return res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        res.status(501).json({ message: error });
    }
});
exports.updateUser = updateUser;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phoneNumber, password } = req.body;
        const detailsMatch = (yield db.query(`SELECT * FROM dbo.CLIENTS WHERE email='${email}' AND phoneNumber=${phoneNumber}`)).recordset;
        if ((0, lodash_1.isEmpty)(detailsMatch)) {
            return res.status(404).json({ message: 'Credentials mismatch' });
        }
        const hashedPwd = yield bcrypt_1.default.hash(password, 8);
        db.exec('changePassword', {
            email, phoneNumber, password: hashedPwd
        });
        return res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        res.status(501).json({ message: error });
    }
});
exports.changePassword = changePassword;
