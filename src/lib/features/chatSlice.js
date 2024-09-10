// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { Users, ChatBotMessages, userData } from "@/app/data";

const initialState = {
    selectedUser: Users[4],
    selectedExample: { name: "Messenger example", url: "/" },
    examples: [
        { name: "Messenger example", url: "/" },
        { name: "Chatbot example", url: "/chatbot" },
        { name: "Chatbot2 example", url: "/chatbot2" },
    ],
    input: "",
    chatBotMessages: ChatBotMessages,
    messages: userData[0].messages,
    hasInitialAIResponse: false,
    hasInitialResponse: false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setSelectedExample: (state, action) => {
            state.selectedExample = action.payload;
        },
        setExamples: (state, action) => {
            state.examples = action.payload;
        },
        setInput: (state, action) => {
            state.input = action.payload;
        },
        setChatBotMessages: (state, action) => {
            state.chatBotMessages = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setHasInitialAIResponse: (state, action) => {
            state.hasInitialAIResponse = action.payload;
        },
        setHasInitialResponse: (state, action) => {
            state.hasInitialResponse = action.payload;
        },
    },
});

// Export the actions to be dispatched in the components
export const {
    setSelectedUser,
    setSelectedExample,
    setExamples,
    setInput,
    setChatBotMessages,
    setMessages,
    setHasInitialAIResponse,
    setHasInitialResponse,
} = chatSlice.actions;

// Export the reducer to be included in the store
export default chatSlice.reducer;
