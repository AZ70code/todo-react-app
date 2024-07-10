import React from "react";
import Select from "react-select";
import style from "./filter.module.css";

const Filter = ({ filterValue, onFilterCategory, onFilterCompleted }) => {
  const options = [
    { value: "all", label: "All" },
    { value: "Task", label: "Task" },
    { value: "Idea", label: "Idea" },
    { value: "Random Thought", label: "Random Thought" },
  ];

  return (
    <div>
      <label className={style.label}>Select category</label>
      <Select
        className={style.select}
        setValue={filterValue.category}
        onChange={onFilterCategory}
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
			<label className={style.label}>Select todos</label>
			<br />
      <label className={style.label}>
        <input type="radio" name="completed" value={'all'} defaultChecked onChange={onFilterCompleted} />
        &nbsp; all
      </label>
      <br />
      <label className={style.label}>
        <input type="radio" name="completed" value={true} onChange={onFilterCompleted} />
        &nbsp; completed
      </label>
      <br />
      <label className={style.label}>
        <input type="radio" name="completed" value={false} onChange={onFilterCompleted} />
        &nbsp; not completed
      </label>
    </div>
  );
};
export default Filter;
