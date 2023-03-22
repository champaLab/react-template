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
        }),

        me: builder.mutation({
            query: () => ({
                url: `/auth/me`,
                method: "POST",
            }),
        }),


        getUsers: builder.query({
            query: () => ({
                url: "/users",
            }),
            providesTags: ["userApi"],
        }),

        updateMyProfile: builder.mutation({
            query: ({ ...body }) => ({
                url: "/users/update/profile",
                method: "POST",
                body
            }),
            invalidatesTags: ["userApi"],
        }),

        addUser: builder.mutation({
            query: ({ ...body }) => ({
                url: "users/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["userApi"],
        }),

        updatePassword: builder.mutation({
            query: ({ ...body }) => ({
                url: "/users/update-password",
                method: "POST",
                body,
            }),
            invalidatesTags: ["userApi"],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}/delete`,
                method: "DELETE",
            }),
            invalidatesTags: ["userApi"],
        }),

        updateStatus: builder.mutation({
            query: ({ ...body }) => ({
                url: `/users/${body.u_id}/update/status`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["userApi"],
        }),

        updateUser: builder.mutation({
            query: ({ ...body }) => ({
                url: `/users/update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["userApi"],
        }),

        verifyEmail: builder.mutation({
            query: ({ ...body }) => ({
                url: `/auth/email-send-pin`,
                method: "POST",
                body
            }),
            invalidatesTags: ["userApi"],
        }),

    }),
});

export const { useGetUsersQuery,
    useUpdateUserMutation,
    useUpdateStatusMutation,
    useDeleteUserMutation,
    useUpdateMyProfileMutation,
    useMeMutation,
    useAddUserMutation,
    useLoginMutation,
    useVerifyEmailMutation,
    useUpdatePasswordMutation,
} = userApi;
