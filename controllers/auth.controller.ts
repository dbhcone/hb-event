//Import MD5 Module
const { md5 } = require("md5js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

import {Request, Response, NextFunction} from 'express';

//Import TempUser and TempAccount Schemas
const TempUser = require("../models/tempusers");
const TempAccounts = require("../models/tempaccounts");

//Import User and Account Schemas
const Users = require("../models/user.model");
const Accounts = require("../models/account.model");

//Import Reset Schema
const Reset = require("../models/resets");

//Import Token Functions
const authToken = require("../helpers/tokenfunctions");


//Import Nodemailer
const sendMail = require("../helpers/mailer");
const { isValidObjectId } = require("mongoose");
const { token } = require("morgan");

//Import auth Controller functions
const authController = require("../controllers/auth.controller");

//===================================================================================================================//
//                                       {Sign Up Endpoint}
//===================================================================================================================//
const signup = async (req: Request, res: Response) => {
  //Check if the payload is not empty
  if (!req.body.account)
    return res.status(404).json({ error: "signup object is empty" });

  //Validate Sign Up Payload
  try {
    // await validate.signupSchema.validateAsync(req.body);

    const account = req.body.account;

    //Check if Email or username already exist
    const check_email = await TempUser.find({ email: account.email });
    const check_email2 = await Users.find({ email: account.email });

    if (check_email.length >= "1" || check_email2.length >= "1")
      return res.send({ error: { message: "Email already exist" } });

    //Check if username already exist
    const check_username = await TempUser.find({ username: account.username });
    const check_username2 = await Users.find({ username: account.username });

    if (check_username.length >= "1" || check_username2.length >= "1")
      return res.send({ error: { message: "username already exist" } });

    //Token Time Frame
    const tokenTimeFrame = "1h";

    //Generate token
    const token = authToken.generateToken(
      { email: account.email, username: account.username },
      tokenTimeFrame
    );

    //Generate random digit Code
    const getRandomNumber = (digit: number) => {
      return Math.random().toFixed(digit).split(".")[1];
    };
    const temp_code = getRandomNumber(6);

    //Create Temp User Oject
    // const temp_user_object = {
    //   email: account.email,
    //   username: account.username,
    //   password: md5(account.password),
    //   token,
    //   temp_code,
    //   expiresIn: tokenTimeFrame,
    // };

    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    // });
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync("myPlaintextPassword", salt);
    const temp_user_object = {
      email: account.email,
      username: account.username,
      password: md5(account.password),
      hash: hash,
      token,
      temp_code,
      expiresIn: tokenTimeFrame,
    };

    //Save data into temporal User
    const temp_user = await TempUser(temp_user_object).save();

    //Create Temp Account Oject
    const temp_account_object = {
      temp_userid: temp_user._id,
      user_company_name: account.user_company_name,
      address: account.address,
      city: account.city,
      state_province: account.state_province,
      postal_zip: account.postal_zip,
      country: account.country,
      skype: account.skype,
      tel: account.tel,
      interest: account.interest,
      agree_with_terms: account.agree_with_terms,
      isnotified: account.isnotified,
    };

    //Save data into temporal Account
    const temp_account = await TempAccounts(temp_account_object).save();

    //Send Account Activation Email
    sendMail.accountActivationEmail(account.email, temp_code, token);

    res.status(201).json({ message: "Sign Up Successful" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//===================================================================================================================//
//                                      {Login Endpoint}
//===================================================================================================================//
const login = async (req: Request, res: Response, next: NextFunction) => {
  //Check if the payload is not empty
  if (!req.body.users)
    return res.status(404).json({ error: "users object is empty" });

  try {
    //Validate
    // await validate.login_Schema.validateAsync(req.body);
    const user = req.body.users;

    //find User
    const findUser = await Users.findOne(
      {
        password: md5(user.password),
        $or: [{ email: user.email }, { username: user.username }],
      },
      { password: 0 }
    );
    console.log(findUser);
    if (findUser) {
      const { email, username } = findUser;
      const token = authToken.generateToken({ email, username }, "15m");
      res.send({ findUser, token });
    } else {
      res.send({ error: { message: "Invalid credentials" } });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

//===================================================================================================================//
//                                      {Account Activation Endpoint}
//===================================================================================================================//
const accountActivation = async (req: Request, res: Response) => {
  //Check if the payload is not empty
  if (!req.body.temp_user)
    return res
      .status(404)
      .json({ error: "account activation object is empty" });

  try {
    //Validate temp_user
    // await validate.account_activation_Schema.validateAsync(req.body.temp_user);

    const bearerHeader = <string>req.headers["authorization"];
    const bearerToken = bearerHeader.split(" ")[1];
    const token = bearerToken.split('"')[0];
    if (!bearerToken) return res.status(404).send({ error: "Token empty" });

    const activationDetails = req.body.temp_user;
    const isRegistered = await TempUser.find({
      token,
      temp_code: activationDetails.temp_code,
      email: activationDetails.email,
    });
    console.log(isRegistered);

    if (isRegistered.length >= 1) {
      //Extract User details
      const { _id, email, username, password } = isRegistered[0];

      //Create User
      const createuser = await Users({ email, username, password }).save();

      //Extract Account details
      const accountdata = await TempAccounts.find({ temp_userid: _id });
      const {
        user_company_name,
        address,
        city,
        state_province,
        postal_zip,
        country,
        skype,
        tel,
        interest,
        agree_with_terms,
        isnotified,
      } = accountdata[0];

      // Create Account
      const createaccount = await Accounts({
        userid: createuser._id,
        user_company_name,
        address,
        city,
        state_province,
        postal_zip,
        country,
        skype,
        tel,
        interest,
        agree_with_terms,
        isnotified,
      }).save();

      if (createuser && createaccount) {
        //Delete TempAccounts
        await TempAccounts.findOneAndDelete({ temp_userid: _id });

        //Delete TempAccounts
        await TempUser.findOneAndDelete({
          token,
          temp_code: activationDetails.temp_code,
        });

        res.send({ message: "Activation Successful" });
      }
    } else {
      res.send({
        error: { message: "User does not exist or activation expired" },
      });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

//===================================================================================================================//
//                                      {Password Reset Enpoint}
//===================================================================================================================//
const passwordReset = async (req: Request | any, res: Response) => {
  //Check if the payload is not empty
  if (!req.body.password_reset)
    return res
      .status(404)
      .json({ error: "account activation object is empty" });

  try {
    //validate
    // await validate.password_reset.validateAsync(req.body);

    const bearerHeader = <string>req.headers["authorization"];
    const bearerToken = bearerHeader.split(" ")[1];
    if (!bearerToken) return res.status(404).send({ error: "Token empty" });
    req.token = bearerToken.split('"')[0];

    const temp_token = req.token;
    const newPassword = md5(req.body.password_reset.password);
    const email = req.body.password_reset.email;

    //Find Password Reset Request
    const passwordResetRequest = await Reset.find({ temp_token });

    if (passwordResetRequest.length >= 1) {
      //Reset the password
      const resetPassword = await Users.findOneAndUpdate(
        { email },
        { $set: { password: newPassword } }
      );

      if (resetPassword) {
        //Delete Password Reset Request
        await Reset.findOneAndDelete({ temp_token });

        res.send({ message: "Password Reset Successful" });
      }
    } else {
      res.send({ error: { message: "No Password Reset Request was found" } });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

//===================================================================================================================//
//                                      {Forgot Password Endpoint}
//===================================================================================================================//
const forgotPassword = async (req: Request, res: Response) => {
  //Check if the payload is not empty
  //if(!req.body) return res.status(404).json({error: "email object is empty"});
  if (!req.body.email)
    return res.status(404).json({ error: "email object is empty" });

  try {
    //validate Email
    //await validate.forgot_Password_Schema.validateAsync(req.body.email);
    // await validate.forgot_Password_Schema.validateAsync(req.body);
    const email = req.body.email;
    console.log(email);

    //Generate Temperal Token
    const temp_token = authToken.generateToken({ email }, "1h");
    //########################################################################################
    // // Check if user exist
    // const doesUserExist = await Users.find({email});
    // console.log(doesUserExist);

    // if(doesUserExist.length <= 0) return res.send({error: "User does not exist"});
    // //
    // if(doesUserExist[0].email !== email) return res.send({error: "User does not exist"});
    //###########################################################################################
    const forPasswordReset = await Reset({ email, temp_token }).save();

    if (forPasswordReset && temp_token) {
      //send password reset email
      sendMail.passwordResetEmail(email, temp_token);

      res.send({ message: "Password Reset Request Successful" });
    } else {
      res.send({ error: { message: "Password Reset Request unsuccessful" } });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

//===================================================================================================================//
//                                 {drop user and account collection Endpoint}
//===================================================================================================================//
const mainAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //
    const usersCollection = await Users.remove();
    const accountsCollection = await Accounts.remove();
    res.send({
      message: "Main Users and Accounts deletion Successful",
      data: { usersCollection, accountsCollection },
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

//===================================================================================================================//
//                                 {drop temp-user and temp-account collection Endpoint}
//===================================================================================================================//
const tempAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //
    const tempUserCollection = await TempUser.remove();
    const tempAccountsCollection = await TempAccounts.remove();
    res.send({
      message: "TempUser and TempAccounts deletion Successful",
      data: { tempUserCollection, tempAccountsCollection },
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  accountActivation,
  passwordReset,
  forgotPassword,
  mainAccounts,
  tempAccounts,
};
