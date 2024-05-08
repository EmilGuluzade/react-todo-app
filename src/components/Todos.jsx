import React, { useState } from "react";
import "./Todos.css";
const Todos = ({ removeTodo, todos, handleItemClick }) => {
  const [filter, setFilter] = useState("all");
  const newTodos = todos.filter((todo) => {
    if (filter == "active") {
      return !todo.completed;
    } else if (filter == "completed") {
      return todo.completed;
    } else {
      return true;
    }
  });
  return (
    <>
      <ul className="todos">
        {newTodos.map((item, index) => (
          <li key={index}>
            <input
              onClick={() => {
                handleItemClick(item.id);
              }}
              className="checkbox"
              checked={item.completed}
              type="checkbox"
            />
            {item.task}
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                removeTodo(item.id);
              }}
            ></i>
          </li>
        ))}
      </ul>
      <div className="todos-footer">
        <p className="todos-footer-left">{todos.length} items left</p>
        <p className="todos-footer-center">
          <span
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </span>
          <span
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </span>
          <span
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </span>
        </p>
        <p className="todos-footer-left">Clear Completed</p>
      </div>
    </>
  );
};

export default Todos;
