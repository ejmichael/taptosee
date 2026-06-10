import { useEffect, useState, useCallback } from 'react'
import { FiSearch, FiUserX, FiUserCheck } from 'react-icons/fi'
import { getAllUsers, deactivateUser, reactivateUser } from '../../api/admin.js'
import Button from '../../components/Button.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    getAllUsers({ page, search: query, limit: 20 })
      .then((r) => { setUsers(r.data.users); setTotal(r.data.total); setPages(r.data.pages) })
      .finally(() => setLoading(false))
  }, [page, query])

  useEffect(() => { load() }, [load])

  const handleToggle = async (user) => {
    const fn = user.isActive ? deactivateUser : reactivateUser
    const r = await fn(user._id)
    setUsers((prev) => prev.map((u) => u._id === user._id ? r.data.user : u))
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Users <span className="text-base text-gray-400 font-normal">({total})</span></h1>
        <form onSubmit={(e) => { e.preventDefault(); setPage(1); setQuery(search) }} className="flex gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 w-52"
              placeholder="Search username or email" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button type="submit" size="sm" variant="outline">Search</Button>
        </form>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['User', 'Email', 'Joined', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={u.profilePicture || `https://ui-avatars.com/api/?name=${u.username}&background=7c3aed&color=fff&size=40`}
                          alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-gray-900">@{u.username}</p>
                          {u.isAdmin && <span className="text-xs bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full">Admin</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{u.emailAddress}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {u.isActive ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {!u.isAdmin && (
                        <button onClick={() => handleToggle(u)} className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${u.isActive ? 'text-red-500 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}>
                          {u.isActive ? <><FiUserX size={13} /> Deactivate</> : <><FiUserCheck size={13} /> Reactivate</>}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>Prev</Button>
              <span className="text-sm text-gray-500">Page {page} of {pages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === pages}>Next</Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
