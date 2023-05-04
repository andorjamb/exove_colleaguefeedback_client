import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IRequestPicks } from "../types/picks";

const serverUrl = process.env.REACT_APP_SERVER_API;
const devServerUrl = "http://localhost:4000/";

export const requestPicksApi = createApi({
  reducerPath: "requestPicksApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["RequestPicks"],
  endpoints: (builder) => ({
    /** for fetching all templates */
    getAllTemplates: builder.query<IRequestPicks[], void>({
      query: () => "picks",
    }),
    /** for fetching active template */
    getOneTemplate: builder.query<IRequestPicks, string>({
      query: (id) => `picks/${id}`,
    }),
  }),
});

export const { useGetAllTemplatesQuery } = requestPicksApi;

export default requestPicksApi.reducer;
