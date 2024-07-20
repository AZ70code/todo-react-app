import "./App.css";
import React, { useEffect, useState } from "react";
import Container from "./Components/Container/container";
import Todos from "./Components/Todos/todos";
import Archive from "./Components/Archive/archive";
import ControlPanel from "./Components/ControlPanel/controlPanel";
import Modal from "./Components/Modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { todosError, todosStatus } from "./redux/todosSlice";
import { fetchTodos } from "./Components/Api/todos-api";

const App = () => {
  const [isArchive, setIsArchive] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const dispatch = useDispatch();
  const status = useSelector(todosStatus);
  const error = useSelector(todosError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const showArchive = () => setIsArchive(!isArchive);
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="app">
      {isModal && <Modal onCloseModal={toggleModal} />}
      <Container>
        <ControlPanel onArchive={showArchive} onForm={toggleModal} />
        {status === "loading" && <h2>Loading...</h2>}
        {status === "failed" && <h2>{error}</h2>}
        {status === "succeeded" && <Todos />}
        {isArchive && <Archive />}
      </Container>
    </div>
  );
};

export default App;
