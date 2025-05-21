export type GiveRatingsRequest = {
  ratings: number;
  type: string;
  id: string;
};

export type GetRatingsRequest = {
  type: string;
  id: string;
};
