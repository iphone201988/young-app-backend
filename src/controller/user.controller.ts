import { NextFunction, Request, Response } from "express";
import {
  SUCCESS,
  TryCatch,
  addMinutesToCurrentTime,
  filterUser,
  generateJwtToken,
  generateOTP,
  generateRandomString,
  getFiles,
  stripe,
} from "../utils/helper";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../model/user.model";
import { sendEmail } from "../utils/sendEmail";
import {
  enable2FA,
  getUserByEmail,
  getUserById,
  getUserByUsername,
} from "../services/user.services";
import {
  ChangePasswordType,
  CompleteRegistrationRequest,
  ContactUsRequest,
  FollowUnfollowRequest,
  GetLatestUsersRequest,
  GetUsersRequest,
  LoginUserRequest,
  RegisterUserRequest,
  SendOTPRequest,
  UpdateUserRequest,
  Verify2FARequest,
  VerifyOTPRequest,
} from "../../types/API/User/types";
import { ratingsType, userRole } from "../utils/enums";
import OTPAuth from "otpauth";
import { UserModel } from "../../types/Database/types";
import mongoose from "mongoose";
import Contact from "../model/contact.model";
import Ratings from "../model/ratings.model";
import Chat from "../model/chat.model";
import Report from "../model/report.model";
import Followers from "../model/followers.model";
import { isQuestionOrPlusOrMinusToken } from "typescript";
import Post from "../model/post.model";

const registerUser = TryCatch(
  async (
    req: Request<{}, {}, RegisterUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let {
      firstName,
      lastName,
      role,
      company,
      username,
      email,
      countryCode,
      phone,
      password,
      deviceToken,
      deviceType,
      latitude,
      longitude,
    } = req.body;

    email = email.toLowerCase();
    username = username.toLowerCase();

    let user = await User.findOne({
      email,
      countryCode,
      phone,
      deviceToken,
      deviceType,
    });

    if (user?.isVerified)
      return next(new ErrorHandler("User already exists", 400));

    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        username,
        role,
        email,
        countryCode,
        phone,
        password,
        deviceToken,
        deviceType,
      });
      if (company) user.company = company;
      if (
        typeof longitude === "number" &&
        typeof latitude === "number" &&
        !isNaN(longitude) &&
        !isNaN(latitude)
      ) {
        user.location = {
          type: "Point",
          coordinates: [longitude, latitude],
        };
      }
    }

    const otp = generateOTP();
    user.otp = Number(otp);
    user.otpExpiry = new Date(addMinutesToCurrentTime(2));
    await user.save();
    await sendEmail(email, 1, otp);

    return SUCCESS(res, 201, "Verification code has been sent to your email", {
      data: {
        _id: user._id,
        role: user.role,
      },
    });
  }
);

const verifyOtp = TryCatch(
  async (
    req: Request<{}, {}, VerifyOTPRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, otp, type } = req.body; // Forgot:1,ChangeEmail:2,Verification:3
    const user = await getUserById(userId);
    const now = new Date();

    if (user.otpExpiry < now) {
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      return next(new ErrorHandler("OTP has been expired", 400));
    }

    if (user.otp != otp) return next(new ErrorHandler("Invalid OTP", 400));

    user.otp = undefined;
    user.otpExpiry = undefined;
    if (type == 3) user.isVerified = true;
    user.otpVerified = true;
    if (type == 2) {
      user.email = user.unVerifiedTempCredentials.email;
      user.unVerifiedTempCredentials.email = undefined;
      user.isVerified = true;
    }
    await user.save();
    return SUCCESS(res, 200, `OTP verified successfully`, {
      data: {
        _id: user._id,
        role: user.role,
      },
    });
  }
);

