import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Login = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const [formData, setFormData] = useState({
        emailAddress: '',
        password: ''
    })

    const { user } = useAuthContext();

    const navigate = useNavigate();
    const location = useLocation()

    const redirectPath = location.state?.path || '/'

    const domain = window.location.href.includes('localhost') ? "http://localhost:5000" : "https://easy-outreach-platform.onrender.com";

        useEffect(() => {
            if(user) {
                navigate(`/dashboard/${user.username}`)
            }
    
        }, [user])

    const handleFormChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
           [e.target.name]: e.target.value
        }))
    }

    console.log(formData);
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true);
        setError(null);

        if(!formData.emailAddress || !formData.password) {
            alert("Please complete form to login")
        }

        try {

            const response = await axios.post(domain + '/api/user/user-login', formData);

            if(response.status === 201) {
                localStorage.setItem('user', JSON.stringify(response.data))
                dispatch({type: 'LOGIN', payload: response.data})
                console.log(response.data);
                

            } else if (response.status === 400) {
                    setError(response.data.message);
            }
            setIsLoading(false);
            
        } catch (error) {
            console.log(error);
            alert(error.message);
            setError(error);
            setIsLoading(false)
        }
    }

  return (
    <>
    <Navbar/>
    <div className="min-h-[90vh] w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-3">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Login to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleFormChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="text-sm w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate('/auth/register')}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Create one
          </span>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login