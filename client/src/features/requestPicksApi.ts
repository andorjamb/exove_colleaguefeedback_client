import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IRequestPicks } from "../types/picks";
import { IRequestPicksPost } from "../types/picks";

//const serverApi = process.env.REACT_APP_SERVER_API;
const serverApi = "https://exove.vercel.app/api/";

export const requestPicksApi = createApi({
  reducerPath: "requestPicksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverApi,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }), //for testing
  tagTypes: ["RequestPicks", "UserRequestPicks", "DocIdRequestPicks"],
  endpoints: (builder) => ({
    getAllRequestPicks: builder.query<IRequestPicks[], void>({
      query: () => "picks",
      providesTags: ["RequestPicks"],
    }),
    getRequestPickByUserId: builder.query<IRequestPicks, string>({
      /** fetches pick object where user=person selected to pick */
      query: (userId) => `picks/${userId}`,
      providesTags: ["UserRequestPicks"],
    }),
    getRequestPickByDocId: builder.query<IRequestPicks, string>({
      query: (id) => `picks/pick-id/${id}`,
      providesTags: ["DocIdRequestPicks"],
    }),
    createPick: builder.mutation<void, IRequestPicksPost>({
      query: (body) => ({
        url: "picks/createreqpick",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RequestPicks"],
    }),
    submitPick: builder.mutation<void, { body: IRequestPicksPost; id: string }>(
      {
        //for adding picks to list  - should body be an array of strings?
        query: ({ body, id }) => ({
          url: `picks/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["RequestPicks"],
      }
    ),
    approvePick: builder.mutation<void, string>({
      query: (id) => ({
        url: `picks/approve-pick/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RequestPicks"],
    }),
    deletePick: builder.mutation<void, string>({
      query: (id) => ({
        url: `/picks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RequestPicks"],
    }),
  }),
});

export const {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
  useGetRequestPickByDocIdQuery,
  useCreatePickMutation,
  useSubmitPickMutation,
  useApprovePickMutation,
  useDeletePickMutation,
} = requestPicksApi;

export default requestPicksApi.reducer;
