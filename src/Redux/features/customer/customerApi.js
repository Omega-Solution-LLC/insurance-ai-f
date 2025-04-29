import toast from "react-hot-toast";
import queryGenerator from "../../../utils/queryGenerator";
import { apiSlice } from "../apiSlice/apiSlice";

// Helper function to render user name
const nameRender = (data) => {
  return data.firstName && data.lastName
    ? `${data.firstName} ${data.lastName}`
    : data.email || "User";
};

export const customersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: (id) => ({
        url: `customer/${id}`,
      }),
      providesTags: ["Customers"],
    }),
    getCustomers: builder.query({
      query: (id) => ({
        url: `customer?query=all`,
      }),
      providesTags: ["CustomersAll"],
    }),
    getCustomersPaginated: builder.query({
      query: (arg) => {
        const query = queryGenerator(arg, false);
        return {
          url: `customer?${query}`,
        };
      },
      providesTags: ["Customers"],
    }),

    addCustomer: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json;charset=UTF-8",
        },
        url: `customer`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;

          toast.success("Customer added successfully");
        } catch (err) {
          toast.error(
            err?.error?.data?.error || "Something went wrong, Please try again"
          );
        }
      },
      invalidatesTags: ["Customers", "CustomersAll", "Lead"],
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `customer/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(`Customer deleted Successfully`);
        } catch (err) {
          toast.error("Something went wrong, Please try again");
        }
      },
      invalidatesTags: ["Customers", "CustomersAll", "Customer"],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomerQuery,
  useGetCustomersQuery,
  useGetCustomersPaginatedQuery,
} = customersApi;
