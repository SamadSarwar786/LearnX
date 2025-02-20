import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { api } from "@/services/api"; 

// Create an entity adapter for courses
const coursesAdapter = createEntityAdapter({
  selectId: (course) => course.id, 
})

// Get initial state from the adapter
const initialState = coursesAdapter.getInitialState();

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      coursesAdapter.setAll(state, action.payload); // Store all courses
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getPublicCourses.matchFulfilled, (state, action) => {
      coursesAdapter.setAll(state, action.payload);
    });
  },
});

// Export actions
export const { setCourses } = coursesSlice.actions;

// Export selectors
export const {
  selectAll: getAllCourses,       // Get all courses
  selectById: getCourseById,      // Get course by ID
} = coursesAdapter.getSelectors((state) => state.courses);

// export const getLessonById = (courseId, lessonId) => (state) => {
//   const course = getCourseById(state, courseId);
//   return course?.lessons?.find(lesson => lesson.id === lessonId) || null;
// };

// Export reducer
export default coursesSlice.reducer;