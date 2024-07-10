import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontWeight: 700,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 10,
		paddingRight: 10
  },
}));

const TableHeader = ({children}) => (
  <>
    <TableHead>
      <TableRow>
        <StyledTableCell width={30}>Nom.</StyledTableCell>
        <StyledTableCell width={30}>Compl.</StyledTableCell>
        <StyledTableCell width={150}>Name</StyledTableCell>
        <StyledTableCell width={150}>Date</StyledTableCell>
        <StyledTableCell width={50}>Category</StyledTableCell>
        <StyledTableCell align="center">Text</StyledTableCell>
        <StyledTableCell width={150} >
					{children}
        </StyledTableCell>
      </TableRow>
    </TableHead>
  </>
);

export default TableHeader;
