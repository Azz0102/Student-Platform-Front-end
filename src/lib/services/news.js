import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const newsApi = createApi({
	reducerPath: "newsApi",
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
		getListNewsByUser: builder.query({
			query: (id) => `news/${id}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListNewsByUserQuery } = newsApi;
