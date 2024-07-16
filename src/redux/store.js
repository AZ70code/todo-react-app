import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todosSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
export default store;
