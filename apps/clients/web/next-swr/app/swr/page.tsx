"use client";
import { usePostsList, useUpdatePost, useUsersList } from "@/swr/hooks";
import { defaultFetcher } from "@/utils/fetch.service";
import { SWRConfig } from "swr";

const Posts = () => {
  const { posts, isLoading, error } = usePostsList();
  const { post, updatePost, isMutating } = useUpdatePost("1");

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error!</h3>;

  return (
    <div className='flex flex-col justify-center items-center gap-5 p-5 overflow-y-hidden'>
      <span>{posts ? JSON.stringify(posts.slice(0, 3)) : "..."}</span>
      <button
        className='border border-indigo-500 rounded-xl p-3'
        onClick={() => updatePost({ payload: { title: "new name" } })}
      >
        {isMutating ? "Updating..." : "Update Post"}
      </button>
    </div>
  );
};

const Users = () => {
  const { users, isLoading, error } = useUsersList();

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error!</h3>;

  return (
    <div className='flex flex-col justify-center items-center gap-5 p-5 overflow-y-hidden'>
      <span>{users ? JSON.stringify(users.slice(0, 3)) : "..."}</span>
    </div>
  );
};

// const PostFilterByUserId = () => {
//   const {
//     data: posts,
//     error,
//     isLoading,
//   } = useSWR(["/posts", "?userId=2"], ([path, searchParams]) => fetchPosts(searchParams));

//   if (isLoading) return <h3>Loading...</h3>;
//   if (error) return <h3>Error!</h3>;

//   return (
//     <div className='flex flex-col justify-center items-center gap-5 p-5 overflow-y-hidden'>
//       <span>{posts ? JSON.stringify(posts.slice(0, 3)) : "..."}</span>
//     </div>
//   );
// };

export default function page() {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: defaultFetcher,
          revalidateOnFocus: true,
          focusThrottleInterval: 0,
          dedupingInterval: 0 // Thử đặt bằng 0 để test (xem giải thích mục 3)
        }}
      >
        <div className='border border-cyan-500 rounded-xl m-5'>
          <Posts />
        </div>
        <div className='border border-cyan-500 rounded-xl m-5'>
          <Users />
        </div>
        {/* <div className='border border-cyan-500 rounded-xl m-5'> */}
        {/* <Suspense fallback={<h3>Loading with suspense...</h3>}> */}
        {/* <PostFilterByUserId /> */}
        {/* </Suspense> */}
        {/* </div> */}
      </SWRConfig>
    </>
  );
}

