import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { newsApi } from "./services/news";
import { tagApi } from "./services/tag";
import { noteApi } from "./services/note";
import chatReducer from "./features/chatSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [newsApi.reducerPath]: newsApi.reducer,
            [tagApi.reducerPath]: tagApi.reducer,
            [noteApi.reducerPath]: noteApi.reducer,
            chat: chatReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(newsApi.middleware)
                .concat(tagApi.middleware)
                .concat(noteApi.middleware),
        devTools: true,
    });
};

setupListeners(makeStore().dispatch);
