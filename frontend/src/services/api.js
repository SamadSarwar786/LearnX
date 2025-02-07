import { getJwt } from "@/lib";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://learnx.me/",
    prepareHeaders: (headers, { getState, endpoint }) => {
      // headers.set("X-APP-NAME", process.env.REACT_APP_CODEX || "");
      if (!headers.has("Content-Type"))
        headers.set("Content-Type", "application/json");
      const token = getJwt();
      if (token && !["login","register"].includes(endpoint))
        headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/public/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: ({ userData, userType }) => ({
        url: `api/public/register/${userType}`,
        method: "POST",
        body: userData,
      }),
    }),
    createCourse: builder.mutation({
      query: (payload) => ({
        url: "api/instructor/course",
        method: "POST",
        body: payload,
      }),
    }),
    getCategories: builder.query({
      query: () => "api/public/category",
    }),
    createCategory: builder.mutation({
      query: (categoryName) => ({
        url: "api/public/category/create",
        method: "POST",
        body: { name: categoryName },
      }),
      // Invalidate the categories query after creating a new category
      invalidates: ['getCategories'],
    }),
    getThumbnailUrl: builder.query({
      query: ({courseId}) => ({
        url: `api/instructor/course/${courseId}/thumbnail`,
        method: 'GET',
      }),
    }),
    uploadThumbnailImg: builder.mutation({
      query: ({courseId, thumbnailUrl}) => ({
        url: `api/instructor/course/${courseId}/thumbnail`,
        method: "POST",
      })
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateCourseMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetThumbnailUrlQuery,
  useUploadThumbnailImgMutation
} = api;
