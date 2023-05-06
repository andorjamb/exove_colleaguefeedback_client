import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IQuestionTextGet, ICategoryGet } from "../types/template";

/* enum QuestionType {
  range = "Number",
  open = "String",
  truefalse = "Boolean",
}

export interface IQuestionTextGet {
  _id: string;
  lang: string;
  question: string;
}

export interface IQuesionGet {
  _id: string;
  category: string;
  createdBy: string;
  createdOn: string;
  active: boolean;
  type: QuestionType;
  question: IQuestionTextGet[];
}

export interface ICategoryGet {
  _id: string;
  category: string;
  questions: IQuesionGet[];
} */

//const serverApi = process.env.REACT_APP_SERVER_API;
const serverApi = "https://exove.vercel.app/api/";
//const serverApi = "http://localhost:4000/";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverApi,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategoryGet[], void>({
      query: () => "category",
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query<ICategoryGet, string>({
      query: (id) => `question/${id}`,
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;

export default categoryApi.reducer;
