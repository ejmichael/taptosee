import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiArrowLeft, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { forgotPassword } from '../../api/auth.js'
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

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await forgotPassword(email)
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
        <Logo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[var(--color-text)] tracking-tight">Reset your password</h1>
            <p className="text-sm text-[var(--color-muted)] mt-1.5">We'll send you a link to reset it</p>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            {sent ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-success-muted)] flex items-center justify-center mx-auto">
                  <FiCheckCircle size={22} className="text-[var(--color-success)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text)]">Check your inbox</p>
                  <p className="text-sm text-[var(--color-muted)] mt-2">
                    If <strong>{email}</strong> has an account, a reset link is on its way. Check your spam folder too.
                  </p>
                </div>
                <Link to="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] font-medium hover:text-[var(--color-accent-hover)]">
                  <FiArrowLeft size={14} /> Back to sign in
                </Link>
              </div>
            ) : (
              <>
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
                      <input id="email" type="email" className="input pl-9" value={email}
                        onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full" loading={loading}>
                    Send reset link
                  </Button>
                </form>
                <div className="mt-5 text-center">
                  <Link to="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)]">
                    <FiArrowLeft size={14} /> Back to sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
