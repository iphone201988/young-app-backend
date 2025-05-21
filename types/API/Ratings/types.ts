export type GiveRatingsRequest = {
  ratings: number;
  receiverId: string;
  type: string;
  postId?: string;
  vaultId?: string;
};
