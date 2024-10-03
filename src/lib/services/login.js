import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3001/api/" }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ name, password }) => ({
                url: "user/login",
                method: "POST",
                body: { name, password },
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = loginApi;
