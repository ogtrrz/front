import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

export const apiRequirents = createApi({
	reducerPath: "apiRequirents",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/appi/" }),
	endpoints: (builder) => ({

    getRequirents: builder.query({
        query: () => `requirents`,
    }),

		getRequirent: builder.query({
			query: (courseId = 0) => `requirents/${courseId}`,
		}),


		postRequirents: builder.mutation({
            query: ({ title, description, createdBy }) => ({
              url: `requirents`,
              method: 'POST',
              body: { title, description, createdBy },
            }),
            invalidatesTags: ['Requirents'],
		}),

        putRequirents: builder.mutation({
            query: ({ id, title }) => ({
              url: `requirents/${id}`,
              method: 'PUT',
              body: { title },
            }),
            invalidatesTags: ['Requirents'],
          }),

          patchRequirents: builder.mutation({
            query: ({ id, title }) => ({
              url: `requirents/${id}`,
              method: 'PATHC',
              body: { title },
            }),
            invalidatesTags: ['Requirents'],
          }),
      
          deleteRequirents: builder.mutation({
            query: (id) => ({
              url: `requirents/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Requirents'],
          }),
	}),
});

export const {
    useGetRequirentsQuery,
    useGetRequirentQuery,
    usePostRequirentsMutation,
    usePutRequirentsMutation,
    usePatchRequirentsMutation,
    useDeleteRequirentsMutation
  } = apiRequirents;
