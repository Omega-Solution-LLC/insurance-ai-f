import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    try {
      const refreshResult = await baseQuery(
        `/user/refresh-token`,
        api,
        extraOptions
      );
      if (refreshResult.data) {
        localStorage.setItem("access-token", refreshResult.data.token);

        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.clear();
        window.location.replace("/");
        return undefined;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      localStorage.clear();
      window.location.replace("/");
      return undefined;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "User",

    "Logins",
    "LoginsAll",
    "Login",
    "Documents",
    "DocumentsAll",
    "Document",

    "Customers",
    "CustomersAll",
    "Customer",
    "Insurance",
  ],
  endpoints: () => ({
    // Define your endpoints here
  }),
});
