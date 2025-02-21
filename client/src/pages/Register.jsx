import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const domain = window.location.href.includes('localhost') ? "http://localhost:5000" : "https://miranda-fitness-backend.onrender.com";

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const redirectPath = location.state?.path || '/';
  const { firstName, surname, phoneNumber, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      //const response = await axios.post(domain + '/api/user/create-user', { firstName, surname, phoneNumber, email, password });
      //const user = response.data;
      //localStorage.setItem('user', JSON.stringify(user));
      //navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  return (
    <div className='w-full h-[calc(100vh-80px)] bg-gradient-to-b from-indigo-600 to-purple-700 py-12'>
      <div className="max-w-lg mx-auto flex-col shadow-lg rounded-xl w-[90%] md:w-[50%] p-6 bg-white">
        <div className="flex items-center gap-2 justify-center mb-4">
          <span className='font-semibold text-3xl text-gradient-to-r from-pink-500 to-yellow-400'>Create an Account</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="sm:w-full md:w-1/2">
              <input
                type="text"
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="firstName"
                id='firstName'
                value={firstName}
                placeholder="First Name"
                onChange={handleChange}
              />
            </div>
            <div className="sm:w-full md:w-1/2">
              <input
                type="text"
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="surname"
                id='surname'
                value={surname}
                placeholder="Surname"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="phoneNumber"
              id='phoneNumber'
              value={phoneNumber}
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="email"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="email"
              id='email'
              value={email}
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="password"
              id='password'
              value={password}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div className="my-4">
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:shadow-md focus:outline-none">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
