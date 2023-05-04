import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IUserData } from "../types/users";

const serverApi = process.env.REACT_APP_SERVER_API;

/** for fetching profile data of loggedIn user */
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverApi }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserData[], void>({
      query: () => "users",
    }),
    getUserByName: builder.query<IUserData, string>({
      query: (name) => `users/${name}`,
    }),
  }),
});

export const { useGetUserByNameQuery, useGetAllUsersQuery } = userApi;

export default userApi.reducer;
