import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IRequestPicks } from "../types/picks";
import { IRequestPicksPost } from "../types_updated/picks";

//const serverApi = process.env.REACT_APP_SERVER_API;
const serverApi = "https://exove.vercel.app/api/";
//const serverApi = "http://localhost:4000/";

export const requestPicksApi = createApi({
  reducerPath: "requestPicksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverApi,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }), //for testing
  tagTypes: ["RequestPicks"],
  endpoints: (builder) => ({
    getAllRequestPicks: builder.query<IRequestPicks[], void>({
      query: () => "picks",
      providesTags: ["RequestPicks"],
    }),
    getRequestPickByUserId: builder.query<IRequestPicks, string>({
      query: (userId) => `picks/${userId}`,
    }),
    createPick: builder.mutation<void, IRequestPicksPost>({
      query: (picks) => ({
        url: "picks",
        method: "POST",
        body: picks,
      }),
    }),
    updatePick: builder.mutation<void, IRequestPicksPost>({
      query: (picks) => ({
        url: "picks",
        method: "PATCH",
        body: picks,
      }),
    }),
  }),
});

export const {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
  useCreatePickMutation,
  useUpdatePickMutation,
} = requestPicksApi;

export default requestPicksApi.reducer;
