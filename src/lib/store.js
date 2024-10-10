import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { newsApi } from "./services/news";
import { tagApi } from "./services/tag";
import { authApi } from "./services/auth";
import { noteApi } from "./services/note";
import chatReducer from "./features/chatSlice";
import noteReducer from "./features/noteSlice";
import { chatApi } from "./services/chat";


export const makeStore = () => {
	return configureStore({
		reducer: {
			[newsApi.reducerPath]: newsApi.reducer,
			[tagApi.reducerPath]: tagApi.reducer,
			[noteApi.reducerPath]: noteApi.reducer,
			[authApi.reducerPath]: authApi.reducer,
			[chatApi.reducerPath]: chatApi.reducer,
			chat: chatReducer,
			note: noteReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(newsApi.middleware)
				.concat(tagApi.middleware)
				.concat(noteApi.middleware)
				.concat(authApi.middleware)
				.concat(chatApi.middleware),
		devTools: true,
	});
};

setupListeners(makeStore().dispatch);
