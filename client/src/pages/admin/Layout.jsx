import { Outlet, NavLink, Link } from 'react-router-dom'
import { FiUsers, FiBarChart2, FiZap, FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminLayout() {
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 fixed h-full">
        <div className="p-5 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 font-bold text-base">
            <div className="w-7 h-7 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <FiZap className="text-white" size={13} />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { to: '/admin/stats', icon: FiBarChart2, label: 'Stats' },
            { to: '/admin/users', icon: FiUsers, label: 'Users' },
          ].map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-violet-50 text-violet-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Icon size={16} />{label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
            <FiArrowLeft size={14} /> Back to dashboard
          </Link>
        </div>
      </aside>
      <main className="md:ml-60 flex-1 p-6"><Outlet /></main>
    </div>
  )
}
