import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
});
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await instance.get("/TABLE_CONTENT");
  return response.data;
});
export const addFetchTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await instance.post("/TABLE_CONTENT", todo);
  return response.data;
});
export const deleteFetchTodo = createAsyncThunk(
  "todos/deleteFetchTodo",
  async (todoId) => {
    const response = await instance.delete(`/TABLE_CONTENT/${todoId}`);
    if (response.status === 200) return todoId;
  },
);
export const editFetchTodo = createAsyncThunk(
  "todos/editFetchTodo",
  async (data) => {
    const response = await instance.patch(`/TABLE_CONTENT/${data.todoId}`, {
      content: data.value,
    });
    return response.data;
  },
);
export const completeFetchTodo = createAsyncThunk(
  "todos/completeFetchTodo",
  async (todoId, { getState }) => {
    const todo = getState().todos.todos.find((todo) => todo.id === todoId);
    const response = await instance.patch(`/TABLE_CONTENT/${todoId}`, {
      completed: !todo.completed,
    });
    return response.data;
  },
);
export const todoFetchToArchive = createAsyncThunk(
  "todos/todoFetchToggleArchive",
  async (todoId) => {
    const response = await instance.patch(`/TABLE_CONTENT/${todoId}`, {
      archived: true,
    });
    return response.data;
  },
);
export const todoFetchFromArchive = createAsyncThunk(
  "todos/todoFetchFromArchive",
  async (todoId) => {
    const response = await instance.patch(`/TABLE_CONTENT/${todoId}`, {
      archived: false,
    });
    return response.data;
  },
);
