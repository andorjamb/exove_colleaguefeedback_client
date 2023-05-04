import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IRequestPicks } from "../types/picks";

const serverApi = process.env.REACT_APP_SERVER_API;
const devServerApi = "http://localhost:4000/";

export const requestPicksApi = createApi({
  reducerPath: "requestPicksApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverApi }),
  tagTypes: ["RequestPicks"],
  endpoints: (builder) => ({
    getAllRequestPicks: builder.query<IRequestPicks[], void>({
      query: () => "picks",
    }),
    getRequestPickByUserId: builder.query<IRequestPicks, string>({
      query: (userId) => `picks/${userId}`,
    }),
  }),
});

export const { useGetAllRequestPicksQuery, useGetRequestPickByUserIdQuery } =
  requestPicksApi;

export default requestPicksApi.reducer;
