export type LoginUserRequest = {
  email: string;
  password: string;
};

export type GetAllUsersRequest = {
  page: number;
  limit: number;
};

export type PaginationRequest = {
  page: number;
  limit: number;
};

export type UpdateUserStatusRequest = {
  isDeleted: boolean;
  isDeactivated: boolean;
};

export type IdRequest = {
  id: any;
};

export type UpdateAdStatusRequest = {
  status: string;
};
