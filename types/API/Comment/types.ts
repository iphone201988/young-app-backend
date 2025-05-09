export type AddCommentRequest = {
  id: string;
  comment: string;
  type: number;
};

export type GetCommentsRequest = {
  id: string;
  type: number;
};
