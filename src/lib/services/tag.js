import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const tagApi = createApi({
    reducerPath: "tagApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3001/api/" }),
    endpoints: (builder) => ({
        getListTag: builder.query({
            query: (id) => `tag/${id}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListTagQuery } = tagApi;