const sendOtp = TryCatch(
  async (
    req: Request<{}, {}, SendOTPRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let { email, type } = req.body; // Forgot:1,ChangeEmail:2
    const emailTemplate = type == 1 ? 3 : 5;
    email = email.toLowerCase();

    let query: any = { email };
    // if (type != 2) query.isVerified = true;
    const user = await User.findOne(query);
    if (!user) return next(new ErrorHandler("User not found", 404));

    const otp = generateOTP();
    user.otp = Number(otp);
    user.otpExpiry = new Date(addMinutesToCurrentTime(2));
    user.otpVerified = false;
    await user.save();
    await sendEmail(user.email, emailTemplate, otp);

    return SUCCESS(
      res,
      200,
      `OTP ${type == 2 ? "resent" : "sent"} successfully`,
      {
        data: {
          _id: user._id,
        },
      }
    );
  }
);

const completeRegistration = TryCatch(
  async (
    req: Request<{}, {}, CompleteRegistrationRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      userId,
      role,
      crdNumber,
      age,
      gender,
      maritalStatus,
      children,
      homeOwnerShip,
      objective,
      financialExperience,
      investments,
      servicesInterested,
      productsOffered,
      areaOfExpertise,
      industry,
      interestedIn,
      stripeCustomerId,
      packageName,
    } = req.body;

    const user = await getUserById(userId);

    if (user.role != role) return next(new ErrorHandler("Invalid role", 400));

    const images = getFiles(req, [
      "licenseImage",
      "profileImage",
      "additionalPhotos",
    ]);

    console.log("images::::", images);

    if (images?.profileImage?.length)
      user.profileImage = images.profileImage[0];
    if (images?.licenseImage?.length)
      user.licenseImage = images.licenseImage[0];
    user.packageName = packageName;

    if (role == userRole.GENERAL_MEMBER) {
      user.age = age;
      user.gender = gender;
      user.maritalStatus = maritalStatus;
      user.children = children;
      user.homeOwnerShip = homeOwnerShip;
      user.objective = objective;
      user.financialExperience = financialExperience;
      user.investments = investments;
      user.servicesInterested = servicesInterested;
    }

    if (role == userRole.FINANCIAL_ADVISOR || role == userRole.FINANCIAL_FIRM) {
      console.log("FINANCIAL_FIRM::::", images);
      if (images?.additionalPhotos?.length)
        user.additionalPhotos = images.additionalPhotos;
      user.crdNumber = crdNumber;
      user.productsOffered = productsOffered;
      user.areaOfExpertise = areaOfExpertise;
    }

    if (role == userRole.STARTUP || role == userRole.SMALL_BUSINESS) {
      console.log("SMALL_BUSINESS::::", images);
      if (images?.additionalPhotos?.length)
        user.additionalPhotos = images.additionalPhotos;
      user.industry = industry;
      user.interestedIn = interestedIn;
    }

    if (role == userRole.INVESTOR) {
      if (images?.additionalPhotos?.length)
        user.additionalPhotos = images.additionalPhotos;
      user.industry = industry;
      user.areaOfExpertise = areaOfExpertise;
    }

    if (stripeCustomerId) user.stripeCustomerId = stripeCustomerId;

    user.isRegistrationCompleted = true;
    await user.save();

    const data = await enable2FA(user);

    return SUCCESS(res, 200, "User registration completed successfully", {
      data: {
        ...data,
        _id: user._id,
      },
    });
  }
);

const verify2FA = TryCatch(
  async (
    req: Request<{}, {}, Verify2FARequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, otp } = req.body;

    const user = await getUserById(userId);

    if (user?.isDeactivated)
      return next(new ErrorHandler("Your account has been deactivated", 400));

    const totp = new OTPAuth.TOTP({
      issuer: process.env.TOTP_ISSUER,
      label: process.env.TOTP_LABEL,
      algorithm: "SHA1",
      digits: 6,
      secret: user.secret,
    });

    const isValidated = totp.validate({ token: otp.toString(), window: 1 });

    if (isValidated == null)
      return next(new ErrorHandler("User authentication failed", 400));

    const jti = generateRandomString(20);
    const token = generateJwtToken({ userId: user._id, jti });

    user.jti = jti;
    if (!user.is2FAEnabled) user.is2FAEnabled = true;
    await user.save();

    return SUCCESS(res, 200, "User authenticated successfully", {
      data: {
        token,
        name: user.firstName + " " + user.lastName,
        role: user.role,
      },
    });
  }
);

