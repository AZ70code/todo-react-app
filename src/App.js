import "./App.css";
import React, { useState } from "react";
import Container from "./Components/Container/container";
import Todos from "./Components/Todos/todos";
import json from "./db.json";
import Archive from "./Components/Archive/archive";
import ControlPanel from "./Components/ControlPanel/controlPanel";

const App = () => {
  const initialData = json.TABLE_CONTENT;
  const [data, setData] = useState(initialData);
  const [archive, setArchive] = useState([]);
  const [edit, setEdit] = useState({ disabled: true, id: null });
  // const [checked, setChecked] = useState(false);

  const total = data.length;
  const archived = archive.length;
  const completed = data.reduce(
    (acc, todo) => (todo.completed ? acc + 1 : acc),
    0,
  );

  const handleDelete = (todoId) => {
    setData(data.filter((todo) => todo.id !== todoId));
  };
  const handleToArchive = (todoId) => {
    setData(data.filter((todo) => todo.id !== todoId));
    setArchive([...archive, data.find((todo) => todo.id === todoId)]);
  };
  const handleFromArchive = (todoId) => {
    setArchive(archive.filter((todo) => todo.id !== todoId));
    setData([...data, archive.find((todo) => todo.id === todoId)]);
  };
  const handleEdit = (todoId) => {
    setEdit({ ...edit, ...{ disabled: false, id: todoId } });
  };
  const stopEditTodo = () => {
    setEdit({ ...edit, disabled: true });
  };
  const handleComplete = (todoId) => {
    setData(
      data.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    );
  };
  return (
    <div className="app">
      <Container>
        <Todos
          data={data}
          onDeleteTodo={handleDelete}
          onRemoveToArchive={handleToArchive}
          onEditTodo={handleEdit}
          stopEdit={stopEditTodo}
          disabled={edit.disabled}
          editId={edit.id}
          onComplete={handleComplete}
        />
        <ControlPanel total={total} archived={archived} completed={completed} />
        <Archive data={archive} onRemoveFromArchive={handleFromArchive} />
      </Container>
    </div>
  );
};

export default App;
