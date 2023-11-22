import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email,
        role,
      },
    });
    setSuccessMessage('Registration successful!');
  };

  const handleHover = () => {
    setUsername('Bob Robertson');
    setPassword("1234")
    setEmail("Bob@bobtech.net")
  }

  return (
    <form className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg formPanel" onSubmit={registerUser}>
      <h2 className="text-3xl font-bold mb-4">Register User</h2>
      {errors.registrationMessage && (
        <h3 className="text-red-500" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      {successMessage && (
        <h3 className="text-green-500" role="alert">
          {successMessage}
        </h3>
      )}
      <div className="mb-4">
        <label onMouseEnter={handleHover} htmlFor="username" className="block text-gray-700">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            className="mt-1 p-2 block w-full border rounded-md bg-gray-100"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 p-2 block w-full border rounded-md bg-gray-100"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 p-2 block w-full border rounded-md bg-gray-100"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700">
          User:
          <select
            type="dropdown"
            name="role"
            value={role}
            required
            onChange={(event) => setRole(event.target.value)}
            className="mt-1 p-2 block w-full border rounded-md bg-gray-100"
          >
            <option value="client">Client</option>
            <option value="intelliu">IntelliU Admin</option>
          </select>
        </label>
      </div>
      <div className="flex justify-end"> {/* Use flexbox to align the button to the right */}
        <button
          className="btn bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-700"
          type="submit"
        >
          Register

        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
