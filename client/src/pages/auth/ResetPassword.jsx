import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiLock, FiEye, FiEyeOff, FiAlertCircle, FiArrowLeft } from 'react-icons/fi'
import { resetPassword } from '../../api/auth.js'
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

export default function ResetPassword() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const navigate = useNavigate()
  const { login } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) return setError('Passwords do not match')
    setError('')
    setLoading(true)
    try {
      const res = await resetPassword(token, password)
      login(res.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired reset link')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
          <Logo />
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-[var(--color-muted)] mb-4 text-sm">This reset link is invalid.</p>
            <Link to="/auth/forgot-password"
              className="text-sm text-[var(--color-accent)] font-medium hover:text-[var(--color-accent-hover)]">
              Request a new link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
        <Logo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[var(--color-text)] tracking-tight">Set new password</h1>
            <p className="text-sm text-[var(--color-muted)] mt-1.5">Choose a strong password for your account</p>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            {error && (
              <div className="mb-5 flex items-start gap-2.5 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
                <FiAlertCircle size={15} className="text-[var(--color-destructive)] flex-shrink-0 mt-px" />
                <p className="text-sm text-[var(--color-destructive)]">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="field">
                <label className="label">New password</label>
                <div className="relative">
                  <FiLock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-disabled)] pointer-events-none" />
                  <input type={showPw ? 'text' : 'password'} className="input pl-9 pr-10" value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} />
                  <button type="button" onClick={() => setShowPw((v) => !v)} tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-disabled)] hover:text-[var(--color-muted)]">
                    {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>

              <div className="field">
                <label className="label">Confirm password</label>
                <div className="relative">
                  <FiLock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-disabled)] pointer-events-none" />
                  <input type={showPw ? 'text' : 'password'} className="input pl-9" value={confirm}
                    onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" required minLength={6} />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" loading={loading}>Update password</Button>
            </form>

            <div className="mt-5 text-center">
              <Link to="/auth/login"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)]">
                <FiArrowLeft size={14} /> Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
