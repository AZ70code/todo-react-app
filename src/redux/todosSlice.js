import { createSlice } from "@reduxjs/toolkit";
import {
  addFetchTodo,
  completeFetchTodo,
  deleteFetchTodo,
  fetchTodos,
} from "../Components/Api/todos-api";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    archive: [],
    filter: {
      completed: "all",
      category: "all",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    todoToArchive(state, action) {
      state.archive.push(
        state.todos.find((todo) => todo.id === action.payload),
      );
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    todoFromArchive(state, action) {
      state.todos.push(
        state.archive.find((todo) => todo.id === action.payload),
      );
      state.archive = state.archive.filter(
        (todo) => todo.id !== action.payload,
      );
    },
    todoFilter: {
      reducer(state, action) {
        if (action.payload.completed) {
          state.filter.completed = action.payload.completed;
        }
        if (action.payload.category) {
          state.filter.category = action.payload.category;
        }
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addFetchTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteFetchTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(completeFetchTodo.fulfilled, (state, action) => {
        state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.completed = !todo.completed;
          }
          return todo;
        });
      });
  },
});
export const filterTodos = (state) => state.todos.filter;
export const archiveTodos = (state) => state.todos.archive;
export const selectTodos = (state) => state.todos.todos;
export const todosStatus = (state) => state.todos.status;
export const todosError = (state) => state.todos.error;
export const {
  addTodo,
  deleteTodo,
  completedTodo,
  todoToArchive,
  todoFromArchive,
  todoEdit,
  todoFilter,
} = todoSlice.actions;
export default todoSlice.reducer;
