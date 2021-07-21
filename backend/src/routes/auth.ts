import express from "express";
const router = express.Router();

//Import Token Functions
import AuthToken from '../helpers/tokenfunctions';

//Import auth Controller functions
// const AuthController = require("../controllers/auth.controller");
import AuthController from '../controllers/auth.controller';
//===================================================================================================================//
//                                      {Sign Up Endpoint}
//===================================================================================================================//
router.post("/signup", AuthController.signup);

//===================================================================================================================//
//                                      {Login Endpoint}
//===================================================================================================================//
router.post("/login", AuthController.login);

//===================================================================================================================//
//                                      {Account Activation Endpoint}
//===================================================================================================================//
router.post(
  "/account-activation",
  AuthToken.verifyToken,
  AuthController.accountActivation
);

//===================================================================================================================//
//                                      {Password Reset Enpoint}
//===================================================================================================================//
router.post(
  "/password-reset",
  AuthToken.verifyToken,
  AuthController.passwordReset
);

//===================================================================================================================//
//                                      {Forgot Password Endpoint}
//===================================================================================================================//
router.post("/forgot-password", AuthController.forgotPassword);

//===================================================================================================================//
//                                      {drop temp-user and temp-account collection Endpoint}
//===================================================================================================================//
router.get("/tempaccounts", AuthController.tempAccounts);

//===================================================================================================================//
//                                      {drop user and account collection Endpoint}
//===================================================================================================================//
router.get("/mainaccounts", AuthController.mainAccounts);

export { router as authRouter };
