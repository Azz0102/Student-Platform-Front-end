import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { newsApi } from "./services/news";
import { tagApi } from "./services/tag";
import { authApi } from "./services/auth";
import { noteApi } from "./services/note";
import chatReducer from "./features/chatSlice";
import noteReducer from "./features/noteSlice";
import { chatApi } from "./services/chat";
import { notiApi } from "./services/noti";
import { calenderApi } from "./services/calender";


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
			chat: chatReducer,
			note: noteReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(newsApi.middleware)
				.concat(tagApi.middleware)
				.concat(noteApi.middleware)
				.concat(authApi.middleware)
				.concat(chatApi.middleware)
				.concat(notiApi.middleware)
				.concat(calenderApi.middleware),
		devTools: true,
	});
};

setupListeners(makeStore().dispatch);
