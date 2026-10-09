export const getPostsList = async (): Promise<Post[]> =>
  fetch(`${import.meta.env.VITE_API_URL}/posts`).then((response) => response.json());

export const createPost = async (newPost: Post): Promise<Post> =>
  fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
