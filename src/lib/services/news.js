import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3001/api/" }),
    endpoints: (builder) => ({
        getListNewsByUser: builder.query({
            query: (id) => `news/${id}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListNewsByUserQuery } = newsApi;
