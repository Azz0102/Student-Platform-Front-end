import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { newsApi } from "./services/news";
import { tagApi } from "./services/tag";
import { authApi } from "./services/auth";
import { noteApi } from "./services/note";
import chatReducer from "./features/chatSlice";
import noteReducer from "./features/noteSlice";
import newsReducer from "./features/newsSlice";
import adminContentReducer from "./features/adminContentSlice";
import { chatApi } from "./services/chat";
import { notiApi } from "./services/noti";
import { calenderApi } from "./services/calender";
import { classInfoApi } from "./services/classInfo";
import { subscriptionApi } from "./services/subscription";

export const makeStore = () => {
	return configureStore({
		reducer: {
			[newsApi.reducerPath]: newsApi.reducer,
			[tagApi.reducerPath]: tagApi.reducer,
			[noteApi.reducerPath]: noteApi.reducer,
			[authApi.reducerPath]: authApi.reducer,
			[chatApi.reducerPath]: chatApi.reducer,
			[notiApi.reducerPath]: notiApi.reducer,
			[calenderApi.reducerPath]: calenderApi.reducer,
			[classInfoApi.reducerPath]: classInfoApi.reducer,
			[subscriptionApi.reducerPath]: subscriptionApi.reducer,
			chat: chatReducer,
			note: noteReducer,
			news: newsReducer,
			adminContent: adminContentReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(newsApi.middleware)
				.concat(tagApi.middleware)
				.concat(noteApi.middleware)
				.concat(authApi.middleware)
				.concat(chatApi.middleware)
				.concat(notiApi.middleware)
				.concat(calenderApi.middleware)
				.concat(classInfoApi.middleware)
				.concat(subscriptionApi.middleware),
		devTools: true,
	});
};

setupListeners(makeStore().dispatch);
