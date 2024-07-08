import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  IconButton,
} from "@mui/material";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import InputTodo from "../InputTodo/inputTodo";
import TableHeader from "../Table/tableHeader";
import Completed from "../completed";

const Archive = ({data, onRemoveFromArchive}) => (
  <>
			<h2>Archive List</h2>
    <TableContainer component={Paper}>
      <Table size="small" aria-label="table">
        <TableHeader>
          <FolderZipIcon />
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={item.id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#eee" }}}>
                <TableCell sx={{ padding: 1 }} align="center">
                  {index + 1}
                </TableCell>
                <TableCell sx={{ padding: 1 }} align="center">
									<Completed onChecked={item.completed} disabled={true} />
                </TableCell>
                <TableCell sx={{ padding: 1 }}>{item.name}</TableCell>
                <TableCell sx={{ padding: 1 }}>{item.created}</TableCell>
                <TableCell sx={{ padding: 1 }}>{item.category}</TableCell>
                <TableCell sx={{ padding: 1 }}>
                  <InputTodo text={item.content} disabled={true}/>
                </TableCell>
                <TableCell sx={{ padding: 1 }}>
                  <IconButton
                    size="small"
                    variant="outlined"
										onClick={() => onRemoveFromArchive(item.id)}
                  >
                    <FolderZipIcon color="warning" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);
export default Archive;