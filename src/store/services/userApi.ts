import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["userApi"],

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API_PATH,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE);
            if (token) headers.set(import.meta.env.VITE_APP_HEADER, "Bearer " + token);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ ...body }) => ({
                url: `/auth/login`,
                method: "POST",
                body,
            }),
            invalidatesTags: ['userApi']
        }),

        me: builder.mutation({
            query: () => ({
                url: `/auth/me`,
                method: "POST",
            }),
            invalidatesTags: ['userApi']
        }),


        getUsers: builder.query({
            query: () => ({
                url: "/users",
            }),
            providesTags: ["userApi"],
        }),

    }),
});

export const {
    useGetUsersQuery,
    useMeMutation,
    useLoginMutation,
} = userApi;
