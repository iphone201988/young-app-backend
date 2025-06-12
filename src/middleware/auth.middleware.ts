import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { TryCatch } from "../utils/helper";
import User from "../model/user.model";

export const authenticationMiddleware = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return next(new ErrorHandler("Please login to access the route", 401));

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (!decode) return next(new ErrorHandler("Invalid token", 401));

    const user = await User.findOne({ _id: decode.userId, isDeleted: false });
    console.log("user::::", user);
    if (!user) return next(new ErrorHandler("User not found", 400));

    if (decode.jti !== user.jti)
      return next(new ErrorHandler("Unauthorized", 401));

    req.userId = user._id.toString();
    req.user = user;
    next();
  }
);
