// noteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentNoteId: null,
	listNote: [],
};

const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {
		setCurrentNoteId: (state, action) => {
			state.currentNoteId = action.payload;
		},
		setListNote: (state, action) => {
			state.listNote = action.payload;
		},
	},
});

// Export the actions to be dispatched in the components
export const { setCurrentNoteId, setListNote } = noteSlice.actions;

// Export the reducer to be included in the store
export default noteSlice.reducer;
