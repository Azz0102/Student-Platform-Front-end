import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `https://${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
	}),
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
		forgot_password: builder.mutation({
			query: ({ name }) => ({
				url: "user/forgot-password",
				method: "POST",
				body: { name },
			}),
		}),
		reset_password: builder.mutation({
			query: ({ resetToken, newPassword }) => ({
				url: "user/reset-password",
				method: "PATCH",
				body: { resetToken, newPassword },
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useLoginMutation,
	useLogoutMutation,
	useForgot_passwordMutation,
	useReset_passwordMutation,
} = authApi;
