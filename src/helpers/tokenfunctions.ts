import { NextFunction, Request, Response } from "express";
import config from 'config';
//Import JWT Middleware
import jwt from "jsonwebtoken";

//Generate Token
const generateToken = (objects: string | object, timeframe: string | number) =>
  jwt.sign(objects, config.get("JWT_PRIVATE_KEY"), { expiresIn: timeframe });

//Function to verify token
function verifyToken(req: Request | any, res: Response, next: NextFunction) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = (<string>bearerHeader).split(" ")[1];
    req.token = bearerToken.split('"')[0];
    next();
  } else {
    res.sendStatus(403);
  }
}

export default { generateToken, verifyToken };
