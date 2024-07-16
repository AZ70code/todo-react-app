import React from "react";
import Select from "react-select";
import style from "./filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterTodos, todoFilter } from "../../redux/todosSlice";

const Filter = () => {
  const options = [
    { value: "all", label: "All" },
    { value: "Task", label: "Task" },
    { value: "Idea", label: "Idea" },
    { value: "Random Thought", label: "Random Thought" },
  ];
	const filter = useSelector(filterTodos);
	const dispatch = useDispatch();

  return (
    <div>
      <label className={style.title_label}>Select category</label>
      <Select
        className={style.select}
        setValue={filter.category}
        onChange={(e) => dispatch(todoFilter( {category: e.value}))}
        defaultValue={options[0]}
        options={options}
				name="category"
        theme={(theme) => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary25: "darkOrange",
            primary: "grey",
          },
        })}
      />
			<label className={style.title_label}>Select todos</label>
			<br />
      <label className={style.label}>
        <input type="radio" name="completed" value={'all'} defaultChecked onChange={(e) => dispatch(todoFilter( {completed: e.currentTarget.value}))} />
        &nbsp; all
      </label>
      <br />
      <label className={style.label}>
        <input type="radio" name="completed" value={true} onChange={(e) => dispatch(todoFilter( {completed: e.currentTarget.value}))} />
        &nbsp; completed
      </label>
      <br />
      <label className={style.label}>
        <input type="radio" name="completed" value={false} onChange={(e) => dispatch(todoFilter( {completed: e.currentTarget.value}))} />
        &nbsp; not completed
      </label>
    </div>
  );
};
export default Filter;
