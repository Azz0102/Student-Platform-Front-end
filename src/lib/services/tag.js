import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// const cookieStore = cookies();
// Define a service using a base URL and expected endpoints
export const tagApi = createApi({
	reducerPath: "tagApi",
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
		getListTag: builder.query({
			query: (userId) => `tag/${userId}`,
		}),
		createTag: builder.mutation({
			query: ({ userId, name }) => ({
				url: "tag",
				method: "POST",
				body: {
					userId,
					name,
				},
			}),
		}),
		removeTag: builder.mutation({
			query: ({ tagId }) => ({
				url: `tag/${tagId}`,
				method: "DELETE",
			}),
		}),
		renameTag: builder.mutation({
			query: ({ tagId, name }) => ({
				url: "tag",
				method: "PATCH",
				body: { tagId, name },
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetListTagQuery,
	useCreateTagMutation,
	useRemoveTagMutation,
	useRenameTagMutation,
} = tagApi;
