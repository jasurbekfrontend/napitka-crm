import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Route, Routes } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const api = "https://663f22bfe3a7c3218a4c2f6f.mockapi.io/users";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(api)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []); // Keep this empty array to run only once on mount

  const signup = (data) => {
    const existUsername = users.some((item) => item.username === data.username);

    if (existUsername) {
      alert("Bunday username mavjud");
      return;
    }

    axios
      .post(api, data)
      .then(() => {
        alert("Hisob yaratildi");
        localStorage.setItem("user", JSON.stringify(data));
        reset();
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(signup)}>
        <b>Ro'yhatdan o'tish</b>
        <input placeholder="Username" type="text" {...register("username")} />
        <input placeholder="Parol" type="password" {...register("password")} />
        <button type="submit">Hisob yaratish</button>
      </form>
    </div>
  );
};

export default Login;
