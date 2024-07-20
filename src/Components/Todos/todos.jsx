import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  IconButton,
  Tooltip,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DeleteIcon from "@mui/icons-material/Delete";
import InputTodo from "../InputTodo/inputTodo";
import TableHeader from "../Table/tableHeader";
import Completed from "../completed";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "../../redux/todosSlice";
import {
  completeFetchTodo,
  deleteFetchTodo,
  editFetchTodo,
  todoFetchToArchive,
} from "../Api/todos-api";

const Todos = () => {
  const [edit, setEdit] = useState({ disabled: true, id: null });

  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const handleEdit = (todoId) => {
    setEdit({ ...edit, ...{ disabled: false, id: todoId }});
  };
  const handleBlur = (todoId, value) => {
    setEdit({ ...edit, disabled: true, id: todoId });
    const editData = { todoId, value };
    dispatch(editFetchTodo(editData));
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
        <Table size="small" aria-label="table">
          <TableHeader>
            <CreateIcon />
            <FolderZipIcon />
            <DeleteIcon />
          </TableHeader>
          <TableBody>
            {todos.map((item, index) => {
              return (
                <TableRow key={item.id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#eee" } }}>
                  <TableCell sx={{ padding: 1 }} align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ padding: 1 }} align="center">
                    <Completed
                      onChecked={item.completed}
                      disabled={false}
                      onChange={() => dispatch(completeFetchTodo(item.id))}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: 1 }}>{item.name}</TableCell>
                  <TableCell sx={{ padding: 1 }}>{item.created}</TableCell>
                  <TableCell sx={{ padding: 1 }}>{item.category}</TableCell>
                  <TableCell sx={{ padding: 1 }}>
                    <InputTodo
                      text={item.content}
                      disabled={item.id === edit.id ? edit.disabled : true}
                      stopEdit={(e) => handleBlur(item.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: 1 }}>
                    <IconButton size="small" variant="outlined" onClick={() => handleEdit(item.id)}>
                      <Tooltip title="Edit">
                        <CreateIcon color="success" aria-label="edit todo button" />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      size="small"
                      variant="outlined"
                      onClick={() => dispatch(todoFetchToArchive(item.id, false))}
                    >
                      <Tooltip title="Archive">
                        <FolderZipIcon color="warning" aria-label="archive todo button" />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      size="small"
                      variant="outlined"
                      onClick={() => dispatch(deleteFetchTodo(item.id))}
                    >
                      <Tooltip title="Delete">
                        <DeleteIcon color="error" aria-label="delete todo button" />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Todos;
