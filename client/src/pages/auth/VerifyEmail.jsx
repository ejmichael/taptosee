import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { verifyEmail } from '../../api/auth.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

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

export default function VerifyEmail() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!token) { setStatus('invalid'); return }
    verifyEmail(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
        <Logo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-center">
            {status === 'loading' && (
              <div className="py-8">
                <LoadingSpinner />
                <p className="text-sm text-[var(--color-muted)] mt-4">Verifying your email…</p>
              </div>
            )}

            {status === 'success' && (
              <div className="py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-success-muted)] flex items-center justify-center mx-auto">
                  <FiCheckCircle size={22} className="text-[var(--color-success)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text)]">Email verified!</p>
                  <p className="text-sm text-[var(--color-muted)] mt-2">Your account is now fully activated.</p>
                </div>
                <Link to="/dashboard"
                  className="inline-block text-sm text-[var(--color-accent)] font-medium hover:text-[var(--color-accent-hover)] transition-colors">
                  Go to dashboard →
                </Link>
              </div>
            )}

            {(status === 'error' || status === 'invalid') && (
              <div className="py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-destructive-muted)] flex items-center justify-center mx-auto">
                  <FiAlertCircle size={22} className="text-[var(--color-destructive)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text)]">Link invalid or expired</p>
                  <p className="text-sm text-[var(--color-muted)] mt-2">
                    This verification link has expired or already been used.
                  </p>
                </div>
                <Link to="/dashboard"
                  className="inline-block text-sm text-[var(--color-accent)] font-medium hover:text-[var(--color-accent-hover)] transition-colors">
                  Continue to dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
