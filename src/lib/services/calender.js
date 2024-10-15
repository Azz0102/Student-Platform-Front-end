import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const calenderApi = createApi({
    reducerPath: "calenderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:3001/api/",
        prepareHeaders: async (headers) => {
            const refreshToken = Cookies.get("refreshToken");

            if (refreshToken) {
                headers.set("refreshToken", `${refreshToken}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getcalender: builder.query({
            query: ({ userId }) => `session_details/user/${userId}`,

            // transformResponse: (rawResult, meta) => {
            //     console.log("rawResult", rawResult.metadata);
            //     console.log("meta", meta);

            // return rawResult.map((item) => {
            //     return {
            //         start: new Date(item.start),
            //         end: new Date(item.end),
            //         ...item
            //     }
            // })
            // }
        }),

    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetcalenderQuery } = calenderApi;