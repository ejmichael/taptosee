import { Link } from 'react-router-dom'
import { FiZap } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FiZap className="text-white" size={28} />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl font-semibold text-gray-700 mb-2">Page not found</p>
        <p className="text-gray-500 mb-8">This profile doesn't exist or has been removed.</p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:opacity-90 transition-all">
            Go home
          </Link>
          <Link to="/auth/register" className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all">
            Create your page
          </Link>
        </div>
      </div>
    </div>
  )
}
