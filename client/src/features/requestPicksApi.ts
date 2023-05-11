import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IRequestPicks } from "../types/picks";
import { IRequestPicksPost } from "../types/picks";

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
    getRequestPickByDocId: builder.query<IRequestPicks, string>({
      query: (id) => `pick-id/${id}`,
    }),
    createPick: builder.mutation<void, IRequestPicksPost>({
      query: (body) => ({
        url: "picks/createreqpick",
        method: "POST",
        body,
      }),
    }),
    submitPick: builder.mutation<void, { body: IRequestPicksPost; id: string }>(
      {
        //for adding picks to list  - should body be an array of strings?
        query: ({ body, id }) => ({
          url: `picks/${id}`,
          method: "PATCH",
          body,
        }),
      }
    ),
    approvePick: builder.mutation<void, string>({
      query: (id) => ({
        url: `picks/approve-pick/${id}`,
        method: "PATCH",
      }),
    }),
    deletePick: builder.mutation<void, string>({
      query: (id) => ({
        url: `/picks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
  useCreatePickMutation,
  useSubmitPickMutation,
  useApprovePickMutation,
  useDeletePickMutation,
} = requestPicksApi;

export default requestPicksApi.reducer;
