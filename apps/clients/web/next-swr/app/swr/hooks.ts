import { patchService } from "@/utils/fetch.service";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const usePostsList = () => {
  const { data: posts, isLoading, error, isValidating } = useSWR("/posts");

  useEffect(() => {
  if (isValidating) {
    console.log("SWR đang revalidate dữ liệu ngầm...");
  } else {
    console.log("SWR đã revalidate xong (hoặc không chạy).");
  }
}, [isValidating]);

  return { posts, isLoading, error };
};

export const useUsersList = () => {
  const { data: users, isLoading, error } = useSWR("/users");

  return { users, isLoading, error };
};

export const useUpdatePost = (postId: string) => {
  const {
    data: post,
    trigger: updatePost,
    isMutating,
    error,
  } = useSWRMutation<any, any, string, any>(`/posts/${postId}`, (url, { arg }) =>
    patchService(url, { payload: arg })
  );

  return { post, updatePost, isMutating, error };
};
