import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { ITemplateGet } from "../types/template";

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
    getAllTemplates: builder.query<ITemplateGet[], void>({
      query: () => `template/`,
      providesTags: ["Templates"],
    }),
    getTemplateById: builder.query<ITemplateGet, string>({
      query: (id) => `template/${id}`,
    }),
    getActiveTemplate: builder.query<ITemplateGet, void>({
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
