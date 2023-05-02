import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { ITemplate } from "../types/template";

const serverUrl = process.env.REACT_APP_SERVER_API;
const devServerUrl = "http://localhost:4000/";

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["Templates"],
  endpoints: (builder) => ({
    /** for fetching all templates */
    getAllTemplates: builder.query<ITemplate[], void>({
      query: () => `templates/`,
    }),
    /** for fetching active template */
    getOneTemplate: builder.query<ITemplate, string>({
      query: (id) => `template/${id}`,
    }),
  }),
});

export const { useGetAllTemplatesQuery } = templateApi;

export default templateApi.reducer;