const loginUser = TryCatch(
  async (
    req: Request<{}, {}, LoginUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let {
      username,
      email,
      password,
      deviceType,
      deviceToken,
      longitude,
      latitude,
    } = req.body;

    let user: UserModel | null;
    if (email) {
      email = email.toLowerCase();
      user = await getUserByEmail(email);
    }
    if (username) user = await getUserByUsername(username);

    if (!user) return next(new ErrorHandler("Invalid credentials", 400));

    if (user?.isDeactivated) {
      return next(new ErrorHandler("Your account has been deactivated", 400));
    }

    const isMatched = await user.matchPassword(password);
    if (!isMatched) return next(new ErrorHandler("Invalid credentials", 400));

    const [followers, following, customers] = await Promise.all([
      Followers.countDocuments({ userId: user._id }),
      Followers.countDocuments({ followers: user._id }),
      Followers.countDocuments({
        userId: user._id,
        customer: { $exists: true },
      }),
    ]);

    if (
      typeof longitude === "number" &&
      typeof latitude === "number" &&
      !isNaN(longitude) &&
      !isNaN(latitude)
    ) {
      user.location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
      await user.save();
    }

    if (!user.isRegistrationCompleted) {
      return SUCCESS(res, 200, "Please complete your registration first", {
        data: {
          ...filterUser(user.toObject()),
          followers,
          following,
          customers,
        },
      });
    }

    user.deviceType = deviceType;
    user.deviceToken = deviceToken;
    user.lastLogin = new Date();
    user.isDeactivatedByUser = false;
    await user.save();

    const data = await enable2FA(user, !user?.is2FAEnabled);

    return SUCCESS(res, 200, "Please enter the authentication code", {
      data: { ...data, _id: user._id, is2FAEnabled: user.is2FAEnabled },
    });
  }
);

const changePassword = TryCatch(
  async (
    req: Request<{}, {}, ChangePasswordType>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, password } = req.body;
    const user = await getUserById(userId);
    if (!user.otpVerified)
      return next(new ErrorHandler("Please verify OTP first", 400));
    user.password = password;
    user.otpVerified = false;
    await user.save();
    return SUCCESS(res, 200, "Password has been changed successfully");
  }
);

const followUnfollowUser = TryCatch(
  async (
    req: Request<FollowUnfollowRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { user } = req;
    const { userId } = req.params;
    const userToFollow = await getUserById(userId);

    const isFollowing = await Followers.findOne({
      userId,
      follower: user?._id,
    });

    if (isFollowing) {
      await Followers.deleteOne({ _id: isFollowing?._id });
    } else {
      await Followers.create({
        userId,
        follower: user?._id,
      });
    }

    return SUCCESS(
      res,
      200,
      `User ${isFollowing ? "Unfollowed" : "followed"} successfully`
    );
  }
);

