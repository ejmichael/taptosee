import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Tap To See 🚀</h1>
        <p className="text-gray-600 mb-6">Create your personal link page & share it anywhere!</p>
        <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Get Started
        </Link>
        <Link to="/login" className="text-blue-600 hover:text-blue-300 px-6 py-2 rounded-lg">
            Login
        </Link>
    </div>
  )
}

export default Home