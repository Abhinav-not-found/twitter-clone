import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleLikeIncrease } from "./handleLikeIncrease.service";
import { handleLikeDecrease } from "./handleLikeDecrease.service";

export const useLikeMutations = (postId, userId) => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => handleLikeIncrease(postId, userId),
    onMutate: async () => {
      await queryClient.cancelQueries(["getAllPosts"]);
      const previousPosts = queryClient.getQueryData(["getAllPosts"]);

      queryClient.setQueryData(["getAllPosts"], (old) =>
        old.map((post) =>
          post._id === postId
            ? { ...post, likes: [...post.likes, userId] }
            : post
        )
      );

      return { previousPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["getAllPosts"], context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["getAllPosts"]);
    },
  });

  const likeDecreaseMutation = useMutation({
    mutationFn: () => handleLikeDecrease(postId, userId),
    onMutate: async () => {
      await queryClient.cancelQueries(["getAllPosts"]);
      const previousPosts = queryClient.getQueryData(["getAllPosts"]);

      queryClient.setQueryData(["getAllPosts"], (old) =>
        old.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.filter((id) => id !== userId),
              }
            : post
        )
      );

      return { previousPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["getAllPosts"], context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["getAllPosts"]);
    },
  });

  return { likeMutation, likeDecreaseMutation };
};
