import { useEffect, useState } from 'react'
import { FiUsers, FiLink, FiEye, FiMousePointer, FiUserPlus } from 'react-icons/fi'
import { getPlatformStats } from '../../api/admin.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

function Stat({ icon: Icon, label, value, color = 'text-violet-600' }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className={`${color} mb-3`}><Icon size={22} /></div>
      <p className="text-3xl font-bold text-gray-900">{value?.toLocaleString() ?? '—'}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  )
}

export default function PlatformStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPlatformStats().then((r) => setStats(r.data)).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Platform overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat icon={FiUsers} label="Total users" value={stats?.totalUsers} />
        <Stat icon={FiUsers} label="Active users" value={stats?.activeUsers} color="text-green-600" />
        <Stat icon={FiUserPlus} label="New (30 days)" value={stats?.recentSignups} color="text-blue-600" />
        <Stat icon={FiLink} label="Total links" value={stats?.totalLinks} color="text-orange-600" />
        <Stat icon={FiEye} label="Total views" value={stats?.totalViews} color="text-pink-600" />
        <Stat icon={FiMousePointer} label="Total clicks" value={stats?.totalClicks} color="text-teal-600" />
      </div>
    </div>
  )
}
