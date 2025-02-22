import { getJwt } from "@/lib";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://learnx.me/",
    prepareHeaders: (headers, { getState, endpoint }) => {
      // headers.set("X-APP-NAME", process.env.REACT_APP_CODEX || "");
      if (!headers.has("Content-Type"))
        headers.set("Content-Type", "application/json");
      const token = getJwt();
      if (token && !["login","register"].includes(endpoint))
        headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
    responseHandler: (response) => {
      if (response.headers.get('content-type').includes('text/plain')) {
        return response.text(); // Handle plain text responses here
      }
      return response.json(); // Handle JSON responses as usual
    }
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

    // create course
    createCourse: builder.mutation({
      query: (payload) => ({
        url: "api/instructor/course",
        method: "POST",
        body: payload,
      }),
    }),

    // update course
    updateCourse: builder.mutation({
      query: ({ courseId, ...payload }) => ({
        url: `api/instructor/course/${courseId}`,
        method: "PUT",
        body: payload,
      }),
    }),

    // get instructor courses
    getInstructorCourses: builder.query({
      query: () => "api/instructor/courses",
    }),

    // get student courses
    getStudentCourses: builder.query({
      query: () => "api/student/courses",
    }),

    // get public courses
    getPublicCourses: builder.query({
      query: () => "api/public/courses",
    }),

    getCourseLessons: builder.query({
      query: ({ courseId }) => `api/public/lessons/course/${courseId}`,
    }),

    // create lesson
    createLesson: builder.mutation({
      query: ({courseId, ...payload}) => ({
        url: `api/lesson/course/${courseId}`,
        method: "POST",
        body: payload,
      }),
    }),

    // update lessons
    updateLesson: builder.mutation({
      query: ({ courseId, lessonId, ...payload }) => ({
        url: `api/lesson/${lessonId}/course/${courseId}`,
        method: "PUT",
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

    // get thumbnail url
    getThumbnailUrl: builder.query({
      query: ({courseId}) => ({
        url: `api/instructor/course/${courseId}/thumbnail`,
        method: 'GET',
      }),
    }),

    uploadThumbnailImg: builder.mutation({
      query: ({courseId}) => ({
        url: `api/instructor/course/${courseId}/thumbnail`,
        method: "POST",
      })
    }),

    // get video url
    getVideoUrl: builder.query({
      query: ({lessonId, courseId}) => ({
        url: `api/lesson/${lessonId}/course/${courseId}/video`,
        method: 'GET',
      }),
    }),

    // upload video
    uploadVideo: builder.mutation({
      query: ({ lessonId, courseId }) => ({
        url: `api/lesson/${lessonId}/course/${courseId}/video`,
        method: "POST",
      }),
    }),
    getClientToken: builder.query({
      query: () => "api/payment/client-token",
    }),
    processPayment: builder.mutation({
      query: (payload) => ({
        url: "api/payment/process-payment",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useCreateCourseMutation,
  useGetThumbnailUrlQuery,
  useUploadThumbnailImgMutation,
  useGetVideoUrlQuery,
  useUploadVideoMutation,
  useGetClientTokenQuery,
  useProcessPaymentMutation,
  useUpdateCourseMutation,
  useGetInstructorCoursesQuery,
  useGetStudentCoursesQuery,
  useGetPublicCoursesQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useGetCourseLessonsQuery,
} = api;
