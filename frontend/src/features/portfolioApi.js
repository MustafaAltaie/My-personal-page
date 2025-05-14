import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const portfolioApi = createApi({
    reducerPath: 'portfolioApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: [
        'profile',
        'educations',
        'frontendSkills',
        'backendSkills',
        'otherSkills',
        'softSkills',
        'experiences',
        'projects',
    ],
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
        }),
        // skills frontend
        createFrontendSkill: builder.mutation({
            query: (data) => ({ url: 'frontendSkills', method: 'POST', body: data }),
            invalidatesTags: ['frontendSkills']
        }),
        readFrontendSkills: builder.query({
            query: () => 'frontendSkills',
            providesTags: ['frontendSkills']
        }),
        updateFrontendSkills: builder.mutation({
            query: ({ id, ...data }) => ({ url: `frontendSkills/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['frontendSkills']
        }),
        deleteFrontendSkills: builder.mutation({
            query: (id) => ({ url: `frontendSkills/${id}`, method: 'DELETE' }),
            invalidatesTags: ['frontendSkills']
        }),
        updateFrontendList: builder.mutation({
            query: (data) => ({ url: 'frontendSkills', method: 'PUT', body: data }),
            invalidatesTags: ['frontendSkills']
        }),
        // skills backend
        createBackendSkill: builder.mutation({
            query: (data) => ({ url: 'backendSkills', method: 'POST', body: data }),
            invalidatesTags: ['backendSkills']
        }),
        readBackendSkills: builder.query({
            query: () => 'backendSkills',
            providesTags: ['backendSkills']
        }),
        updateBackendSkills: builder.mutation({
            query: ({ id, ...data }) => ({ url: `backendSkills/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['backendSkills']
        }),
        deleteBackendSkills: builder.mutation({
            query: (id) => ({ url: `backendSkills/${id}`, method: 'DELETE' }),
            invalidatesTags: ['backendSkills']
        }),
        updateBackendList: builder.mutation({
            query: (data) => ({ url: 'backendSkills', method: 'PUT', body: data }),
            invalidatesTags: ['backendSkills']
        }),
        // skills other
        createOtherSkill: builder.mutation({
            query: (data) => ({ url: 'otherSkills', method: 'POST', body: data }),
            invalidatesTags: ['otherSkills']
        }),
        readOtherSkills: builder.query({
            query: () => 'otherSkills',
            providesTags: ['otherSkills']
        }),
        updateOtherSkills: builder.mutation({
            query: ({ id, ...data }) => ({ url: `otherSkills/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['otherSkills']
        }),
        deleteOtherSkills: builder.mutation({
            query: (id) => ({ url: `otherSkills/${id}`, method: 'DELETE' }),
            invalidatesTags: ['otherSkills']
        }),
        updateOtherList: builder.mutation({
            query: (data) => ({ url: 'otherSkills', method: 'PUT', body: data }),
            invalidatesTags: ['otherSkills']
        }),
        // skills soft
        createSoftSkill: builder.mutation({
            query: (data) => ({ url: 'softSkills', method: 'POST', body: data }),
            invalidatesTags: ['softSkills']
        }),
        readSoftSkills: builder.query({
            query: () => 'softSkills',
            providesTags: ['softSkills']
        }),
        updateSoftSkills: builder.mutation({
            query: ({ id, ...data }) => ({ url: `softSkills/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['softSkills']
        }),
        deleteSoftSkills: builder.mutation({
            query: (id) => ({ url: `softSkills/${id}`, method: 'DELETE' }),
            invalidatesTags: ['softSkills']
        }),
        updateSoftList: builder.mutation({
            query: (data) => ({ url: 'softSkills', method: 'PUT', body: data }),
            invalidatesTags: ['softSkills']
        }),
        // experiences
        createExperience: builder.mutation({
            query: (data) => ({ url: 'experiences', method: 'POST', body: data }),
            invalidatesTags: ['experiences']
        }),
        readExperience: builder.query({
            query: () => 'experiences',
            providesTags: ['experiences']
        }),
        updateExperience: builder.mutation({
            query: ({ id, ...data }) => ({ url: `experiences/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['experiences']
        }),
        deleteExperience: builder.mutation({
            query: (id) => ({ url: `experiences/${id}`, method: 'DELETE' }),
            invalidatesTags: ['experiences']
        }),
        updateExperienceList: builder.mutation({
            query: (data) => ({ url: 'experiences', method: 'PUT', body: data }),
            invalidatesTags: ['experiences']
        }),
        // projects
        createProject: builder.mutation({
            query: (data) => ({ url: 'projects', method: 'POST', body: data }),
            invalidatesTags: ['projects']
        }),
        readProjects: builder.query({
            query: () => 'projects',
            providesTags: ['projects']
        }),
        updateProject: builder.mutation({
            query: ({ id, ...data }) => ({ url: `projects/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['projects']
        }),
        deleteProject: builder.mutation({
            query: (id) => ({ url: `projects/${id}`, method: 'DELETE' }),
            invalidatesTags: ['projects']
        }),
        updateProjectList: builder.mutation({
            query: (data) => ({ url: 'projects', method: 'PUT', body: data }),
            invalidatesTags: ['projects']
        }),
        // send email
        sendContactEmail: builder.mutation({
            query: (data) => ({ url: 'email/send', method: 'POST', body: data }),
        }),
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
    // skills frontend
    useCreateFrontendSkillMutation,
    useReadFrontendSkillsQuery,
    useUpdateFrontendSkillsMutation,
    useDeleteFrontendSkillsMutation,
    useUpdateFrontendListMutation,
    // skills backend
    useCreateBackendSkillMutation,
    useReadBackendSkillsQuery,
    useUpdateBackendSkillsMutation,
    useDeleteBackendSkillsMutation,
    useUpdateBackendListMutation,
    // skills other
    useCreateOtherSkillMutation,
    useReadOtherSkillsQuery,
    useUpdateOtherSkillsMutation,
    useDeleteOtherSkillsMutation,
    useUpdateOtherListMutation,
    // skills soft
    useCreateSoftSkillMutation,
    useReadSoftSkillsQuery,
    useUpdateSoftSkillsMutation,
    useDeleteSoftSkillsMutation,
    useUpdateSoftListMutation,
    // experiences
    useCreateExperienceMutation,
    useReadExperienceQuery,
    useUpdateExperienceMutation,
    useDeleteExperienceMutation,
    useUpdateExperienceListMutation,
    // projects
    useCreateProjectMutation,
    useReadProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useUpdateProjectListMutation,
    // send email
    useSendContactEmailMutation,
} = portfolioApi;