import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedLesson: null,
    selectedCourseId: null,
}

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setSelectedLesson: (state, action) => {
            state.selectedLesson = action.payload;
        },
        setSelectedCourseId: (state, action) => {
            state.selectedCourseId = action.payload;
        },
        // Optional: helper to clear selections
        clearSelections: (state) => {
            state.selectedLesson = null;
            state.selectedCourseId = null;
        },
    },
});

export const { setSelectedLesson, setSelectedCourseId, clearSelections } = generalSlice.actions;

// Optional: Selectors for convenience
export const getSelectedCourseId = (state) => state.general.selectedCourseId;
export const getSelectedLesson = (state) => state.general.selectedLesson;

export default generalSlice.reducer;