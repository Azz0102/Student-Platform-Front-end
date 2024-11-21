// adminContentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedContent: 0,
    selectedClassSession: "",
    selectedSessionDetail: null
};

const adminContentSlice = createSlice({
    name: "adminContent",
    initialState,
    reducers: {
        setSelectedContent: (state, action) => {
            state.selectedContent = action.payload;
        },
        setClassSession: (state, action) => {
            state.selectedClassSession = action.payload;
        },
        setSessionDetail: (state, action) => {
            state.selectedSessionDetail = action.payload;
        }
    },
});

// Export the actions to be dispatched in the components
export const {
    setSelectedContent,
    setClassSession,
    setSessionDetail
} = adminContentSlice.actions;

// Export the reducer to be included in the store
export default adminContentSlice.reducer;
