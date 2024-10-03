import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { newsApi } from "./services/news";
import { tagApi } from "./services/tag";
import { loginApi } from "./services/login";
import { noteApi } from "./services/note";
import chatReducer from "./features/chatSlice";
import noteReducer from "./features/noteSlice";


export const makeStore = () => {
	return configureStore({
		reducer: {
			[newsApi.reducerPath]: newsApi.reducer,
			[tagApi.reducerPath]: tagApi.reducer,
			[noteApi.reducerPath]: noteApi.reducer,
			[loginApi.reducerPath]: loginApi.reducer,
			chat: chatReducer,
			note: noteReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(newsApi.middleware)
				.concat(tagApi.middleware)
				.concat(noteApi.middleware)
				.concat(loginApi.middleware),
		devTools: true,
	});
};

setupListeners(makeStore().dispatch);
