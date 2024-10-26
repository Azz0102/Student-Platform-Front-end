import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// const cookieStore = cookies();
// Define a service using a base URL and expected endpoints
export const notiApi = createApi({
	reducerPath: "notiApi",
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
		getListNoti: builder.query({
			query: (userId) => `notification/${userId}`,
		}),
		updateNotiUser: builder.mutation({
			query: ({ id }) => ({
				url: "notification",
				method: "PATCH",
				body: { id },
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListNotiQuery, useUpdateNotiUserMutation } = notiApi;
