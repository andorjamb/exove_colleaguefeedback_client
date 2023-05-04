import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IFeedback } from "../types/feedback";

const serverApi = process.env.REACT_APP_SERVER_API;
const devServerUrl = "http://localhost:4000/";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://exove.vercel.app/api/" }),
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query<IFeedback[], void>({
      query: () => "feedback",
    }),
    getFeedbackById: builder.query<IFeedback, string>({
      query: (id) => `feedback/${id}`,
    }),
  }),
});

export const { useGetAllFeedbacksQuery, useGetFeedbackByIdQuery } = feedbackApi;

export default feedbackApi.reducer;
