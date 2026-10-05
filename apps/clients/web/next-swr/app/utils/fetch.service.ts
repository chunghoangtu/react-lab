const BASE_URL = "https://jsonplaceholder.typicode.com";

type FetchOptions =
  | string
  | [
      method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
      apiPath: string,
      searchParams?: string,
      payload?: object,
    ]
  | {
      method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
      apiPath: string;
      searchParams?: string;
      payload?: object;
    };

export const defaultFetcher = async (fetchOptions: FetchOptions) => {
  if (!fetchOptions) throw new Error("Invalid fetch options!");

  if (typeof fetchOptions === "string") {
    return await fetch(`${BASE_URL}${fetchOptions}`).then((res) => res.json());
  }

  const fetchOptionsValues = Array.isArray(fetchOptions)
    ? [...fetchOptions]
    : Object.values(fetchOptions);

  const [method, apiPath, searchParams, payload] = fetchOptionsValues;
  return await fetch(`${BASE_URL}${apiPath}${searchParams}`, {
    method: method as string,
    body: payload ? JSON.stringify(payload) : "",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
};

export const patchService = async (url: string, { payload }: { payload: any }) => {
  return await fetch(`${BASE_URL}${url}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
};
