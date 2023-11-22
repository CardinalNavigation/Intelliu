import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg formPanel flex flex-col items-center"
      onSubmit={login}
    >
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      {errors.loginMessage && (
        <h3 className="text-red-500" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className="mb-4 w-full">
        <label htmlFor="username" className="block text-gray-700">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-1 p-2 w-full border rounded-md bg-gray-100"
          />
        </label>
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="password" className="block text-gray-700">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 p-2 w-full border rounded-md bg-gray-100"
          />
        </label>
      </div>
      <div className="w-full flex justify-end">
        <input
          className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
          type="submit"
          name="submit"
          value="Login"
        />
      </div>
    </form>
  );
}

export default LoginForm;
