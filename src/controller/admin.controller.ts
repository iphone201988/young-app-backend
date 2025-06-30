import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, generateJwtToken } from "../utils/helper";
import User from "../model/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { adStatus, postType, userRole } from "../utils/enums";
import {
  GetAllUsersRequest,
  IdRequest,
  PaginationRequest,
  UpdateAdStatusRequest,
  UpdateUserStatusRequest,
} from "../../types/API/Admin/types";
import { LoginUserRequest } from "../../types/API/User/types";
import Report from "../model/report.model";
import Advertise from "../model/advertise.model";
import Post from "../model/post.model";
import moment from "moment";

const login = TryCatch(
  async (
    req: Request<{}, {}, LoginUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    console.log("enter here ");
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
const getDashboardStats = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    // Date ranges
    const startOfThisMonth = moment.utc().startOf("month").toDate();
    const endOfThisMonth = moment.utc().endOf("month").toDate();

    const startOfLastMonth = moment
      .utc()
      .subtract(1, "months")
      .startOf("month")
      .toDate();
    const endOfLastMonth = moment
      .utc()
      .subtract(1, "months")
      .endOf("month")
      .toDate();

    const startOfPrevMonth = moment
      .utc()
      .subtract(2, "months")
      .startOf("month")
      .toDate();
    const endOfPrevMonth = moment
      .utc()
      .subtract(2, "months")
      .endOf("month")
      .toDate();

    // USER STATS
    const totalUsers = await User.countDocuments();

    const usersLastMonth = await User.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const usersPrevMonth = await User.countDocuments({
      createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
    });

    const userGrowthPercent =
      usersPrevMonth === 0
        ? null
        : ((usersLastMonth - usersPrevMonth) / usersPrevMonth) * 100;

    // PENDING CRD STATS
    const pendingCRDs = await User.countDocuments({
      is2FAEnabled: true,
      crdNumber: { $exists: false },
    });

    const pendingCRDsLastMonth = await User.countDocuments({
      is2FAEnabled: true,
      crdNumber: { $exists: false },
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const pendingCRDsPrevMonth = await User.countDocuments({
      is2FAEnabled: true,
      crdNumber: { $exists: false },
      createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
    });

    const crdGrowthPercent =
      pendingCRDsPrevMonth === 0
        ? null
        : ((pendingCRDsLastMonth - pendingCRDsPrevMonth) /
            pendingCRDsPrevMonth) *
          100;

    // PENDING REPORT STATS
    const pendingReports = await Report.countDocuments({
      isResolved: false,
    });

    const pendingReportsLastMonth = await Report.countDocuments({
      isResolved: false,
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const pendingReportsPrevMonth = await Report.countDocuments({
      isResolved: false,
      createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
    });

    const reportGrowthPercent =
      pendingReportsPrevMonth === 0
        ? null
        : ((pendingReportsLastMonth - pendingReportsPrevMonth) /
            pendingReportsPrevMonth) *
          100;

    // RESPONSE
    return res.status(200).json({
      data: {
        totalUsers,
        pendingCRDs,
        pendingReports,
        growth: {
          userGrowthPercent: userGrowthPercent?.toFixed(2),
          crdGrowthPercent: crdGrowthPercent?.toFixed(2),
          reportGrowthPercent: reportGrowthPercent?.toFixed(2),
        },
      },
    });
  }
);

const getAllUsers = TryCatch(
  async (
    req: Request<{}, {}, {}, GetAllUsersRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let { page = 1, limit = process.env.LIMIT } = req.query;
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;
    const count = await User.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const users = await User.find()
      .select(
        "firstName lastName email username phone countryCode role crdNumber profileImage isDeleted  isDeactivated isDocumentVerified"
      )
      .limit(limit)
      .skip(skip);

    return SUCCESS(res, 200, "Users fetched successfully", {
      data: {
        users,
        totalUsers: count,
      },
      pagination: {
        limit,
        page,
        totalPages,
      },
    });
  }
);

const updateUserStatus = TryCatch(
  async (
    req: Request<IdRequest, {}, {}, UpdateUserStatusRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { isDeleted, isDeactivated } = req.query;

    console.log("isDeleted, isDeactivated:::", isDeleted, isDeactivated);

    const user = await User.findById(id);
    let message: string = "";

    if (isDeactivated) {
      user.isDeactivated = isDeactivated;
      message = `User account ${
        user.isDeactivated ? "deactivated" : "activated"
      } successfully`;
    }
    if (isDeleted) {
      user.isDeleted = isDeleted;
      message = `User account ${
        user.isDeleted ? "deleted" : "restored"
      } successfully`;
    }
    await user.save();

    return SUCCESS(res, 200, message);
  }
);

const getPosts = TryCatch(
  async (
    req: Request<{}, {}, {}, PaginationRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let { page = 1, limit = process.env.LIMIT } = req.query;
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;
    const count = await Post.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const totalDeletedPosts = await Post.countDocuments({ isDeleted: true });
    const totalResharedPosts = await Post.countDocuments({
      reSharedBy: { $exists: true },
    });
    const totalScheduledPosts = await Post.countDocuments({
      scheduleDate: { $exists: true },
      isPublished: false,
    });

    const posts = await Post.find({ type: postType.SHARE })
      .populate("userId", "firstName lastName")
      .select("-likedBy -reSharedBy -reSharedPostId -__v")
      .skip(skip)
      .limit(limit);

    return SUCCESS(res, 200, "Posts fetched successfully", {
      data: {
        posts,
        total: count,
        totalDeletedPosts,
        totalResharedPosts,
        totalScheduledPosts,
      },
      pagination: {
        page,
        limit,
        totalPages,
      },
    });
  }
);

const getAllUserComplaints = TryCatch(
  async (
    req: Request<{}, {}, {}, PaginationRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let { page = 1, limit = process.env.LIMIT } = req.query;
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;
    const count = await Report.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const notResolved = await Report.countDocuments({
      $or: [{ isResolved: { $exists: false } }, { isResolved: false }],
    });

    const complaints = await Report.find()
      .populate("userId", "firstName lastName")
      .populate("reporterUserId", "firstName lastName")
      .skip(skip)
      .limit(limit);

    return SUCCESS(res, 200, "Complaints fetched successfully", {
      data: {
        complaints,
        totalComplaints: count,
        notResolved,
      },
      pagination: {
        page,
        limit,
        totalPages,
      },
    });
  }
);

const updateReportStatus = TryCatch(
  async (req: Request<IdRequest>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const report = await Report.findById(id);
    if (!report) return next(new ErrorHandler("Report not found", 400));

    report.isResolved = !report.isResolved;

    await report.save();

    return SUCCESS(res, 200, "Report marked as resolved successfully");
  }
);

const getAllAds = TryCatch(
  async (
    req: Request<{}, {}, {}, PaginationRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let { page = 1, limit = process.env.LIMIT } = req.query;
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;
    const count = await Advertise.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const pendingAds = await Advertise.countDocuments({
      $or: [{ status: adStatus.IN_REVIEW }, { status: { $exists: false } }],
    });
    const approvedAds = await Advertise.countDocuments({
      status: adStatus.APPROVED,
    });
    const rejectedAds = await Advertise.countDocuments({
      status: adStatus.REJECT,
    });

    const ads = await Advertise.find()
      .populate("userId", "firstName lastName")
      .skip(skip)
      .limit(limit);

    return SUCCESS(res, 200, "Ads fetched successfully", {
      data: {
        ads,
        pendingAds,
        approvedAds,
        rejectedAds,
      },
      pagination: {
        page,
        limit,
        totalPages,
      },
    });
  }
);

const updateAdStatus = TryCatch(
  async (
    req: Request<IdRequest, {}, UpdateAdStatusRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { status } = req.body;
    const { id } = req.params;

    const ad = await Advertise.findById(id);
    if (!ad) return next(new ErrorHandler("AD not found", 400));

    ad.status = status;
    await ad.save();

    return SUCCESS(res, 200, "Ad updated successfully");
  }
);

const changePassword = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { currentPassword, newPassword } = req.body;
    const isMatched = await user.matchPassword(currentPassword);

    if (!isMatched) return next(new ErrorHandler("Invalid password", 400));

    user.password = newPassword;
    await user.save();

    return SUCCESS(res, 200, "Password changed successfully");
  }
);

export default {
  login,
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
  getAllUserComplaints,
  updateReportStatus,
  getAllAds,
  updateAdStatus,
  changePassword,
  getPosts,
};
