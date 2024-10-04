import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3001/api/" }),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: ({ name, password }) => ({
				url: "user/login",
				method: "POST",
				body: { name, password },
			}),
		}),
		logout: builder.mutation({
			query: ({ refreshToken }) => ({
				url: "user/logout",
				method: "POST",
				body: { keyStore: refreshToken },
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLogoutMutation } = authApi;
