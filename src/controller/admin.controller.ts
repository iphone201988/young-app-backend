import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, generateJwtToken } from "../utils/helper";
import User from "../model/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { userRole } from "../utils/enums";

const login = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: userRole.ADMIN });
    if (!user) return next(new ErrorHandler("Invalid credentials", 401));
    
    const isMatched = await user.matchPassword(password);
    console.log("User found:", isMatched);
    if (!isMatched) return next(new ErrorHandler("Invalid credentials", 401));

    const token = generateJwtToken({ userId: user._id });

    return SUCCESS(res, 200, "LoggedIn successfully", {
      data: {
        token,
      },
    });
  }
);

export default {
  login,
};
