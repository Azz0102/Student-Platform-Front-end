import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// const cookieStore = cookies();
// Define a service using a base URL and expected endpoints
export const subscriptionApi = createApi({
	reducerPath: "subscriptionApi",
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
		subSubscription: builder.mutation({
			query: ({ endpoint }) => ({
				url: "subscription",
				method: "POST",
				body: { endpoint },
			}),
		}),
		subscribe: builder.mutation({
			query: ({ userName }) => ({
				url: "channel/subscribe",
				method: "POST",
				body: { channel: "coke_studio", username: userName },
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSubSubscriptionMutation, useSubscribeMutation } =
	subscriptionApi;
