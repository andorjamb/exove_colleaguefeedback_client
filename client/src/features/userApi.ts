import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IUserDataGet } from "../types/users";

const serverApi = process.env.REACT_APP_SERVER_API;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exove.vercel.app/api/",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserDataGet[], void>({
      query: () => "users",
    }),
    getUserByName: builder.query<IUserDataGet, string>({
      query: (name) => `users/${name}`,
    }),
  }),
});

export const { useGetUserByNameQuery, useGetAllUsersQuery } = userApi;

export default userApi.reducer;
