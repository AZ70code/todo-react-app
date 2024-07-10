import React from "react";
import style from "./controlPanel.module.css";
import { Button, Stack } from "@mui/material";
import Filter from "../Filter/filter";

const ControlPanel = ({
  total,
  archived,
  completed,
  onArchive,
  onForm,
  filterValue,
  onFilterCompleted,
  onFilterCategory,
}) => {
  return (
    <div className={style.control}>
      <div className={style.inner}>
        <div className={style.info}>
          <div className={style.output}>
            <h2 className={style.title}>Todo status</h2>
            <p>Total todo: {total}</p>
            <p>Completed: {completed}</p>
            <p>Archived: {archived}</p>
          </div>
          <div className={style.border}></div>
          <div className={style.filter}>
            <h2 className={style.title}>Filter</h2>
            <Filter
              filterValue={filterValue}
              onFilterCompleted={onFilterCompleted}
              onFilterCategory={onFilterCategory}
            />
          </div>
        </div>
        <div>
          <h1 className={style.title}>TODO List</h1>
        </div>
        <div >
          <Stack className={style.buttongroup} direction="column" spacing={2}>
            <Button
              color="success"
              children="ADD NOTE"
              variant="contained"
              size="large"
              onClick={onForm}
            />
            <Button color="warning" variant="contained" size="large" onClick={onArchive}>
              ARCHIV
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};
export default ControlPanel;
