import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { api } from "@/services/api";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";

// Create an entity adapter for lessons
const lessonsAdapter = createEntityAdapter({
  selectId: (lesson) => lesson.id,
});

// Initial state with an object to store lessons by courseId
const initialState = lessonsAdapter.getInitialState({
  byCourseId: {}, // Store lesson IDs grouped by course ID
});

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setLessons: (state, action) => {
      lessonsAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getCourseLessons.matchFulfilled,
      (state, { payload, meta: { arg: { courseId } } }) => {
        const lessonsArray = Array.isArray(payload?.lessons) ? payload.lessons : [];
        lessonsAdapter.setMany(state, lessonsArray); // Add lessons without erasing old ones
        state.byCourseId[courseId] = lessonsArray.map((lesson) => lesson.id); // Store lesson IDs per course
      }
    );
  },
});

export const { setLessons } = lessonsSlice.actions;

export const {
  selectAll: getAllLessons,
  selectById: getLessonById,
} = lessonsAdapter.getSelectors((state) => state.lessons);

const persistConfig = {
  key: "lessons",
  storage: sessionStorage,
}

export default persistReducer(persistConfig, lessonsSlice.reducer);
