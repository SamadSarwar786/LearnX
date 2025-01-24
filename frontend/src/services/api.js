import { getJwt } from "@/lib";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
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
    // Add other API endpoints as needed
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useCreateCourseMutation,
} = api;
