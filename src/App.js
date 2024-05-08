import { useEffect, useState } from "react";
import "./App.css";
import Todos from "./components/Todos";
let id = 0;
function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: id, task: inputValue }]);
      setInputValue("");
      id++;
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleItemClick = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  return (
    <div className="App">
      <div className="container">
        <h1>TODO</h1>
        <div className="input">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Create a new todo…"
          />
          <button onClick={addTodo} className="addBtn">
            Add
          </button>
        </div>
        <Todos
          removeTodo={removeTodo}
          handleItemClick={handleItemClick}
          todos={todos}
        ></Todos>
      </div>
    </div>
  );
}

export default App;
