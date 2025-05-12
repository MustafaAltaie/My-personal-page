import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const portfolioApi = createApi({
    reducerPath: 'portfolioApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['profile', 'educations'],
    endpoints: (builder) => ({
        // profile
        readProfile: builder.query({
            query: () => 'profile',
            providesTags: ['profile']
        }),
        updateProfile: builder.mutation({
            query: (data) => ({ url: 'profile', method: 'PUT', body: data }),
            invalidatesTags: ['profile']
        }),
        // educations
        createEducation: builder.mutation({
            query: (data) => ({ url: 'educations', method: 'POST', body: data }),
            invalidatesTags: ['educations']
        }),
        readEducation: builder.query({
            query: () => 'educations',
            providesTags: ['educations']
        }),
        updateEducation: builder.mutation({
            query: ({ id, ...data }) => ({ url: `educations/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['educations']
        }),
        deleteEducation: builder.mutation({
            query: (id) => ({ url: `educations/${id}`, method: 'DELETE' }),
            invalidatesTags: ['educations']
        }),
        updateEducationsList: builder.mutation({
            query: (data) => ({ url: 'educations', method: 'PUT', body: data }),
            invalidatesTags: ['educations']
        })
    })
});

export const {
    // profile
    useReadProfileQuery,
    useUpdateProfileMutation,
    // educations
    useCreateEducationMutation,
    useReadEducationQuery,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
    useUpdateEducationsListMutation,
} = portfolioApi;