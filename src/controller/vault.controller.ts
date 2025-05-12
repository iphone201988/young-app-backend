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
    const { user } = req;
    const { userType = "all", page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const query: any = { access: vaultAccess.PUBLIC };
    if (userType !== "all") {
      query.category = { $in: [userType] };
    }

    const count = await Vault.countDocuments(query);
    // const vaults = await Vault.find(query)
    //   .populate("admin", "firstName lastName username profileImage")
    //   .select("-members -__v -updatedAt -category -access -isDeleted")
    //   .skip(skip)
    //   .limit(limit);

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
        $addFields: {
          commentsCount: { $size: "$comments" },
          isSaved: {
            $cond: {
              if: { $in: ["$_id", user.savedVaults] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          members: 0,
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
        total: count,
        page: page,
        limit: limit,
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

    await getVaultById(vaultId);

    const isSaved = user.savedVaults.includes(vaultId);
    if (isSaved) {
      await User.findByIdAndUpdate(userId, {
        $pull: { savedVaults: vaultId },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { savedVaults: vaultId },
      });
    }

    return SUCCESS(
      res,
      200,
      `Vault ${isSaved ? "unsaved" : "saved"} successfully`
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
      `${isAlreadyMember ? "Left" : "Joined"} vault successfully`
    );
  }
);

const addComment = TryCatch(
  async (
    req: Request<{}, {}, AddCommentRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { vaultId, comment } = req.body;

    const vault = await getVaultById(vaultId);

    const isMember = vault.members.includes(userId);

    if (!isMember)
      return next(new ErrorHandler("You are not a member of this vault", 403));

    await Comments.create({ userId, vaultId, comment, type: postType.VAULT });

    return SUCCESS(res, 200, `Comment added successfully`);
  }
);

const getAllComments = TryCatch(
  async (req: Request<VaultIdRequest>, res: Response, next: NextFunction) => {
    const { vaultId } = req.params;

    const vault = await getVaultById(vaultId);

    const comments = await Comments.find({ vaultId: vault._id })
      .populate("userId", "_id firstName lastName profileImage")
      .select("-updatedAt -__v")
      .sort({ createdAt: -1 });

    return SUCCESS(res, 200, "Comments fetched successfully", {
      data: { comments },
    });
  }
);

const getSavedVaults = TryCatch(
  async (
    req: Request<{}, {}, {}, GetVaultsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, user } = req;
    const { userType = "all", page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const query: any = {
      $or: [{ members: userId }, { _id: { $in: user.savedVaults } }],
    };

    if (userType !== "all") {
      query.category = { $in: [userType] };
    }

    const count = await Vault.countDocuments(query);

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
          $addFields: {
            commentsCount: { $size: "$comments" },
          },
        },
        {
          $project: {
            members: 0,
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
        total: count,
        page: page,
        limit: limit,
      },
    });
  }
);

export default {
  createVault,
  getVaults,
  addRemoveMembersByAdmin,
  getVaultDetailById,
  joinLeaveVault,
  addComment,
  getAllComments,
  getSavedVaults,
  saveUnsaveVault,
};
