import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { api } from "@/services/api";

const lessonsAdapter = createEntityAdapter({
  selectId: (lesson) => lesson.id,
});

const initialState = lessonsAdapter.getInitialState();

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
      (state, action) => {
        lessonsAdapter.setAll(state, action.payload);
      }
    );
  },
});

export const { setLessons } = lessonsSlice.actions;

export const {
  selectAll: getAllLessons,
  selectById: getLessonById,
} = lessonsAdapter.getSelectors((state) => state.lessons);

// Selector to get lessons for current course
export const getCurrentCourseLessons = (state) => {
  const selectedCourseId = state.general.selectedCourseId;
  return getAllLessons(state).filter(lesson => lesson.courseId === selectedCourseId);
};

export default lessonsSlice.reducer;