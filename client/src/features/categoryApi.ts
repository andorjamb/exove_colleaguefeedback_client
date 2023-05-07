import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IQuestionTextGet, ICategoryGet, IQCategory } from "../types/template";

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

interface ICategoryBody {
  categoryName: string;
  description: string;
  questions: string[]; //array of question ids
}
//const serverApi = process.env.REACT_APP_SERVER_API;
const serverApi = "https://exove.vercel.app/api/";

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
    getAllCategories: builder.query<IQCategory[], void>({
      query: () => "category",
      providesTags: ["Categories"],
    }),
    /*  getCategoryById: builder.query<ICategoryGet, string>({
      query: (id) => `question/${id}`,
    }), */ //no server endpoint
    addCategory: builder.mutation<void, ICategoryBody>({
      query: (body) => ({
        url: `category`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery, useAddCategoryMutation } = categoryApi;

export default categoryApi.reducer;
