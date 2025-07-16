import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, getFiles } from "../utils/helper";
import Vault from "../model/vault.model";
import { postType, vaultAccess } from "../utils/enums";
import {
  AddCommentRequest,
  AddRemoveMembersRequest,
  CreateVaultRequest,
  GetVaultsRequest,
  VaultIdRequest,
} from "../../types/API/Vault/types";
import { getVaultById } from "../services/vault.services";
import ErrorHandler from "../utils/ErrorHandler";
import Comments from "../model/comments.model";
import User from "../model/user.model";
import mongoose from "mongoose";
import SavedItems from "../model/savedItems.model";

const createVault = TryCatch(
  async (
    req: Request<{}, {}, CreateVaultRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { title, topic, description, access, members, category } = req.body;

    const files = getFiles(req, ["image"]);

    await Vault.create({
      admin: userId,
      title,
      topic,
      description,
      access,
      image: files.image[0],
      members: members.split(","),
      category: category.split(","),
    });

    return SUCCESS(res, 201, "Vault created successfully");
  }
);

const getVaults = TryCatch(
  async (
    req: Request<{}, {}, {}, GetVaultsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { user, userId } = req;
    let {
      userType,
      page = 1,
      limit = process.env.LIMIT,
      sort,
      distance,
      rating,
      byFollowers,
      bySave,
      search,
    } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (Number(page) - 1) * limit;

    const query: any = {
      access: vaultAccess.PUBLIC,
      isDeleted: false,
      ...(search ? { title: { $regex: search, $options: "i" } } : {}),
    };

    const sortOptions: any = { createdAt: sort ? 1 : -1 };
    const filterQuery = [];
    const longitude = user?.location?.coordinates[0];
    const latitude = user?.location?.coordinates[1];

    if (bySave) {
      filterQuery.push({
        $lookup: {
          from: "saveditems",
          localField: "_id",
          foreignField: "vault",
          as: "allSaves",
          pipeline: [
            {
              $match: {
                itemType: postType.VAULT,
              },
            },
          ],
        },
      });
      sortOptions.allSaves = -1;
    }
    if (byFollowers) {
      filterQuery.push(
        {
          $lookup: {
            from: "followers",
            localField: "admin._id",
            foreignField: "userId",
            as: "totalFollowers",
          },
        },
        {
          $addFields: {
            followersCount: { $size: "$totalFollowers" },
          },
        }
      );
      sortOptions.followersCount = -1;
    }
    if (rating) {
      filterQuery.push(
        {
          $lookup: {
            from: "ratings",
            let: { id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$vaultId", "$$id"] },
                      { $eq: ["$ratings", rating] },
                    ],
                  },
                },
              },
            ],
            as: "ratings",
          },
        },
        {
          $match: {
            ratings: { $ne: [] }, // only keep posts that have matching ratings
          },
        }
      );
    }
    if (distance) {
      filterQuery.push({
        $addFields: {
          distance: {
            $sqrt: {
              $add: [
                {
                  $pow: [
                    {
                      $subtract: [
                        { $arrayElemAt: ["$admin.location.coordinates", 1] },
                        latitude,
                      ],
                    },
                    2,
                  ],
                },
                {
                  $pow: [
                    {
                      $subtract: [
                        { $arrayElemAt: ["$admin.location.coordinates", 0] },
                        longitude,
                      ],
                    },
                    2,
                  ],
                },
              ],
            },
          },
        },
      });
      sortOptions.distance = -1;
    }

    const total = await Vault.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          let: { adminId: "$admin" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$adminId"] },
                role: userType,
              },
            },
          ],
          as: "admin",
        },
      },
      {
        $unwind: {
          path: "$admin",
        },
      },
      ...filterQuery,
      {
        $count: "count",
      },
    ]);

    if (Object.keys(sortOptions).length) {
      filterQuery.push({
        $sort: sortOptions,
      });
    }

    const vaults = await Vault.aggregate([
      {
        $match: query,
      },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "vaultId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { adminId: "$admin" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$adminId"],
                },
                role: userType,
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                username: 1,
                profileImage: 1,
              },
            },
          ],
          as: "admin",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { members: "$members" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$members"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                profileImage: 1,
              },
            },
            {
              $limit: 4,
            },
          ],
          as: "members",
        },
      },
      {
        $unwind: {
          path: "$admin",
        },
      },
      {
        $lookup: {
          from: "reports",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$vaultId", "$$id"] },
                reporterUserId: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                reason: 1,
                _id: 1,
              },
            },
          ],
          as: "isReported",
        },
      },
      {
        $lookup: {
          from: "ratings",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$vaultId", "$$id"] },
                type: postType.VAULT,
                senderId: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                ratings: 1,
                _id: 1,
              },
            },
          ],
          as: "ratings",
        },
      },
      {
        $unwind: {
          path: "$ratings",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          ratings: "$ratings.ratings",
        },
      },
      {
        $lookup: {
          from: "saveditems",
          let: { vaultId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$vault", "$$vaultId"] },
                    { $eq: ["$itemType", postType.VAULT] },
                    { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                  ],
                },
              },
            },
          ],
          as: "savedItems",
        },
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" },
          isReported: { $gt: [{ $size: "$isReported" }, 0] },
          isSaved: { $gt: [{ $size: { $ifNull: ["$savedItems", []] } }, 0] },
        },
      },
      ...filterQuery,
      // { $sort: { createdAt: -1 } },
      {
        $project: {
          __v: 0,
          updatedAt: 0,
          category: 0,
          access: 0,
          isDeleted: 0,
          comments: 0,
          savedItems: 0,
        },
      },
    ]);

    return SUCCESS(res, 200, "Vaults fetched successfully", {
      data: {
        vaults,
      },
      pagination: {
        total: total[0]?.count || 0,
        page: Number(page),
        limit: Number(limit),
      },
    });
  }
);

