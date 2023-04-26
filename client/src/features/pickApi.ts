import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//Types
import {IRequestPicks} from '../types/picks';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const pickApi = createApi({
  reducerPath: 'pickApi',
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ['Picks'],
  endpoints: (builder) => ({
    
    /** for fetching picks of all users */
    getAllPicks: builder.query<IRequestPicks[], string>({
      query: ()=> `picks/`
    }),
      /** for fetching picks of one user */
    getPickByUserId: builder.query<IRequestPicks, string>({
      query:(uid) => `picks/${uid}`
    })
  }),
})

export const { useGetAllPicksQuery, useGetPickByUserIdQuery } = pickApi

export default pickApi.reducer;