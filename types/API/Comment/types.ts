export type AddCommentRequest = {
  id: string;
  comment: string;
  type: string;
};

export type GetCommentsRequest = {
  id: string;
  type: string;
  page: number;
  limit: number;
};
