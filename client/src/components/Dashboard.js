import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  async function getName() {
    try {
      const response = await fetch("/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.username);
    } catch (err) {
      console.error(err.message);
    }
  }

  const addTodo = (todo) => {
    setTodos(todos.concat(todo));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out succesfully");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Dashboard {name}</h1>
        <button className="btn btn-primary" onClick={() => logout()}>
          Logout
        </button>
        <InputTodo addTodo={addTodo} />
        <ListTodos todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
};

export default Dashboard;
