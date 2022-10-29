"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const verifyToken_1 = require("../middleware/verifyToken");
const userRouter = (0, express_1.Router)();
userRouter.post('/create', userController_1.registerUser);
userRouter.post('/login', userController_1.loginUser);
userRouter.get('/check', verifyToken_1.verifyToken, userController_1.checkUserRole);
userRouter.get('/getUsers', userController_1.getClients);
userRouter.post('/setLocation', userController_1.setLocation);
userRouter.put('/updateUser', userController_1.updateUser);
userRouter.put('/changePassword', userController_1.changePassword);
exports.default = userRouter;
