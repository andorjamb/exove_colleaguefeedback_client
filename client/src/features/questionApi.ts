import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IQuestion } from "../types/questions";


//const serverApi = process.env.REACT_APP_SERVER_API;
const serverApi = "https://exove.vercel.app/api/";
//const serverApi = "http://localhost:4000/";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverApi,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Questions"],
  endpoints: (builder) => ({
    getAllQuestions: builder.query<IQuestion[], void>({
      query: () => "question",
      providesTags: ["Questions"],
    }),
    getQuestionId: builder.query<IQuestion, string>({
      query: (userId) => `question/${userId}`,
    }),
  }),
});

export const { useGetAllQuestionsQuery } = questionApi;

export default questionApi.reducer;
