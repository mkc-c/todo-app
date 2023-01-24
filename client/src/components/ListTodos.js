import React, { useEffect } from "react";

import EditTodo from "./EditTodo";

function ListTodos({ todos, setTodos }) {
  async function getTodos() {
    const res = await fetch("/todos", {
      method: "GET",
      headers: { token: localStorage.token },
    });

    const todoArray = await res.json();

    setTodos(todoArray);
  }

  const editTodo = (id, description) => {
    setTodos(
      todos.map((todo) => {
        if (id === todo.id) return { id, description };
        return todo;
      })
    );
  };

  async function deleteTodo(id) {
    try {
      const res = await fetch(`/todos/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} editTodo={editTodo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ListTodos;
