import React from "react";
import style from "./form.module.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addFetchTodo } from "../Api/todos-api";
import { nanoid } from "@reduxjs/toolkit";

const Form = ({ onCloseModal }) => {
  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");

  const dispatch = useDispatch();
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleText = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      id: nanoid(),
      name,
      category,
      content: content,
      completed: false,
      created: new Date().toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    if (name && category && content) {
      dispatch(addFetchTodo(message));
      setCategory("");
      setName("");
      setContent("");
      onCloseModal();
    } else {
      alert("Fill out all fields of the form to create new note");
    }
  };
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <TextField
            className={style.name}
            id="name"
            label="Input todo name"
            onChange={handleName}
            value={name}
          />
        </FormControl>
      </Box>
      <br />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Category</InputLabel>
          <Select
            className={style.category}
            labelId="select-label"
            id="demo-simple-select"
            label="Category"
            value={category}
            onChange={handleChangeCategory}
          >
            <MenuItem value={"Task"}>Task</MenuItem>
            <MenuItem value={"Idea"}>Idea</MenuItem>
            <MenuItem value={"Random Thought"}>Random Thought</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <TextField
            className={style.message}
            id="text"
            label="Input todo text"
            multiline
            rows={4}
            onChange={handleText}
            value={content}
          />
        </FormControl>
      </Box>
      <br />
      <Stack className={style.btns} direction="row" spacing={2}>
        <Button
          color="error"
          children="CREATE NOTE"
          variant="contained"
          size="large"
          type="submit"
        />
        <Button
          color="success"
          children="CLOSE"
          variant="contained"
          size="large"
          type="button"
          onClick={onCloseModal}
        />
      </Stack>
    </form>
  );
};
export default Form;
