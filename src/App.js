import "./App.css";
import React from "react";
import Container from "./Components/Container/container";
import Todos from "./Components/Todos/todos";
import json from "./db.json";

const App = () => (
  <div className="app">
    <Container>
      <Todos data={json.TABLE_CONTENT} />
    </Container>
  </div>
);

export default App;
