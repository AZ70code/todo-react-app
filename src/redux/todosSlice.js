import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  addFetchTodo,
  completeFetchTodo,
  deleteFetchTodo,
  fetchTodos,
  todoFetchFromArchive,
  todoFetchToArchive,
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
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.archive = action.payload.filter((todo) => todo.archived);
        state.todos = action.payload.filter((todo) => !todo.archived);
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
      })
      .addCase(todoFetchToArchive.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id,
        );
        state.archive.push(action.payload);
      })
      .addCase(todoFetchFromArchive.fulfilled, (state, action) => {
        state.archive = state.archive.filter(
          (todo) => todo.id !== action.payload.id,
        );
        state.todos.push(action.payload);
      });
  },
});
export const filterTodos = (state) => state.todos.filter;
export const archiveTodos = (state) => state.todos.archive;
const allTodos = (state) => state.todos.todos;

export const selectTodos = createSelector(
  [allTodos, filterTodos],
  (todos, filter) => {
    const filteredTodos = () => {
      const filteredCompTodos = todos.filter((todo) => {
        if (filter.completed !== "all") {
          return todo.completed === JSON.parse(filter.completed);
        } else {
          return todo;
        }
      });
      const filteredCatTodos = filteredCompTodos.filter((todo) => {
        if (filter.category !== "all") {
          return todo.category === filter.category;
        } else return todo;
      });
      return filteredCatTodos;
    };
    return filteredTodos();
  },
);
export const todosStatus = (state) => state.todos.status;
export const todosError = (state) => state.todos.error;
export const { todoFilter } = todoSlice.actions;
export default todoSlice.reducer;
