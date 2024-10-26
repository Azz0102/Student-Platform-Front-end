import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const fileApi = createApi({
    reducerPath: "fileApi",
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
        getFile: builder.query({
            query: (messageId) => `message/file/${messageId}`,
        }),

    }),
});

export const { useGetFileQuery } = fileApi;