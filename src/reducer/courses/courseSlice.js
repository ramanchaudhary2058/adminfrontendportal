import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCourses } from "./courseAction";

const initialQueryState = {
  filters: {
    title: "",
  },
  sort: JSON.stringify({ createdAt: -1 }),
  limit: 10,
};

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    loading: false,
    error: null,
    query: {},
  },
  reducers: {
    setLimit: (state, action) => {
      state.query.limit = action.payload;
    },
    setSort: (state, action) => {
      state.query.sort = action.payload;
    },
    setFilters: (state, action) => {
      state.query.filters = { ...state.query.filters, ...action.payload };
    },
    resetQuery: (state) => {
      state.query = initialQueryState;
    },
    // New reducer to remove a course from the courses list
    removeCourse: (state, action) => {
      state.courses = state.courses.filter((course) => course._id !== action.payload);
    },
    // New reducer to modify an existing course in the courses list
    modifyCourse: (state, action) => {
      state.courses = state.courses.map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  setLimit,
  setFilters,
  setSort,
  resetQuery,
  removeCourse,
  modifyCourse, // Export new reducers
} = courseSlice.actions;

export default courseSlice.reducer;
