import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "next/headers";

const cookieStore = cookies();
// Define a service using a base URL and expected endpoints
export const noteApi = createApi({
	reducerPath: "noteApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://localhost:3001/api/",
		prepareHeaders: async (headers) => {
			const refreshToken = cookieStore.get("refreshToken");

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
			query: ({ userId, title, content, tags }) => ({
				url: "note",
				method: "POST",
				body: { userId, title, content, tags },
			}),
		}),
		updateNote: builder.mutation({
			query: ({ noteId, title, content, tags }) => ({
				url: "note",
				method: "PATCH",
				body: { noteId, title, content, tags },
			}),
		}),
		deleteNote: builder.mutation({
			query: ({ noteId }) => ({
				url: `note/${noteId}`,
				method: "DELETE",
			}),
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
} = noteApi;
