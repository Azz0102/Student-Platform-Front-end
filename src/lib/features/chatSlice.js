// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { Users, ChatBotMessages, userData } from "@/app/data";

const initialState = {
    selectedChat: null,

    input: "",

    messages: [],

};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        setInput: (state, action) => {
            state.input = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        }
    },
});

// Export the actions to be dispatched in the components
export const {
    setInput,
    setMessages,
    setSelectedChat
} = chatSlice.actions;

// Export the reducer to be included in the store
export default chatSlice.reducer;
