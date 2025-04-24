import { toastHandler } from "../../../utils/functions";
import queryGenerator from "../../../utils/queryGenerator";
import { apiSlice } from "../apiSlice/apiSlice";

// Helper function to render user name
const nameRender = (data) => {
  return data.firstName && data.lastName
    ? `${data.firstName} ${data.lastName}`
    : data.email || "User";
};

export const loginApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogin: builder.query({
      query: (id) => ({
        url: `customer/login/${id}`,
      }),
      providesTags: ["Login"],
    }),
    getLogins: builder.query({
      query: (id) => ({
        url: `customer/login?query=all`,
      }),
      providesTags: ["LoginAll"],
    }),
    getLoginsPaginated: builder.query({
      query: (arg) => {
        const query = queryGenerator(arg, false);
        return {
          url: `customer/login?${query}`,
        };
      },
      providesTags: ["Logins"],
    }),

    addLogin: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `customer/login`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          const { data } = await queryFulfilled;
          localStorage.setItem("access-token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("user", nameRender(data));
          localStorage.setItem("id", data.id);
          localStorage.setItem("roleId", data.roleId);
          localStorage.setItem("isLogged", true);
          localStorage.setItem("role", data.role?.name);
          toastHandler("Login added successfully", "success");
        } catch (err) {
          toastHandler(
            err?.error?.data?.error || "Something went wrong, Please try again",
            "warning"
          );
        }
      },
      invalidatesTags: ["Logins", "LoginsAll", "Lead"],
    }),

    deleteLogin: builder.mutation({
      query: (id) => ({
        url: `customer/login/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toastHandler(`Login deleted Successfully`, "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Logins", "LoginsAll", "Login", "Lead"],
    }),
  }),
});

export const {
  useAddLoginMutation,
  useDeleteLoginMutation,
  useGetLoginQuery,
  useGetLoginsQuery,
  useGetLoginsPaginatedQuery,
} = loginApi;