const updateUser = TryCatch(
  async (
    req: Request<{}, {}, UpdateUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { user } = req;

    const {
      firstName,
      lastName,
      company,
      website,
      city,
      state,
      race,
      gender,
      ageRange,
      yearFounded,
      about,
      fairnessForward,
      productsOffered,
      areaOfExpertise,
      businessRevenue,
      investors,
      isCustomer,

      industriesSeeking,

      launchDate,
      seeking,

      stageOfBusiness,
      fundsRaised,
      fundsRaising,
      industry,

      educationLevel,
      crdNumber,
      certificates,
      servicesProvided,
      yearsInFinancialIndustry,
      occupation,

      maritalStatus,
      children,
      financialExperience,
      residenceStatus,
      yearsEmployed,
      salaryRange,
      riskTolerance,
      topicsOfInterest,
      goals,
      stockInvestments,
      specificStockSymbols,
      cryptoInvestments,
      specificCryptoSymbols,
      otherSecurityInvestments,
      realEstate,
      retirementAccount,
      savings,
      startups,
      investmentAccounts,
      retirement,
      investmentRealEstate,

      additionalPhotosToBeRemoved = [],
      formUploadToBeRemoved = [],
      latitude,
      longitude,
      isDeactivatedByUser,
    } = req.body;

    const files = getFiles(req, [
      "profileImage",
      "licenseImage",
      "additionalPhotos",
      "formUpload",
    ]);

    console.log("additionalPhotosToBeRemoved::::", additionalPhotosToBeRemoved);
    console.log("formUploadToBeRemoved::::", formUploadToBeRemoved);

    additionalPhotosToBeRemoved.forEach((photo: string) => {
      const index = user.additionalPhotos.indexOf(photo);
      if (index > -1) {
        user.additionalPhotos.splice(index, 1);
      }
    });

    formUploadToBeRemoved.forEach((photo: string) => {
      const index = user.formUpload.indexOf(photo);
      console.log("index:::", user.formUpload);
      if (index > -1) {
        user.formUpload.splice(index, 1);
      }
    });

    if (files?.profileImage?.length) user.profileImage = files.profileImage[0];
    if (files?.licenseImage?.length) user.licenseImage = files.licenseImage[0];

    if (files?.additionalPhotos?.length) {
      if (user.additionalPhotos.length + files?.additionalPhotos?.length > 5) {
        return next(new ErrorHandler("Additional Photos limit exceed", 400));
      }

      files?.additionalPhotos.forEach((photo: string) => {
        user.additionalPhotos.push(photo);
      });
    }
    if (files?.formUpload?.length) {
      if (user.formUpload.length + files?.formUpload.length > 2) {
        return next(new ErrorHandler("Form Upload limit exceed", 400));
      }

      files?.formUpload.forEach((photo: string) => {
        user.formUpload.push(photo);
      });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (company) user.company = company;
    if (website) user.website = website;
    if (city) user.city = city;
    if (state) user.state = state;
    if (race) user.race = race;
    if (gender) user.gender = gender;
    if (ageRange) user.age = ageRange;
    if (yearFounded) user.yearFounded = yearFounded;
    if (about) user.about = about;
    if (fairnessForward) user.fairnessForward = fairnessForward;

    if (user.role == userRole.FINANCIAL_FIRM) {
      if (productsOffered) user.productsOffered = productsOffered;
      if (areaOfExpertise) user.areaOfExpertise = areaOfExpertise;
      if (businessRevenue) user.businessRevenue = businessRevenue;
      if (investors) user.investors = investors;
      if (yearFounded) user.yearFounded = yearFounded;
    }

    if (user.role == userRole.INVESTOR) {
      if (yearFounded) user.yearFounded = yearFounded;
      if (industriesSeeking) user.industriesSeeking = industriesSeeking;
      if (businessRevenue) user.businessRevenue = businessRevenue;
      if (investors) user.investors = investors;
    }

    if (user.role == userRole.SMALL_BUSINESS) {
      if (industry) user.industry = industry;
      if (launchDate) user.launchDate = launchDate;
      if (seeking) user.seeking = seeking;
    }

    if (user.role == userRole.STARTUP) {
      if (industry) user.industry = industry;
      if (launchDate) user.launchDate = launchDate;
      if (seeking) user.seeking = seeking;
      if (stageOfBusiness) user.stageOfBusiness = stageOfBusiness;
      if (fundsRaised) user.fundsRaised = fundsRaised;
      if (fundsRaising) user.fundsRaising = fundsRaising;
    }

    if (user.role == userRole.FINANCIAL_ADVISOR) {
      if (ageRange) user.age = ageRange;
      if (educationLevel) user.educationLevel = educationLevel;
      if (crdNumber) user.crdNumber = crdNumber;
      if (certificates) user.certificates = certificates;
      if (servicesProvided) user.servicesProvided = servicesProvided;
      if (yearsInFinancialIndustry)
        user.yearsInFinancialIndustry = yearsInFinancialIndustry;
      if (occupation) user.occupation = occupation;
    }

    if (user.role == userRole.GENERAL_MEMBER) {
      if (maritalStatus) user.maritalStatus = maritalStatus;
      if (children) user.children = children;
      if (financialExperience) user.financialExperience = financialExperience;
      if (residenceStatus) user.residenceStatus = residenceStatus;
      if (yearsEmployed) user.yearsEmployed = yearsEmployed;
      if (salaryRange) user.salaryRange = salaryRange;
      if (riskTolerance) user.riskTolerance = riskTolerance;
      if (topicsOfInterest) user.topicsOfInterest = topicsOfInterest.split(",");
      if (goals) user.goals = goals;
      if (stockInvestments) user.stockInvestments = stockInvestments;
      if (specificStockSymbols)
        user.specificStockSymbols = specificStockSymbols;
      if (cryptoInvestments) user.cryptoInvestments = cryptoInvestments;
      if (specificCryptoSymbols)
        user.specificCryptoSymbols = specificCryptoSymbols;
      if (otherSecurityInvestments)
        user.otherSecurityInvestments = otherSecurityInvestments;
      if (realEstate) user.realEstate = realEstate;
      if (retirementAccount) user.retirementAccount = retirementAccount;
      if (savings) user.savings = savings;
      if (startups) user.startups = startups;
      if (investmentAccounts) user.investmentAccounts = investmentAccounts;
      if (retirement) user.retirement = retirement;
      if (investmentRealEstate)
        user.investmentRealEstate = investmentRealEstate;
    }
    if (
      typeof longitude === "number" &&
      typeof latitude === "number" &&
      !isNaN(longitude) &&
      !isNaN(latitude)
    ) {
      user.location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
    }

    if (isDeactivatedByUser) {
      user.isDeactivatedByUser = true;
      user.jti = undefined;
      user.deviceToken = undefined;
      user.deviceType = undefined;
    }

    await user.save();
    return SUCCESS(res, 200, "User updated successfully", {
      data: {
        name: user.firstName + " " + user.lastName,
      },
    });
  }
);

const updateCustomers = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId: loggedInUserId } = req;
    const { userId } = req.params;

    if (loggedInUserId == userId)
      return next(new ErrorHandler("You can't add yourself as customer", 400));

    const user = await getUserById(userId);

    const isAlreadyCustomer = await Followers.findOne({
      userId: user._id,
      customer: loggedInUserId,
    });

    if (isAlreadyCustomer) {
      await Followers.deleteOne({ userId, customer: loggedInUserId });
    } else {
      await Followers.create({
        userId,
        customer: loggedInUserId,
      });
    }

    return SUCCESS(
      res,
      200,
      `User ${isAlreadyCustomer ? "removed from" : "added to"} customers`
    );
  }
);

