import { useState } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import { FiLink, FiShare2, FiLayout, FiBarChart2, FiUser, FiSettings, FiExternalLink, FiMenu, FiX } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext.jsx'

const NAV = [
  { to: '/dashboard/links', icon: FiLink, label: 'Links' },
  { to: '/dashboard/socials', icon: FiShare2, label: 'Socials' },
  { to: '/dashboard/appearance', icon: FiLayout, label: 'Appearance' },
  { to: '/dashboard/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/dashboard/profile', icon: FiUser, label: 'Profile' },
  { to: '/dashboard/settings', icon: FiSettings, label: 'Settings' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-semibold text-[var(--color-text)] hover:opacity-80 transition-opacity duration-150">
      <div className="w-7 h-7 bg-[var(--color-accent)] rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="white" fillOpacity="0.9" />
          <circle cx="7" cy="7" r="2.5" fill="white" />
        </svg>
      </div>
      <span className="text-[15px] tracking-tight">TapToSee</span>
    </Link>
  )
}

function NavItem({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink to={to} onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 h-10 rounded-[var(--radius-md)] text-sm font-medium transition-colors duration-100 ${
          isActive
            ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)]'
            : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)]'
        }`
      }
    >
      <Icon size={16} className="flex-shrink-0" />
      {label}
    </NavLink>
  )
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const avatarUrl = user?.profilePicture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.username || 'U')}&background=4f46e5&color=fff&size=80`

  const SidebarFooter = ({ onClose }) => (
    <div className="px-3 py-4 border-t border-[var(--color-border)] space-y-0.5">
      <Link to={`/${user?.username}`} target="_blank" rel="noopener noreferrer" onClick={onClose}
        className="flex items-center gap-2.5 px-3 h-10 rounded-[var(--radius-md)] text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)] transition-colors duration-100">
        <FiExternalLink size={16} className="flex-shrink-0" />
        View my page
      </Link>
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <img src={avatarUrl} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[var(--color-text)] truncate leading-none mb-1">{user?.displayName || user?.username}</p>
          <button onClick={logout} className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-100 leading-none">Sign out</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[248px] bg-[var(--color-surface)] border-r border-[var(--color-border)] fixed h-full z-20">
        <div className="h-16 flex items-center px-5 border-b border-[var(--color-border)]">
          <Logo />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => <NavItem key={item.to} {...item} />)}
        </nav>
        <SidebarFooter />
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[var(--color-surface)] border-b border-[var(--color-border)] z-30 flex items-center justify-between px-4">
        <Logo />
        <button onClick={() => setOpen(true)}
          className="p-2 rounded-[var(--radius-md)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)] transition-colors duration-100">
          <FiMenu size={20} />
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }} className="md:hidden fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-[248px] bg-[var(--color-surface)] z-50 flex flex-col shadow-xl">
              <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--color-border)]">
                <Logo />
                <button onClick={() => setOpen(false)}
                  className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)] transition-colors">
                  <FiX size={18} />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {NAV.map((item) => <NavItem key={item.to} {...item} onClick={() => setOpen(false)} />)}
              </nav>
              <SidebarFooter onClose={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="flex-1 md:ml-[248px] pt-14 md:pt-0 min-h-screen">
        <div className="max-w-[960px] mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