const addRemoveMembersByAdmin = TryCatch(
  async (
    req: Request<VaultIdRequest, {}, {}, AddRemoveMembersRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { vaultId } = req.params;
    const { memberId } = req.query;

    const vault = await getVaultById(vaultId);
    const isAlreadyMember = vault.members.includes(memberId);

    if (isAlreadyMember) {
      await Vault.findByIdAndUpdate(vaultId, {
        $pull: { members: memberId },
      });
    } else {
      await Vault.findByIdAndUpdate(vaultId, {
        $push: { members: memberId },
      });
    }

    return SUCCESS(res, 200, "Members updated successfully");
  }
);

const saveUnsaveVault = TryCatch(
  async (req: Request<VaultIdRequest>, res: Response, next: NextFunction) => {
    const { userId, user } = req;
    const { vaultId } = req.params;

    const existingSavedVault = await SavedItems.findOne({
      userId,
      vault: vaultId,
      itemType: postType.VAULT,
    });

    if (existingSavedVault) {
      await SavedItems.deleteOne({ _id: existingSavedVault._id });
    } else {
      await SavedItems.create({
        userId,
        vault: vaultId,
        itemType: postType.VAULT,
      });
    }

    return SUCCESS(
      res,
      200,
      `Vault ${existingSavedVault ? "unsaved" : "saved"} successfully`,
      {
        data: {
          vaultId,
        },
      }
    );
  }
);

const getVaultDetailById = TryCatch(
  async (req: Request<VaultIdRequest>, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { vaultId } = req.params;

    const vault = await Vault.findById(vaultId)
      .populate("admin", "firstName lastName username profileImage")
      .populate("members", "firstName lastName username profileImage")
      .select("-__v -updatedAt -isDeleted");

    if (!vault) return next(new ErrorHandler("Vault not found", 404));

    const isMember = vault.members.some(
      (member) => member._id.toString() === userId
    );

    if (vault.access === vaultAccess.PRIVATE && !isMember)
      return next(new ErrorHandler("You are not a member of this vault", 403));

    return SUCCESS(res, 200, "Vault fetched successfully", {
      data: {
        vault: {
          ...vault.toObject(),
          isMember,
        },
      },
    });
  }
);

const joinLeaveVault = TryCatch(
  async (req: Request<VaultIdRequest>, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { vaultId } = req.params;

    const vault = await getVaultById(vaultId);

    if (vault.access === vaultAccess.PRIVATE)
      return next(new ErrorHandler("Vault is private", 403));

    const isAlreadyMember = vault.members.includes(userId);

    if (isAlreadyMember) {
      await Vault.findByIdAndUpdate(vaultId, {
        $pull: { members: userId },
      });
    } else {
      await Vault.findByIdAndUpdate(vaultId, {
        $push: { members: userId },
      });
    }

    return SUCCESS(
      res,
      200,
      `${isAlreadyMember ? "Left" : "Joined"} vault successfully`,
      {
        data: {
          vaultId,
        },
      }
    );
  }
);

