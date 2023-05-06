import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { HYDRATE } from 'next-redux-wrapper'

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

export const apiCourse = createApi({
	reducerPath: "apiCourse",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/appi/" }),
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath]
  //   }
  // },
	endpoints: (builder) => ({

        getCourses: builder.query({
            query: () => `courses`,
        }),

		getCourse: builder.query({
			query: (courseId = 0) => `courses/${courseId}`,
		}),


		postCourse: builder.mutation({
            query: ({ title, description, createdBy }) => ({
              url: `courses`,
              method: 'POST',
              body: { title, description, createdBy },
            }),
            invalidatesTags: ['Courses'],
		}),

        putCourse: builder.mutation({
            query: ({ id, title }) => ({
              url: `courses/${id}`,
              method: 'PUT',
              body: { title },
            }),
            invalidatesTags: ['Courses'],
          }),

          patchCourse: builder.mutation({
            query: ({ id, title }) => ({
              url: `courses/${id}`,
              method: 'PATHC',
              body: { title },
            }),
            invalidatesTags: ['Courses'],
          }),
      
          deleteCourse: builder.mutation({
            query: (id) => ({
              url: `courses/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Courses'],
          }),
	}),
});

export const {
    useGetCoursesQuery,
    useGetCourseQuery,
    usePostCourseMutation,
    usePutCourseMutation,
    usePatchCourseMutation,
    useDeleteCourseMutation
  } = apiCourse;