const getUserProfile = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user: loggedInUser } = req;
    const userId = req.query.userId || loggedInUser._id;
    const userProfile = await User.findById(userId);
    if (!userProfile) return next(new ErrorHandler("User not found", 404));

    let isRated: any;
    let isReported: any;
    let chatId: any;
    let isFollowed: any;
    let sharesCount: any;
    let isConnectedWithProfile: any;
    if (req.query.userId && req.user) {
      isRated = await Ratings.findOne({
        senderId: loggedInUser._id,
        receiverId: req.query.userId,
      }).select("ratings");

      isReported = await Report.findOne({
        reporterUserId: loggedInUser._id,
        userId: req.query.userId,
      });

      const chat = await Chat.findOne({
        chatUsers: { $all: [req.userId, req.query.userId] },
      });
      chatId = chat?._id;
    }

    const ratings = await Ratings.find({ receiverId: userId }).select(
      "ratings"
    );

    if (req.user) {
      [isFollowed, isConnectedWithProfile, sharesCount] = await Promise.all([
        Followers.findOne({
          userId: userProfile._id,
          follower: loggedInUser._id,
        }),
        Followers.findOne({
          userId: userProfile._id,
          customer: loggedInUser._id,
        }),
        Post.countDocuments({ userId: userProfile._id }),
      ]);
    }

    const [followers, following, customers] = await Promise.all([
      Followers.countDocuments({ userId }),
      Followers.countDocuments({ follower: userId }),
      Followers.countDocuments({
        userId: userProfile._id,
        customer: { $exists: true },
      }),
    ]);

    return SUCCESS(res, 200, "User profile fetched successfully", {
      data: {
        user: {
          ...filterUser(userProfile.toObject()),
          ratings,
          chatId,
          isRated: isRated?.ratings,
          isFollowed: isFollowed ? true : false,
          isReported: isReported ? true : false,
          isConnectedWithProfile: isConnectedWithProfile ? true : false,
          customers,
          followers,
          following,
          sharesCount,
        },
      },
    });
  }
);

const getUnauthUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) return next(new ErrorHandler("User not found", 404));

    return SUCCESS(res, 200, "User profile fetched successfully", {
      data: {
        _id: user._id,
        isDocumentVerified: user?.isDocumentVerified
          ? user?.isDocumentVerified
          : null,
      },
    });
  }
);

const deleteAccount = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    user.isDeleted = true;
    await user.save();
    return SUCCESS(res, 200, "User deleted successfully");
  }
);

const logout = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    user.jti = undefined;
    user.deviceToken = undefined;
    user.deviceType = undefined;
    await user.save();
    return SUCCESS(res, 200, "User loggedout successfully");
  }
);

const getUsers = TryCatch(
  async (
    req: Request<{}, {}, {}, GetUsersRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, user } = req;
    let {
      category = "all",
      page = 1,
      limit = 20,
      distance,
      rating,
      byFollowers,
      byCustomers,
      search,
    } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;
    const longitude = user?.location?.coordinates[0];
    const latitude = user?.location?.coordinates[1];

    const query: any = { _id: { $ne: userId }, isDeleted: false };

    if (category != "all") {
      const roles = category.split(",");
      query.role = { $in: roles };
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ];
    }

    let initialQuery: any = {};

    if (distance) {
      if (
        distance &&
        typeof longitude === "number" &&
        typeof latitude === "number" &&
        !isNaN(longitude) &&
        !isNaN(latitude)
      ) {
        initialQuery = {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            distanceField: "distance", // will be in meters
            spherical: true,
            query: query,
          },
        };
      }
    } else {
      initialQuery = { $match: query };
    }

    const pipeline: any = [];

    const sortOptions: any = {};

    if (rating) {
      pipeline.push(
        {
          $lookup: {
            from: "ratings",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$receiverId", "$$userId"] },
                      { $eq: ["$type", ratingsType.USER] },
                      { $eq: ["$ratings", Number(rating)] },
                    ],
                  },
                },
              },
            ],
            as: "ratingsMatched",
          },
        },
        {
          $match: {
            "ratingsMatched.0": { $exists: true },
          },
        }
      );
    }

    if (byFollowers) {
      pipeline.push(
        {
          $lookup: {
            from: "followers",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$userId"] },
                      { $ne: ["$follower", null] },
                    ],
                  },
                },
              },
            ],
            as: "followersData",
          },
        },
        {
          $addFields: {
            followersCount: { $size: "$followersData" },
          },
        }
      );
      sortOptions.followersCount = -1;
    }

    if (byCustomers) {
      pipeline.push(
        {
          $lookup: {
            from: "followers",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$userId"] },
                      { $ne: ["$customer", null] },
                    ],
                  },
                },
              },
            ],
            as: "customersData",
          },
        },
        {
          $addFields: {
            customersCount: { $size: "$customersData" },
          },
        }
      );
      sortOptions.customersCount = -1;
    }

    const countResult = await User.aggregate([
      initialQuery,
      ...pipeline,
      { $count: "total" },
    ]);

    const total = countResult[0]?.total || 0;

    const users = await User.aggregate([
      initialQuery,
      ...pipeline,
      {
        $lookup: {
          from: "ratings",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$receiverId", "$$userId"] },
                    { $eq: ["$type", ratingsType.USER] },
                  ],
                },
              },
            },
          ],
          as: "ratings",
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          username: 1,
          profileImage: 1,
          role: 1,
          ratings: {
            $ifNull: [{ $arrayElemAt: ["$ratings.ratings", 0] }, null],
          },
        },
      },
    ]);

    return SUCCESS(res, 200, "Users fetched successfully", {
      data: {
        users,
      },
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  }
);

