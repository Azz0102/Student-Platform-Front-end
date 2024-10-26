import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const classInfoApi = createApi({
    reducerPath: "classInfoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
        prepareHeaders: async (headers) => {
            const refreshToken = Cookies.get("refreshToken");

            if (refreshToken) {
                headers.set("refreshToken", `${refreshToken}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getclassInfo: builder.query({
            query: ({ classSessionId }) => `session_details/${classSessionId}`,
        }),

    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetclassInfoQuery } = classInfoApi;
