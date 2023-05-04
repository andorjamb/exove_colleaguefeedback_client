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
    getFeedbackById: builder.query<IFeedback, string>({
      query: (id) => `feedback/${id}`,
    }),
  }),
});

export const { useGetAllFeedbacksQuery, useGetFeedbackByIdQuery } = feedbackApi;

export default feedbackApi.reducer;
