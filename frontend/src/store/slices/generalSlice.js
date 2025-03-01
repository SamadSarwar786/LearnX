import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedLesson: null,
}

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setSelectedLesson: (state, action) => {
            state.selectedLesson = action.payload;
        },
    },
});

export const { setSelectedLesson } = generalSlice.actions;

export const getSelectedLesson = (state) => state.general.selectedLesson;

export default generalSlice.reducer;
