import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import { IUser } from "../types/users";

const serverApi = process.env.REACT_APP_SERVER_API;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverApi }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => "users",
    }),
    getUserByName: builder.query<IUser, string>({
      query: (name) => `users/${name}`,
    }),
  }),
});

export const { useGetUserByNameQuery, useGetAllUsersQuery } = userApi;

export default userApi.reducer;
