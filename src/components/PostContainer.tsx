import React from "react";
import { postAPI } from "../services/PostService";
import { PostItem } from "./PostItem";
import { IPost } from "../models/IPost";

export const PostContainer = () => {
  const [limit, setLimit] = React.useState(100);
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit);

  const [createPost, { error: createError, isLoading: isCreateLoading }] =
    postAPI.useCreatePostMutation();

  const [updatePost, { error: updateError, isLoading: isUpdateLoading }] =
    postAPI.useUpdatePostMutation();

  const [deletePost, { error: deleteError, isLoading: isDeleteLoading }] =
    postAPI.useDeletePostMutation();

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };

  const handleRemove = async (post: IPost) => {
    await deletePost(post);
  };

  const handleUpdate = async (post: IPost) => {
    await updatePost(post);
  };

  return (
    <>
      <button onClick={handleCreate}>Добавить пост</button>
      <button onClick={() => refetch()}>refetch</button>

      {isLoading && <h1>Loading...</h1>}
      {error && <h1>ошибка при загрузке</h1>}

      {posts &&
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            remove={handleRemove}
            update={handleUpdate}
          />
        ))}
    </>
  );
};
