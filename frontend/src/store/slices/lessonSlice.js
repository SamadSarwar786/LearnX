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
      (state, { payload, meta: { arg: { courseId } } }) => {
        lessonsAdapter.setAll(state, payload);
        state.byCourseId[courseId] = payload;
      }
    );
  },
});

export const { setLessons } = lessonsSlice.actions;

export const {
  selectAll: getAllLessons,
  selectById: getLessonById,
  selectFromState: selectLessonsFromState,
} = lessonsAdapter.getSelectors((state) => state.lessons);

export const getLessonsByCourseId = (state, courseId) => {
  return selectLessonsFromState(state, courseId) || [];
};

export default lessonsSlice.reducer;
