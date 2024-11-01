import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// const cookieStore = cookies();
// Define a service using a base URL and expected endpoints
export const noteApi = createApi({
	reducerPath: "noteApi",
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
		getListNote: builder.query({
			query: (userId) => `note/${userId}`,
		}),
		createNote: builder.mutation({
			query: ({ userId, name, content, tags }) => ({
				url: "note",
				method: "POST",
				body: { userId, name, content, tags },
			}),
		}),
		updateNote: builder.mutation({
			query: ({ noteId, name, content, tagIds }) => ({
				url: "note",
				method: "PATCH",
				body: { noteId, name, content, tagIds },
			}),
		}),
		deleteNote: builder.mutation({
			query: ({ noteId }) => ({
				url: `note/${noteId}`,
				method: "DELETE",
			}),
		}),
		uploadFile: builder.mutation({
			query: ({ file }) => {
				return {
					url: `note/upload`,
					method: "POST",
					body: file,
				};
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetListNoteQuery,
	useCreateNoteMutation,
	useDeleteNoteMutation,
	useUpdateNoteMutation,
	useUploadFileMutation,
} = noteApi;
