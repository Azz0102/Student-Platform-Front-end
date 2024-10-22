// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { Users, ChatBotMessages, userData } from "@/app/data";

const initialState = {
    selectedNews: null,

    listNews: [],

};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setSelectedNews: (state, action) => {
            state.selectedNews = action.payload;
        },
        setListNews: (state, action) => {
            state.listNews = action.payload;
        }
    },
});

// Export the actions to be dispatched in the components
export const {
    setSelectedNews,
    setListNews
} = newsSlice.actions;

// Export the reducer to be included in the store
export default newsSlice.reducer;
