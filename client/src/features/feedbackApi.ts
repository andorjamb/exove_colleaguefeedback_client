import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IFeedback } from "../types/feedback";

//const serverApi = process.env.REACT_APP_SERVER_API;
const serverApi = "https://exove.vercel.app/api/";
//const serverApi = "http://localhost:4000/"

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverApi,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Feedbacks"],
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query<IFeedback[], void>({
      query: () => "feedback",
      providesTags: ["Feedbacks"],
    }),
    getFeedbackByDocId: builder.query<IFeedback, string>({
      query: (docId) => `feedback/${docId}`,
    }),
    getFeedbackByName: builder.query<IFeedback, string>({
      query: (name) => `feedback/name/${name}`, //ldapUid ??
    }),
    getUserTotalFeedbacks: builder.query<IFeedback[], string>({
      query: (name) => `feed/${name}`, //returns { ...userFeedback, feedbacksCount, requestPicksCount }
    }),
    postFeedback: builder.mutation<void, { body: IFeedback; id: string }>({
      query: ({ id, body }) => ({
        url: `feedback/${id}`, //requestPick id
        method: "POST",
        body,
      }),
      invalidatesTags: ["Feedbacks"],
    }),
    deleteFeedback: builder.mutation<void, string>({
      query: (id) => ({
        url: `feedback/${id}`,
        method: "DELETE",
      }),
    }),
    submitFeedback: builder.mutation<void, { body: IFeedback; id: string }>({
      query: ({ id, body }) => ({
        url: `/feeback/submit/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});
/* 
Type '(id: string, body: IFeedback) => { url: string; method: string; body: IFeedback; }' is not assignable to type '(arg: { id: string; body: IFeedback; }) => string | FetchArgs'.ts(2322) */

export const {
  useGetAllFeedbacksQuery,
  useGetFeedbackByDocIdQuery,
  useGetFeedbackByNameQuery,
  useGetUserTotalFeedbacksQuery,
  usePostFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;

export default feedbackApi.reducer;
