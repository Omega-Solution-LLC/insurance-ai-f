import { toastHandler } from "../../../utils/functions";
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
          toastHandler("LogOut Successfully Done", "success");
        } catch (err) {
          toastHandler("Logout failed", "error");
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
          localStorage.setItem("access-token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("user", nameRender(data));
          localStorage.setItem("id", data.id);
          localStorage.setItem("isLogged", true);
          localStorage.setItem("role", data.role?.name);
          toastHandler("Registration successful!", "success");
        } catch (err) {
          toastHandler("Registration failed. Please try again.", "warning");
        }
      },
      invalidatesTags: ["Logins", "LoginsAll", "Lead"],
    }),
  }),
});

export const { useAddRegisterMutation, useLogoutMutation } = registerApi;
