import { UserModel } from "../../types/Database/types";
import User from "../model/user.model";
import ErrorHandler from "../utils/ErrorHandler";

export const getUserById = async (userId: string): Promise<UserModel> => {
  const user = await User.findOne({ _id: userId, isDeleted: false });
  if (!user) throw new ErrorHandler("User not found", 400);

  return user;
};
