export type SubmitAdRequest = {
  name: string;
  company: string;
  email: string;
  website: string;
};

export type GetAdsRequest = {
  page: number;
  limit: number;
};
