import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
});
const fetchTodos = () => {
  return instance.get("/TABLE_CONTENT").then((response) => response.data);
};
const addTodo = (todo) => {
  return instance
    .post("/TABLE_CONTENT", todo)
    .then((response) => response.data);
};
const deleteTodo = (todoId) => {
  return instance
    .delete(`/TABLE_CONTENT/${todoId}`)
    .then((response) => response.data);
};
const editTodo = (todoId, update) => {
  return instance
    .patch(`/TABLE_CONTENT/${todoId}`, update)
    .then((response) => response.data);
};
const completeTodo = (todoId, update) => {
  return instance
    .patch(`/TABLE_CONTENT/${todoId}`, update)
    .then((response) => response.data);
};
const todosApi = { fetchTodos, addTodo, deleteTodo, editTodo, completeTodo };
export default todosApi;
