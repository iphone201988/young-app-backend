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
import Vault from "../model/vault.model";

const getDateRange = (monthsAgo: number) => ({
  start: moment.utc().subtract(monthsAgo, "months").startOf("month").toDate(),
  end: moment.utc().subtract(monthsAgo, "months").endOf("month").toDate(),
});

const calculateGrowth = (current: number, previous: number) =>
  previous === 0 ? null : (((current - previous) / previous) * 100).toFixed(2);

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
    const currentYear = moment().year();
    const currentMonth = moment().month(); // 0-based index

    const lastMonth = getDateRange(1);
    const prevMonth = getDateRange(2);

    const [
      totalUsers,
      usersLastMonth,
      usersPrevMonth,
      pendingCRDs,
      pendingCRDsLastMonth,
      pendingCRDsPrevMonth,
      pendingReports,
      pendingReportsLastMonth,
      pendingReportsPrevMonth,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({
        createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
      }),
      User.countDocuments({
        createdAt: { $gte: prevMonth.start, $lte: prevMonth.end },
      }),
      User.countDocuments({
        is2FAEnabled: true,
        crdNumber: { $exists: false },
      }),
      User.countDocuments({
        is2FAEnabled: true,
        crdNumber: { $exists: false },
        createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
      }),
      User.countDocuments({
        is2FAEnabled: true,
        crdNumber: { $exists: false },
        createdAt: { $gte: prevMonth.start, $lte: prevMonth.end },
      }),
      Report.countDocuments({ isResolved: false }),
      Report.countDocuments({
        isResolved: false,
        createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
      }),
      Report.countDocuments({
        isResolved: false,
        createdAt: { $gte: prevMonth.start, $lte: prevMonth.end },
      }),
    ]);

    const growth = {
      userGrowthPercent: calculateGrowth(usersLastMonth, usersPrevMonth),
      crdGrowthPercent: calculateGrowth(
        pendingCRDsLastMonth,
        pendingCRDsPrevMonth
      ),
      reportGrowthPercent: calculateGrowth(
        pendingReportsLastMonth,
        pendingReportsPrevMonth
      ),
    };

    // Monthly published post stats (only 'share' and 'stream')
    const monthlyPostCounts = await Promise.all(
      Array.from({ length: currentMonth + 1 }).map(async (_, index) => {
        const start = moment
          .utc()
          .year(currentYear)
          .month(index)
          .startOf("month")
          .toDate();
        const end = moment
          .utc()
          .year(currentYear)
          .month(index)
          .endOf("month")
          .toDate();

        const shares = Post.countDocuments({
          type: postType.SHARE,
          isPublished: true,
          isDeleted: false,
          createdAt: { $gte: start, $lte: end },
        });
        const streams = Post.countDocuments({
          type: postType.STREAM,
          isPublished: true,
          isDeleted: false,
          createdAt: { $gte: start, $lte: end },
        });
        const vaults = Vault.countDocuments({
          isDeleted: false,
          createdAt: { $gte: start, $lte: end },
        });

        const [shareCount, streamCount, vaultCount] = await Promise.all([
          shares,
          streams,
          vaults,
        ]);

        return {
          month: moment().month(index).format("MMM"), // e.g., 'Jan', 'Feb'
          shareCount,
          streamCount,
          vaultCount,
        };
      })
    );

    return res.status(200).json({
      data: {
        totalUsers,
        pendingCRDs,
        pendingReports,
        growth,
        postsPerMonth: monthlyPostCounts,
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
