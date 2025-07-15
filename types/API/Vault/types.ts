export type CreateVaultRequest = {
  title: string;
  topic: string;
  description: string;
  access: string;
  members: string;
  category: string;
};

export type GetVaultsRequest = {
  userType?: string;
  page?: number;
  limit?: number;
  sort: boolean;
  distance: boolean;
  rating: number;
  byFollowers: boolean;
  byBoom: boolean;
  bySave: boolean;
};

export type VaultIdRequest = {
  vaultId: string;
};

export type AddRemoveMembersRequest = {
  memberId: string;
};

export type AddCommentRequest = {
  vaultId: string;
  comment: string;
};
