import "./App.css";
import React, { useState } from "react";
import Container from "./Components/Container/container";
import Todos from "./Components/Todos/todos";
import json from "./db.json";
import Archive from "./Components/Archive/archive";
import ControlPanel from "./Components/ControlPanel/controlPanel";
import ShortUniqueId from "short-unique-id";
import Modal from "./Components/Modal/modal";

const App = () => {
  const initialData = json.TABLE_CONTENT;
  const [data, setData] = useState(initialData);
  const [archive, setArchive] = useState([]);
  const [edit, setEdit] = useState({ disabled: true, id: null });
  const [isArchive, setIsArchive] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [filter, setFilter] = useState({ category: "all", completed: "all" });

  const total = data.length;
  const archived = archive.length;
  const completed = data.reduce(
    (acc, todo) => (todo.completed ? acc + 1 : acc),
    0,
  );
  const filteredTodos = () => {
    const filteredCompTodos = data.filter((todo) => {
      if (filter.completed !== "all") {
        return todo.completed === JSON.parse(filter.completed);
      } else return todo;
    });
    const filteredCatTodos = filteredCompTodos.filter((todo) => {
      if (filter.category !== "all") {
        return todo.category === filter.category;
      } else return todo;
    });

    return filteredCatTodos;
  };
  const filteredData = filteredTodos();

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
  const saveEditTodo = (todoId, value) => {
    setEdit({ ...edit, disabled: true });
    setData(
      data.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            content: value,
          };
        }
        return todo;
      }),
    );
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
  const showArchive = () => setIsArchive(!isArchive);
  const toggleModal = () => {
    setIsModal(!isModal);
  };
  const addTodo = (message) => {
    const uid = new ShortUniqueId();
    const todo = {
      name: message.name,
      category: message.category,
      content: message.text,
      created: message.date,
      dates: "",
      archived: false,
      completed: false,
      id: uid.rnd(),
    };
    setData([todo, ...data]);
    setIsModal(false);
  };
  const handleFilterCompleted = (e) => {
    setFilter({ ...filter, completed: e.currentTarget.value });
  };
  const handleFilterCategory = (e) => {
    setFilter({ ...filter, category: e.value });
  };

  return (
    <div className="app">
      {isModal && <Modal onSubmit={addTodo} onCloseModal={toggleModal} />}
      <Container>
        <h1>TODO List</h1>
        <ControlPanel
          total={total}
          archived={archived}
          completed={completed}
          onArchive={showArchive}
          onForm={toggleModal}
          onFilterCompleted={handleFilterCompleted}
          onFilterCategory={handleFilterCategory}
          filterValue={filter}
        />
        <Todos
          data={filteredData}
          onDeleteTodo={handleDelete}
          onRemoveToArchive={handleToArchive}
          onEditTodo={handleEdit}
          stopEdit={saveEditTodo}
          disabled={edit.disabled}
          editId={edit.id}
          onComplete={handleComplete}
        />
        {isArchive && (
          <Archive data={archive} onRemoveFromArchive={handleFromArchive} />
        )}
      </Container>
    </div>
  );
};

export default App;
