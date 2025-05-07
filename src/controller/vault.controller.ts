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
    const { role = "all", page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const query: any = { access: vaultAccess.PUBLIC };
    if (role !== "all") {
      query.category = { $in: [role] };
    }

    const count = await Vault.countDocuments(query);
    const vaults = await Vault.find({ access: vaultAccess.PUBLIC })
      .populate("admin", "firstName lastName username profileImage")
      .select("-members -__v -updatedAt -category -access")
      .skip(skip)
      .limit(limit);

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

export default {
  createVault,
  getVaults,
  addRemoveMembersByAdmin,
  getVaultDetailById,
  joinLeaveVault,
  addComment,
};
