import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { ITemplate } from "../types/template";

const serverApi = process.env.REACT_APP_SERVER_API;
const devServerUrl = "http://localhost:4000/";

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://exove.vercel.app/api/" }),
  tagTypes: ["Templates"],
  endpoints: (builder) => ({
    getAllTemplates: builder.query<ITemplate[], void>({
      query: () => `template/`,
    }),
    getTemplateById: builder.query<ITemplate, string>({
      query: (id) => `template/${id}`,
    }),
  }),
});

export const { useGetAllTemplatesQuery, useGetTemplateByIdQuery } = templateApi;

export default templateApi.reducer;
