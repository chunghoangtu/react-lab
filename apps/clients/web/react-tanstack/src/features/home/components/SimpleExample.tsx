import { createPost, getPostsList } from "@/utils";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const usePosts = () => {
  const queryClient = useQueryClient();

  const [isEnableLoadData, setIsEnableLoadData] = useState(true);

  const {
    data: posts,
    isLoading,
    isError,
    refetch: reloadPosts,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsList,
    enabled: isEnableLoadData,
    staleTime: 0, // highest priority
    gcTime: 3000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    // refetchInterval: 2000
  });

  const {
    mutate: create,
    isPending: isCreating,
    isError: isCreateError,
    data: newCreatedPost,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      alert(JSON.stringify(data));
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onMutate: () => {},
  });

  return {
    posts,
    isLoadingPosts: isLoading || isRefetching,
    isError,
    setIsEnableLoadData,
    reloadPosts,
    create,
    isCreating,
    isCreateError,
    newCreatedPost,
  };
};

const usePostsWithOptimistic = () => {
  const queryClient = useQueryClient();

  const [isEnableLoadData, setIsEnableLoadData] = useState(true);

  const {
    data: posts,
    isLoading,
    isError,
    refetch: reloadPosts,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsList,
    enabled: isEnableLoadData,
    staleTime: 0, // highest priority
    gcTime: 3000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    // refetchInterval: 2000,
    placeholderData: keepPreviousData
  });

  const {
    mutate: create,
    isPending: isCreating,
    isError: isCreateError,
    data: newCreatedPost,
  } = useMutation({
    mutationFn: createPost,
    onMutate: async (updatedPost: Post) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (oldPosts: Post[]) => {
        return oldPosts.map((post) => {
          return post.id === updatedPost.id ? { ...post, ...updatedPost } : post;
        });
      });

      return { previousPosts };
    },
    onSuccess: (data) => {
      console.log(JSON.stringify(data));
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err, updatedPost, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
    },
  });

  return {
    posts,
    isLoadingPosts: isLoading,
    isError,
    setIsEnableLoadData,
    reloadPosts,
    create,
    isCreating,
    isCreateError,
    newCreatedPost,
  };
};

export default function SimpleExample() {
  const { posts, isLoadingPosts, isError, setIsEnableLoadData, reloadPosts, create, isCreating } =
    usePostsWithOptimistic();

  return (
    <div className='p-3'>
      <div className='flex gap-3'>
        {!posts ? (
          <button onClick={() => setIsEnableLoadData(true)}>Load data</button>
        ) : (
          <button onClick={() => reloadPosts()}>Refetch data</button>
        )}
        <button onClick={() => create({ id: 1, title: "test", userId: 1, body: "test post" })}>
          {isCreating ? "Creating new post..." : "Create New Post"}
        </button>
      </div>
      {isLoadingPosts && <div>Loading...</div>}
      {isError && <div>Error!</div>}
      {posts && (
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
