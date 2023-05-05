import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { ITemplate } from "../types/template";

//const serverApi = process.env.REACT_APP_SERVER_API;
const serverApi = "https://exove.vercel.app/api/";
//const serverUrl = "http://localhost:4000/";

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverApi,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Templates"],
  endpoints: (builder) => ({
    getAllTemplates: builder.query<ITemplate[], void>({
      query: () => `template/`,
      providesTags: ["Templates"],
    }),
    getTemplateById: builder.query<ITemplate, string>({
      query: (id) => `template/${id}`,
    }),
    getActiveTemplate: builder.query<ITemplate, void>({
      query: () => `template/active`,
    }),
  }),
});

export const {
  useGetAllTemplatesQuery,
  useGetTemplateByIdQuery,
  useGetActiveTemplateQuery,
} = templateApi;

export default templateApi.reducer;
