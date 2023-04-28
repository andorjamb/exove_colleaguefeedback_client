import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//Types
import {ITemplate} from '../types/template';

const serverUrl = process.env.REACT_APP_SERVER_API;
const devServerUrl = "http://localhost:4000/template";

export const templateApi = createApi({
  reducerPath: 'templateApi',
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ['Templates'],
  endpoints: (builder) => ({
    
    /** for fetching all templates */
    getAllTemplates: builder.query<ITemplate[], void>({
      query: ()=> `templates/`
    }),
      /** for fetching one template */
    getPickByUserId: builder.query<ITemplate, string>({
      query:(uid) => `template/${uid}`
    })
  }),
})

export const { useGetAllTemplatesQuery } = templateApi

export default templateApi.reducer;