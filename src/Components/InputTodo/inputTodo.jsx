import React, { useState } from "react";
import style from "./inputTodo.module.css";

const InputTodo = ({ text, disabled, stopEdit }) => {
  const [textTodo, setTextTodo] = useState(text);
  const handleChange = (e) => {
    let value = e.target.value;
    setTextTodo(value);
  };
  return (
    <div>
			{disabled ? textTodo :
      <textarea
        rows={5}
        className={style.input}
        type="text"
        value={textTodo}
        onChange={handleChange}
        disabled={disabled}
        onBlur={stopEdit}
      />}
    </div>
  );
};
export default InputTodo;