const getLatestUsers = TryCatch(
  async (
    req: Request<{}, {}, {}, GetLatestUsersRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, user } = req;
    const { category, distance, rating, byFollowers, byCustomers } = req.query;
    const longitude = user?.location?.coordinates[0];
    const latitude = user?.location?.coordinates[1];

    const query: any = {
      _id: { $ne: new mongoose.Types.ObjectId(userId) },
      isDeleted: false,
    };

    if (category) query.role = category;

    let initialQuery: any = {};

    if (distance) {
      if (
        distance &&
        typeof longitude === "number" &&
        typeof latitude === "number" &&
        !isNaN(longitude) &&
        !isNaN(latitude)
      ) {
        initialQuery = {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            distanceField: "distance", // will be in meters
            spherical: true,
            query: query,
          },
        };
      }
    } else {
      initialQuery = { $match: query };
    }

    const pipeline: any = [
      initialQuery,
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: "$role",
          users: { $push: "$$ROOT" },
        },
      },
    ];

    if (!category) {
      pipeline.push({
        $project: {
          users: { $slice: ["$users", 5] },
        },
      });
    }

    pipeline.push(
      { $unwind: "$users" },
      {
        $replaceRoot: { newRoot: "$users" },
      },
      {
        $lookup: {
          from: "ratings",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$receiverId", "$$userId"] },
                    { $eq: ["$senderId", new mongoose.Types.ObjectId(userId)] },
                    { $eq: ["$type", ratingsType.USER] },
                  ],
                },
              },
            },
            {
              $project: {
                ratings: 1,
              },
            },
            // {
            //   $group: {
            //     _id: null,
            //     ratings: { $avg: "$ratings" },
            //   },
            // },
          ],
          as: "isRated",
        },
      },
      {
        $unwind: {
          path: "$isRated",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          isRated: "$isRated.ratings",
        },
      }
    );

    const sortOptions: any = {};

    if (rating) {
      pipeline.push(
        {
          $lookup: {
            from: "ratings",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$receiverId", "$$userId"] },
                      { $eq: ["$type", ratingsType.USER] },
                      { $eq: ["$ratings", Number(rating)] },
                    ],
                  },
                },
              },
            ],
            as: "ratingsMatched",
          },
        },
        {
          $match: {
            "ratingsMatched.0": { $exists: true },
          },
        }
      );
    }

    if (byFollowers) {
      pipeline.push(
        {
          $lookup: {
            from: "followers",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$userId"] },
                      { $ne: ["$follower", null] },
                    ],
                  },
                },
              },
            ],
            as: "followersData",
          },
        },
        {
          $addFields: {
            followersCount: { $size: "$followersData" },
          },
        }
      );
      sortOptions.followersCount = -1;
    }

    if (byCustomers) {
      pipeline.push(
        {
          $lookup: {
            from: "followers",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$userId"] },
                      { $ne: ["$customer", null] },
                    ],
                  },
                },
              },
            ],
            as: "customersData",
          },
        },
        {
          $addFields: {
            customersCount: { $size: "$customersData" },
          },
        }
      );
      sortOptions.customersCount = -1;
    }

    if (Object.keys(sortOptions).length) {
      pipeline.push({
        $sort: sortOptions,
      });
    }

    pipeline.push({
      $project: {
        firstName: 1,
        lastName: 1,
        username: 1,
        profileImage: 1,
        role: 1,
        isRated: 1,
      },
    });

    const users = await User.aggregate(pipeline);

    return SUCCESS(res, 200, "Users fetched successfully", {
      data: {
        users,
      },
    });
  }
);

const contactUs = TryCatch(
  async (
    req: Request<{}, {}, ContactUsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { subject, name, company, email } = req.body;

    const files = getFiles(req, ["file"]);

    await Contact.create({
      userId,
      name,
      company,
      subject,
      email,
      file: files.file[0],
    });

    return SUCCESS(res, 200, "Our team will contact you soon");
  }
);

export default {
  registerUser,
  verifyOtp,
  sendOtp,
  completeRegistration,
  loginUser,
  changePassword,
  verify2FA,
  followUnfollowUser,
  updateUser,
  deleteAccount,
  logout,
  getUserProfile,
  updateCustomers,
  getUsers,
  getLatestUsers,
  contactUs,
  getUnauthUser,
};
