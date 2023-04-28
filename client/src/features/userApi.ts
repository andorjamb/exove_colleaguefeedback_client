import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//Types
import {IUserData} from '../types/users';

const serverUrl = "http://localhost:4000/employee"

/** for fetching profile data of loggedIn user */
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  endpoints: (builder) => ({
    getUserData: builder.query<IUserData[], string>({
      query: (uid) => `user/${uid}`,
    }),
  }),
})


export const { useGetUserDataQuery } = userApi

export default userApi.reducer;