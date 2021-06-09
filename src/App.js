import React, { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Todo from "./Todo.js";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  REMOVE_TODO: "remove-todo",
  REMOVE_ALL_COMPLETED: "remove-all-completed",
};

function reducer(state, action) {
  const { allTodos, activeTodos } = state;
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        allTodos: [...allTodos, newTodo(action.payload.name)],
        activeTodos: [...activeTodos, newTodo(action.payload.name)],
      };

    case ACTIONS.TOGGLE_TODO:
      const updatedTodo = allTodos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      const completedTodos = updatedTodo.filter(
        (todo) => todo.completed === true
      );
      const activedTodos = updatedTodo.filter(
        (todo) => todo.completed === false
      );
      return {
        ...state,
        allTodos: updatedTodo,
        completeTodos: completedTodos,
        activeTodos: activedTodos,
      };

    case ACTIONS.REMOVE_TODO:
      const deletedTodos = allTodos.filter(
        (todo) => todo.id !== action.payload.id
      );
      const deletedCompletedTodos = allTodos.filter(
        (todo) => todo.id !== action.payload.id && todo.completed === true
      );
      const deletedActiveTodos = allTodos.filter(
        (todo) => todo.id !== action.payload.id && todo.completed === false
      );

      return {
        ...state,
        allTodos: deletedTodos,
        completeTodos: deletedCompletedTodos,
        activeTodos: deletedActiveTodos,
      };

    case ACTIONS.REMOVE_ALL_COMPLETED:
      const notCompletedTodos = allTodos.filter(
        (todo) => todo.completed === false
      );
      return {
        ...state,
        allTodos: notCompletedTodos,
        completeTodos: [],
      };
    default:
      return state;
  }
}

function newTodo(name) {
  return { id: uuidv4(), name: name, completed: false };
}

function App() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    allTodos: [],
    completeTodos: [],
    activeTodos: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  };

  const { allTodos, completeTodos, activeTodos } = state;
  return (
    <>
      <div className="border container d-flex flex-column justify-content-center align-items-center">
        <form className="container-fluid" onSubmit={handleSubmit}>
          <input
            className="container-fluid"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </form>
        <div>
          <h2>All todos</h2>
          {allTodos &&
            allTodos.map((todo) => {
              return (
                <Todo key={`${todo.id}all`} todo={todo} dispatch={dispatch} />
              );
            })}
        </div>
        <div>
          <h2>Complete Todos</h2>
          {completeTodos &&
            completeTodos.map((todo) => {
              return (
                <Todo
                  key={`${todo.id}completed`}
                  todo={todo}
                  dispatch={dispatch}
                />
              );
            })}
        </div>
        <div>
          <h2>Active Todos</h2>
          {activeTodos &&
            activeTodos.map((todo) => {
              return (
                <Todo
                  key={`${todo.id}active`}
                  todo={todo}
                  dispatch={dispatch}
                />
              );
            })}
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            dispatch({ type: ACTIONS.REMOVE_ALL_COMPLETED });
          }}
        >
          Clear all completed
        </button>
        <span>{`${activeTodos.length} todos left`}</span>
      </div>
    </>
  );
}

export default App;
