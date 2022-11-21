const express = require("express");
const authRoute = express.Router();
const AuthController = require("./auth.controller");

authRoute.post("/login", AuthController.login);
authRoute.post("/register", AuthController.register);
authRoute.post("/verifyOtp", AuthController.verifyOtp);
authRoute.post("/requestForgotPassword", AuthController.requestForgotPassword);
authRoute.post("/createNewPassword", AuthController.createNewPassword);

module.exports = authRoute;
