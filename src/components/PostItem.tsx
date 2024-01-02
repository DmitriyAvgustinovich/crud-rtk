import React from "react";
import { IPost } from "../models/IPost";

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

export const PostItem: React.FC<PostItemProps> = ({ post, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post);
  };

  const handleUpdate = () => {
    const title = prompt() || "";
    update({ ...post, title } as IPost);
  };

  return (
    <div onClick={handleUpdate}>
      <span>{post.id}</span>. {post.title}
      <button onClick={handleRemove}>Delete</button>
    </div>
  );
};
