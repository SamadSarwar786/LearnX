import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/es/storage/session";

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


const persistConfig = {
  key: "general",
  storage: sessionStorage,
}

export default persistReducer(persistConfig, generalSlice.reducer);
