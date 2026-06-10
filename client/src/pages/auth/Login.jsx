import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi'
import { login as apiLogin } from '../../api/auth.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/Button.jsx'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-semibold text-[var(--color-text)] hover:opacity-80 transition-opacity">
      <div className="w-8 h-8 bg-[var(--color-accent)] rounded-[var(--radius-md)] flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="white" fillOpacity="0.9" />
          <circle cx="7" cy="7" r="2.5" fill="white" />
        </svg>
      </div>
      <span className="text-base tracking-tight">TapToSee</span>
    </Link>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ emailAddress: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await apiLogin(form)
      login(res.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Top bar */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
        <Logo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[var(--color-text)] tracking-tight">Welcome back</h1>
            <p className="text-sm text-[var(--color-muted)] mt-1.5">Enter your details to sign in</p>
          </div>

          {/* Card */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            {error && (
              <div className="mb-5 flex items-start gap-2.5 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
                <FiAlertCircle size={15} className="text-[var(--color-destructive)] flex-shrink-0 mt-px" />
                <p className="text-sm text-[var(--color-destructive)]">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="field">
                <label htmlFor="email" className="label">Email address</label>
                <div className="relative">
                  <FiMail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-disabled)] pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    className="input pl-9"
                    value={form.emailAddress}
                    onChange={set('emailAddress')}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="label mb-0">Password</label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <FiLock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-disabled)] pointer-events-none" />
                  <input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    className="input pl-9 pr-10"
                    value={form.password}
                    onChange={set('password')}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-disabled)] hover:text-[var(--color-muted)] transition-colors"
                    tabIndex={-1}
                  >
                    {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full mt-1" loading={loading}>
                Sign in
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-[var(--color-muted)] mt-6">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-[var(--color-accent)] font-medium hover:text-[var(--color-accent-hover)] transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