// const addComment = TryCatch(
//   async (
//     req: Request<{}, {}, AddCommentRequest>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const { userId } = req;
//     const { vaultId, comment } = req.body;

//     const vault = await getVaultById(vaultId);

//     const isMember = vault.members.includes(userId);

//     if (!isMember)
//       return next(new ErrorHandler("You are not a member of this vault", 403));

//     await Comments.create({ userId, vaultId, comment, type: postType.VAULT });

//     return SUCCESS(res, 200, `Comment added successfully`);
//   }
// );

// const getAllComments = TryCatch(
//   async (req: Request<VaultIdRequest>, res: Response, next: NextFunction) => {
//     const { vaultId } = req.params;

//     const vault = await getVaultById(vaultId);

//     const comments = await Comments.find({ vaultId: vault._id })
//       .populate("userId", "_id firstName lastName profileImage")
//       .select("-updatedAt -__v")
//       .sort({ createdAt: -1 });

//     return SUCCESS(res, 200, "Comments fetched successfully", {
//       data: { comments },
//     });
//   }
// );

const getSavedVaults = TryCatch(
  async (
    req: Request<{}, {}, {}, GetVaultsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, user } = req;
    let { userType, page = 1, limit = process.env.LIMIT } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;

    let savedVaults = await SavedItems.find({
      userId,
      itemType: postType.VAULT,
    });

    savedVaults = savedVaults.map((item: any) => item?.vault);

    console.log("savedVaults::::", savedVaults);
    const query: any = {
      $or: [{ members: userId }, { _id: { $in: savedVaults } }],
      isDeleted: false,
    };

    const total = await Vault.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          let: { adminId: "$admin" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$adminId"],
                },
                role: userType,
              },
            },
          ],
          as: "admin",
        },
      },
      {
        $unwind: {
          path: "$admin",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $count: "count",
      },
    ]);

    const vaults = await Vault.aggregate([
      {
        $match: query,
      },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "vaultId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { adminId: "$admin" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$adminId"],
                },
                role: userType,
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                username: 1,
                profileImage: 1,
              },
            },
          ],
          as: "admin",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { members: "$members" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$members"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                profileImage: 1,
              },
            },
            {
              $limit: 4,
            },
          ],
          as: "members",
        },
      },
      {
        $unwind: {
          path: "$admin",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "reports",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$vaultId", "$$id"] },
                reporterUserId: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                reason: 1,
                _id: 1,
              },
            },
          ],
          as: "isReported",
        },
      },
      {
        $lookup: {
          from: "ratings",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$vaultId", "$$id"] },
                type: postType.VAULT,
                senderId: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                ratings: 1,
                _id: 1,
              },
            },
          ],
          as: "ratings",
        },
      },
      {
        $unwind: {
          path: "$ratings",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          ratings: "$ratings.ratings",
        },
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" },
          isReported: { $gt: [{ $size: "$isReported" }, 0] },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          __v: 0,
          updatedAt: 0,
          category: 0,
          access: 0,
          isDeleted: 0,
          comments: 0,
        },
      },
    ]);

    return SUCCESS(res, 200, "Vaults fetched successfully", {
      data: {
        vaults,
      },
      pagination: {
        total: total[0]?.count || 0,
        page: Number(page),
        limit: Number(limit),
      },
    });
  }
);

const deleteVault = TryCatch(
  async (req: Request<VaultIdRequest>, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { vaultId } = req.params;

    const vault = await getVaultById(vaultId);

    if (vault.admin.toString() !== userId)
      return next(
        new ErrorHandler("You are not authorized to delete this vault", 403)
      );

    vault.isDeleted = true;
    await vault.save();
    return SUCCESS(res, 200, "Vault deleted successfully");
  }
);

export default {
  createVault,
  getVaults,
  addRemoveMembersByAdmin,
  getVaultDetailById,
  joinLeaveVault,
  // addComment,
  // getAllComments,
  getSavedVaults,
  saveUnsaveVault,
  deleteVault,
};
