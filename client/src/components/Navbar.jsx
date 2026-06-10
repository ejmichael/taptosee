import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'
import Button from './Button.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const publicLinks = [
    { to: '/#features', label: 'Features' },
    { to: '/#pricing', label: 'Pricing' },
    { to: '/#about', label: 'About' },
  ]

  const authLinks = [
    { to: '/dashboard/links', label: 'Dashboard' },
    { to: `/${user?.username}`, label: 'My page' },
  ]

  const links = user ? authLinks : publicLinks

  return (
    <header
      className={`sticky top-0 z-40 h-16 transition-shadow duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_var(--color-border)]'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-semibold text-[var(--color-text)] hover:opacity-80 transition-opacity duration-150">
          <div className="w-7 h-7 bg-[var(--color-accent)] rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="white" fillOpacity="0.9" />
              <circle cx="7" cy="7" r="2.5" fill="white" />
            </svg>
          </div>
          <span className="text-[15px] tracking-tight">TapToSee</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors duration-100 ${
                  isActive
                    ? 'text-[var(--color-accent)] bg-[var(--color-accent-muted)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <button
              onClick={logout}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-100"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-100"
              >
                Log in
              </Link>
              <Link to="/auth/register">
                <Button size="sm">Get started free</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-[var(--radius-md)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)] transition-colors duration-100"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-[var(--color-border)] bg-white"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)] transition-colors duration-100"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
                {user ? (
                  <button
                    onClick={logout}
                    className="text-left px-3 py-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  >
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm font-medium text-[var(--color-muted)]"
                    >
                      Log in
                    </Link>
                    <Link to="/auth/register" onClick={() => setOpen(false)}>
                      <Button className="w-full" size="sm">Get started free</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
