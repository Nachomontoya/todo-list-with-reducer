import React from "react";
import { ACTIONS } from "./App.js";

function Todo({ todo, dispatch }) {
  return (
    <>
      <input
        type="checkbox"
        checked={todo.completed === true ? true : false}
        onChange={() =>
          dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
        }
      />
      <span style={{ color: todo.completed ? "#AAA" : "#000" }}>
        {todo.name}
      </span>
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todo.id } })
        }
      >
        delete
      </button>
    </>
  );
}

export default Todo;
