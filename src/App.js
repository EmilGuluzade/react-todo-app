import { useEffect, useState } from "react";
import "./App.css";
import Todos from "./components/Todos";
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState(false);

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
      setTodos([...todos, { id: uuidv4(), task: inputValue }]);
      setInputValue("");
     
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
let darkBody={
  backgroundColor: "#171823",
}
let dark={
  backgroundColor: "#25273d",
  color:"#b6b9d4"

}
let light={
  backgroundColor: "#fff",
  color:"black"
 }
  
  const changeTheme=()=>{
setIsDark(!isDark)
  }
  return (
    <div className="App" style={isDark ? darkBody :light} >
    <div className="bg-img"></div>
      <div className="container">
        <h1>TODO {isDark ? <i onClick={changeTheme} className="fa-solid fa-sun" style={{color:" #ffffff"}}></i>:<i onClick={changeTheme} style={{color:" #ffffff"}} className="fa-solid fa-moon"></i>}</h1>
        <div className="input" >
          <input style={isDark ? dark :light}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Create a new todo…"
          />
          <button onClick={addTodo} className="addBtn">
            Add
          </button>
        </div>
        <Todos setTodos={setTodos} style={ isDark ? dark :light}
          removeTodo={removeTodo}
          handleItemClick={handleItemClick}
          todos={todos}
        ></Todos>
      </div>
    </div>
  );
}

export default App;
