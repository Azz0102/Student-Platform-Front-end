import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const calenderApi = createApi({
	reducerPath: "calenderApi",
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
		getcalender: builder.query({
			query: ({ userId }) => `session_details/user/${userId}`,
		}),
		getlistRoom: builder.query({
			query: () => `classroom/all`,
		}),
		getlistEvent: builder.query({
			query: (semester) => `session_details/all/${semester}`,
		}),
		getlistSemester: builder.query({
			query: () => `semester`,
		}),
		getlistDashboard: builder.query({
			query: (semester) => `semester/${semester}`,
		}),
		getlistClassSession: builder.query({
			query: () => `class-session/list`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetcalenderQuery, useGetlistRoomQuery, useGetlistEventQuery,
	useGetlistSemesterQuery, useGetlistDashboardQuery, useGetlistClassSessionQuery
} = calenderApi;
