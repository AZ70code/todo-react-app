import "./App.css";
import React, { useEffect, useState } from "react";
import Container from "./Components/Container/container";
import Todos from "./Components/Todos/todos";
import Archive from "./Components/Archive/archive";
import ControlPanel from "./Components/ControlPanel/controlPanel";
import Modal from "./Components/Modal/modal";
import todosApi from "./Components/Api/todos-api";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [archive, setArchive] = useState([]);
  const [edit, setEdit] = useState({ disabled: true, id: null });
  const [isArchive, setIsArchive] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [filter, setFilter] = useState({ category: "all", completed: "all" });
  useEffect(() => {
    todosApi
      .fetchTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => console.log(error));
  }, []);

  const total = todos.length;
  const archived = archive.length;
  const completed = todos.reduce(
    (acc, todo) => (todo.completed ? acc + 1 : acc),
    0,
  );
  const filteredTodos = () => {
    const filteredCompTodos = todos.filter((todo) => {
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
    todosApi
      .deleteTodo(todoId)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      })
      .catch((error) => console.log(error));
  };
  const handleToArchive = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
    setArchive([...archive, todos.find((todo) => todo.id === todoId)]);
  };
  const handleFromArchive = (todoId) => {
    setArchive(archive.filter((todo) => todo.id !== todoId));
    setTodos([...todos, archive.find((todo) => todo.id === todoId)]);
  };
  const handleEdit = (todoId) => {
    setEdit({ ...edit, ...{ disabled: false, id: todoId } });
  };
  const saveEditTodo = (todoId, value) => {
    todosApi
      .editTodo(todoId, { content: value })
      .then(() => {
        setEdit({ ...edit, disabled: true });
      })
      .catch((error) => console.log(error));

    // setTodos(
    //   todos.map((todo) => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         content: value,
    //       };
    //     }
    //     return todo;
    //   }),
    // );
  };
  const handleComplete = (todoId) => {
    const todo = todos.find(({ id }) => id === todoId);
    const { completed } = todo;
    todosApi
      .completeTodo(todoId, { completed: !completed })
      .then((data) => {
        setTodos(
          todos.map((todo) => {
            if (todo.id === data.id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            }
            return todo;
          }),
        );
      })
      .catch((error) => console.log(error));
  };
  const showArchive = () => setIsArchive(!isArchive);
  const toggleModal = () => {
    setIsModal(!isModal);
  };
  const addTodo = (message) => {
    const todoObj = {
      name: message.name,
      category: message.category,
      content: message.text,
      created: message.date,
      dates: "",
      archived: false,
      completed: false,
    };
    todosApi
      .addTodo(todoObj)
      .then((todo) => {
        setTodos([...todos, todo]);
        toggleModal();
      })
      .catch((error) => console.log(error));
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
