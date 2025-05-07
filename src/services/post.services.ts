import { PostModel } from "../../types/Database/types";
import Post from "../model/post.model";
import ErrorHandler from "../utils/ErrorHandler";

export const getPostById = async (postId: string): Promise<PostModel> => {
  const post = await Post.findOne({ _id: postId, isDeleted: false });
  if (!post) throw new ErrorHandler("Post not found", 400);

  return post;
};
