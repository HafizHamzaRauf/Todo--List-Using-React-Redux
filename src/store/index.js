import { configureStore } from "@reduxjs/toolkit";
import { tasksSliceReducers } from "./tasks-slice";
const store = configureStore({
  reducer: {
    tasks: tasksSliceReducers,
  },
});

export default store;
