import { VaultModel } from "../../types/Database/types";
import Vault from "../model/vault.model";
import ErrorHandler from "../utils/ErrorHandler";

export const getVaultById = async (vaultId: string): Promise<VaultModel> => {
  const vault = await Vault.findOne({ _id: vaultId, isDeleted: false });
  if (!vault) throw new ErrorHandler("Vault not found", 400);

  return vault;
};
