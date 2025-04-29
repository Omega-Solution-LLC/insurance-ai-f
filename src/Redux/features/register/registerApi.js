import toast from "react-hot-toast";
import { apiSlice } from "../apiSlice/apiSlice";

// Helper function to render user name
const nameRender = (data) => {
  return data.firstName && data.lastName
    ? `${data.firstName} ${data.lastName}`
    : data.email || "User";
};

export const registerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/logout`,
        body: { id: Number(localStorage.getItem("id")) },
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.clear();
          window.location.href = "/supervision-panel-7834";
          toast.success("LogOut Successfully Done");
        } catch (err) {
          toast.error("Logout failed");
        }
      },
      invalidatesTags: ["Logins"],
    }),

    addRegister: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `customer/register`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          const { data } = await queryFulfilled;

          toast.success("Registration successful!");
        } catch (err) {
          toast.error(
            err?.error?.data?.error || "Something went wrong, Please try again"
          );
        }
      },
      invalidatesTags: ["Logins", "LoginsAll", "Lead"],
    }),
  }),
});

export const { useAddRegisterMutation, useLogoutMutation } = registerApi;
