export type CreatePostRequest = {
  title: string;
  symbol: string;
  topic: string;
  description: string;
  type: string;
  scheduleDate: string;
};

export type GetPostsRequest = {
  type: string;
  userType: string;
  sort: number;
  page: number;
  limit: number;
  distance: boolean;
  rating: number;
  byFollowers: boolean;
  byBoom: boolean;
  bySave: boolean;
};

export type AddCommentsRequest = {
  postId: string;
  comment: string;
};

export type PostIdRequest = {
  postId: string;
};
