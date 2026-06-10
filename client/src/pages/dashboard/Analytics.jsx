import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FiEye, FiMousePointer, FiLink, FiTrendingUp } from 'react-icons/fi'
import { getAnalytics } from '../../api/analytics.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-5">
      <p className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
        <Icon size={12} className="flex-shrink-0" />{label}
      </p>
      <p className="text-3xl font-semibold text-[var(--color-text)] leading-none">{value?.toLocaleString() ?? '—'}</p>
      {sub && <p className="text-xs text-[var(--color-muted)] mt-2">{sub}</p>}
    </div>
  )
}

const chartTooltipStyle = {
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  fontSize: 12,
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}

const PERIODS = [
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
]

export default function Analytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(30)

  useEffect(() => {
    setLoading(true)
    getAnalytics(days).then((r) => setData(r.data)).finally(() => setLoading(false))
  }, [days])

  if (loading) return <LoadingSpinner />

  const viewData = data?.views?.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    Views: d.views,
    Unique: d.uniqueViews,
  })) || []

  const linkData = data?.links?.filter((l) => l.clickCount > 0).map((l) => ({
    name: l.title.length > 18 ? l.title.slice(0, 18) + '…' : l.title,
    Clicks: l.clickCount,
  })) || []

  return (
    <div className="max-w-[800px] space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">Analytics</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">How your page is performing</p>
        </div>
        <div className="flex items-center bg-[var(--color-surface-raised)] rounded-[var(--radius-md)] p-0.5">
          {PERIODS.map((p) => (
            <button key={p.value} onClick={() => setDays(p.value)}
              className={`px-3 h-7 rounded-[var(--radius-sm)] text-xs font-medium transition-colors duration-100 ${
                days === p.value
                  ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={FiEye} label="Page views" value={data?.totals?.views} sub={`Last ${days} days`} />
        <StatCard icon={FiMousePointer} label="Link clicks" value={data?.totals?.clicks} sub="All time" />
        <StatCard icon={FiLink} label="Active links" value={data?.links?.filter(l => l.isActive).length} sub={`of ${data?.links?.length} total`} />
        <StatCard icon={FiTrendingUp} label="Avg / day" value={data?.totals?.views ? Math.round(data.totals.views / days) : 0} sub="Views per day" />
      </div>

      {viewData.length > 0 ? (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6">
          <h2 className="text-sm font-semibold text-[var(--color-text)] mb-5">Page views</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={viewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--color-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line type="monotone" dataKey="Views" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Unique" stroke="var(--color-accent)" strokeWidth={1.5} dot={false} strokeDasharray="4 3" strokeOpacity={0.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border border-dashed border-[var(--color-border)] rounded-[var(--radius-xl)] text-center">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] flex items-center justify-center mb-3">
            <FiEye size={18} className="text-[var(--color-muted)]" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text)]">No view data yet</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">Share your profile link to start tracking</p>
        </div>
      )}

      {linkData.length > 0 && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6">
          <h2 className="text-sm font-semibold text-[var(--color-text)] mb-5">Clicks per link</h2>
          <ResponsiveContainer width="100%" height={linkData.length * 36 + 20}>
            <BarChart data={linkData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-muted)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--color-text)' }} axisLine={false} tickLine={false} width={130} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="Clicks" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {data?.topReferrers?.length > 0 && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6">
          <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">Top referrers</h2>
          <div className="divide-y divide-[var(--color-border)]">
            {data.topReferrers.map((r) => (
              <div key={r.referrer} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-[var(--color-muted)] truncate">{r.referrer || 'Direct'}</span>
                <span className="font-medium text-[var(--color-text)] ml-4 flex-shrink-0">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
