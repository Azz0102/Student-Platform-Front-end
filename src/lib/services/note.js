import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const noteApi = createApi({
    reducerPath: "noteApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3001/api/" }),
    endpoints: (builder) => ({
        getListNote: builder.query({
            query: (id) => `note/${id}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListNoteQuery } = noteApi;
