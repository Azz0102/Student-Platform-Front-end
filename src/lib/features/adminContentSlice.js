// adminContentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedContent: 0,
};

const adminContentSlice = createSlice({
    name: "adminContent",
    initialState,
    reducers: {
        setSelectedContent: (state, action) => {
            state.selectedContent = action.payload;
        }
    },
});

// Export the actions to be dispatched in the components
export const {
    setSelectedContent
} = adminContentSlice.actions;

// Export the reducer to be included in the store
export default adminContentSlice.reducer;
