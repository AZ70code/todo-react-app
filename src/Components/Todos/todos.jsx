import React from "react";
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

const Todos = ({
  data,
  onDeleteTodo,
  onRemoveToArchive,
  onEditTodo,
  stopEdit,
  disabled,
  editId,
  onComplete,
}) => {
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
            {data.map((item, index) => {
              return (
                <TableRow key={item.id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#eee" } }}>
                  <TableCell sx={{ padding: 1 }} align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ padding: 1 }} align="center">
                    <Completed
                      onChecked={item.completed}
                      disabled={false}
                      onChange={() => onComplete(item.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: 1 }}>{item.name}</TableCell>
                  <TableCell sx={{ padding: 1 }}>{item.created}</TableCell>
                  <TableCell sx={{ padding: 1 }}>{item.category}</TableCell>
                  <TableCell sx={{ padding: 1 }}>
                    <InputTodo
                      text={item.content}
                      disabled={item.id === editId ? disabled : true}
                      stopEdit={(e) => stopEdit(item.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: 1 }}>
                    <IconButton size="small" variant="outlined" onClick={() => onEditTodo(item.id)}>
                      <Tooltip title="Edit">
                        <CreateIcon color="success" aria-label="edit todo button" />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      size="small"
                      variant="outlined"
                      onClick={() => onRemoveToArchive(item.id)}
                    >
                      <Tooltip title="Archive">
                        <FolderZipIcon color="warning" aria-label="archive todo button"/>
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      size="small"
                      variant="outlined"
                      onClick={() => onDeleteTodo(item.id)}
                    >
                      <Tooltip title="Delete">
                        <DeleteIcon color="error" aria-label="delete todo button"/>
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
