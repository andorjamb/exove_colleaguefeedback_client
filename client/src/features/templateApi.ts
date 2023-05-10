import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Types
import {
  ITemplateGet,
  ITemplatePost,
  IActiveTemplateGet,ITemplate
} from "../types/template";
// import { , ITemplateGet, ITemplatePost } from "../types/template";

//const serverApi = process.env.REACT_APP_SERVER_API;
const serverApi = "https://exove.vercel.app/api/";

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverApi,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Templates"],
  endpoints: (builder) => ({
    getAllTemplates: builder.query<ITemplateGet[], void>({
      query: () => `template/`,
      providesTags: ["Templates"],
    }),
    getActiveTemplate: builder.query<ITemplate, void>({
      query: () => `template/active`,
    }),
    addTemplate: builder.mutation<void, ITemplatePost>({
      query: (body) => ({
        url: `template`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Templates"],
    }),
    setActiveTemplate: builder.mutation<void, string>({
      //sets {active : true} on specified template id
      query: (id) => ({
        url: `template/${id}`,
        method: "PATCH",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetAllTemplatesQuery,
  useGetActiveTemplateQuery,
  useAddTemplateMutation,
  useSetActiveTemplateMutation,
} = templateApi;

export default templateApi.reducer;
