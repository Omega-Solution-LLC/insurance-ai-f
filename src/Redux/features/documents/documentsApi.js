import { toastHandler } from "../../../utils/functions";
import queryGenerator from "../../../utils/queryGenerator";
import { apiSlice } from "../apiSlice/apiSlice";

// Helper function to render user name
const nameRender = (data) => {
  return data.firstName && data.lastName
    ? `${data.firstName} ${data.lastName}`
    : data.email || "User";
};

export const documentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocument: builder.query({
      query: ({ id, arg }) => {
        const query = queryGenerator(arg, false);
        return {
          url: `insurance/customer/${id}?${query}`,
        };
      },
      providesTags: ["Documents"],
    }),
    getDocumentInsurance: builder.query({
      query: (id) => ({
        url: `insurance/${id}`,
      }),
      providesTags: ["Insurance"],
    }),
    getDocuments: builder.query({
      query: (id) => ({
        url: `insurance?query=all`,
      }),
      providesTags: ["DocumentsAll"],
    }),
    getDocumentsPaginated: builder.query({
      query: (arg) => {
        const query = queryGenerator(arg, false);
        return {
          url: `insurance?${query}`,
        };
      },
      providesTags: ["Documents"],
    }),

    addDocument: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json;charset=UTF-8",
        },
        url: `insurance`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;

          toastHandler("Document added successfully", "success");
        } catch (err) {
          toastHandler(
            err?.error?.data?.error || "Something went wrong, Please try again",
            "warning"
          );
        }
      },
      invalidatesTags: ["Documents", "DocumentsAll", "Insurance"],
    }),

    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `insurance/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toastHandler(`Document deleted Successfully`, "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Documents", "DocumentsAll", "Document", "Insurance"],
    }),

    updateDocumentInsurance: builder.mutation({
      query: ({ id, data }) => ({
        url: `insurance/${id}`,
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toastHandler("Template updated successfully", "success");
        } catch (err) {
          toastHandler(
            err?.error?.data?.error || "Something went wrong, Please try again",
            "warning"
          );
        }
      },
      invalidatesTags: ["Documents", "DocumentsAll", "Insurance"],
    }),
    updateInsurance: builder.mutation({
      query: ({ id, customerId }) => ({
        url: `insurance/${id}`,
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: { customerId },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toastHandler("Template updated successfully", "success");
        } catch (err) {
          toastHandler(
            err?.error?.data?.error || "Something went wrong, Please try again",
            "warning"
          );
        }
      },
      invalidatesTags: ["Documents", "DocumentsAll", "Insurance"],
    }),
  }),
});

export const {
  useAddDocumentMutation,
  useDeleteDocumentMutation,
  useGetDocumentQuery,
  useGetDocumentsQuery,
  useGetDocumentsPaginatedQuery,
  useGetDocumentInsuranceQuery,
  useUpdateDocumentInsuranceMutation,
  useUpdateInsuranceMutation,
} = documentsApi;
