// require("dotenv/config");
import config from "config";

var createError = require("http-errors");
// import createError from 'http-errors';
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// const auth = require("./routes/auth");
import { authRouter } from "./routes/auth";

import { contactusRouter } from "./routes/contactus";
import { fileRouter } from "./routes/file";

// import mongoose from 'mongoose'
import mongoose from "mongoose";

import express, { Request, Response, NextFunction } from "express";
var app = express();
app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("**", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public/fe/index.html"));
});

app.use("/api/auth", authRouter);
app.use("/api/", contactusRouter);
app.use("/api/", fileRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next: createError(404);
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

let connectionString = <string>config.get("CONNSTR");
console.log(connectionString);

try {
  mongoose.connect(
    // <string>process.env.MONGODB_URI,
    connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err: any) => {
      if (err) {
        console.log({ error: err.message });
      } else {
        console.log("Database Connection Successful");
      }
    }
  );
} catch (error) {
  console.log(error);
}

module.exports = app;
