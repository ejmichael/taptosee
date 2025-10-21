import React, { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { FaChartBar, FaLink, FaCog, FaUser } from "react-icons/fa";

const Dashboard = () => {

  const { user } = useAuthContext()

  const navigate = useNavigate()

    useEffect(() => {
    if (!user) {
      navigate('/auth/register') // or '/login', depending on your flow
    }
  }, [user])

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:flex flex-col">
        <div className="flex flex-col items-center text-center">
          <img 
            src={user?.profilePicture || "https://via.placeholder.com/100"} 
            alt="profile" 
            className="w-16 h-16 rounded-full object-cover mb-3"
          />
          <h2 className="font-semibold">{user?.firstName} {user?.surname}</h2>
          <p className="text-gray-500 text-sm">@{user?.username}</p>
        </div>

        <nav className="mt-10 flex flex-col gap-4">
          <Link className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FaChartBar /> Analytics
          </Link>
          <Link className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FaLink /> My Links
          </Link>
          <Link className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FaUser /> Profile
          </Link>
          <Link className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FaCog /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-500 text-sm">Profile Views</p>
            <h3 className="text-2xl font-bold">{user?.clickCount || 0}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-500 text-sm">Total Links</p>
            <h3 className="text-2xl font-bold">{user?.links?.length || 0}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-500 text-sm">Social Profiles</p>
            <h3 className="text-2xl font-bold">{user?.socialMediaLinks?.length || 0}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-500 text-sm">Member Since</p>
            <h3 className="text-lg font-semibold">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "--"}
            </h3>
          </div>
        </div>

        {/* Analytics Placeholder */}
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Clicks Over Time</h2>
          <p className="text-gray-500">Chart will go here...</p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
