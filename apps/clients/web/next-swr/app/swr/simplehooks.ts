// import { fetchPostById, fetchPosts, updatePostById } from "@/utils/fetch.service";
// import useSWR from "swr";

// export const useFetchPosts = (isSuspense = false) => {
//   const { data, error, isLoading } = useSWR(`/api/posts`, fetchPosts, {
//     suspense: isSuspense,
//     fallbackData: [],
//   });

//   return { postData: data, error, isLoading };
// };

// export const useFetchPost1 = (isSuspense = false) => {
//   const postId = 1;
//   const { data, error, isLoading } = useSWR(`/api/posts/${postId}`, fetchPostById, {
//     suspense: isSuspense,
//     fallbackData: {},
//   });

//   return { postData: data, error, isLoading };
// };

// export const useUpdatePost1 = (isSuspense = false) => {
//   const postId = 1;
//   const { data, mutate, error, isLoading } = useSWR(`/api/posts/${postId}`, updatePostById, {
//     suspense: isSuspense,
//     fallbackData: {},
//   });

//   return { postData: data, error, isUpdating: isLoading, updatePost: mutate };
// };
