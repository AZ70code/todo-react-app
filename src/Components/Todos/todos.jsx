import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  styled,
  tableCellClasses,
  Checkbox,
  IconButton,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const Todos = ({data}) => (
  <>
    <TableContainer component={Paper}>
      <Table size="small" aria-label="table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={30}>Nom.</StyledTableCell>
            <StyledTableCell width={50}>Completed</StyledTableCell>
            <StyledTableCell width={150}>Name</StyledTableCell>
            <StyledTableCell width={100}>Date</StyledTableCell>
            <StyledTableCell width={50}>Category</StyledTableCell>
            <StyledTableCell align="center">Text</StyledTableCell>
            <StyledTableCell width={150}>
              <CreateIcon />
              <FolderZipIcon />
              <DeleteIcon />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#eee" } }}>
                <TableCell sx={{ padding: 1 }} align="center">
                  {item.id}
                </TableCell>
                <TableCell sx={{ padding: 1 }} align="center">
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ padding: 1 }}>{item.name}</TableCell>
                <TableCell sx={{ padding: 1 }}>{item.created}</TableCell>
                <TableCell sx={{ padding: 1 }}>{item.category}</TableCell>
                <TableCell sx={{ padding: 1 }}>{item.content}</TableCell>
                <TableCell sx={{ padding: 1 }}>
                  <IconButton size="small" variant="outlined">
                    <CreateIcon color="success" />
                  </IconButton>
                  <IconButton size="small" variant="outlined">
                    <FolderZipIcon color="warning" />
                  </IconButton>
                  <IconButton size="small" variant="outlined">
                    <DeleteIcon color="error" />
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
export default Todos;
