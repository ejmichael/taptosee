import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiImage, FiCheck, FiAlertCircle, FiArrowLeft } from 'react-icons/fi'
import { register as apiRegister } from '../../api/auth.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { TEMPLATES } from '../../utils/templates.js'
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

const STEPS = ['Account', 'Profile', 'Design']

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    firstName: '', surname: '', username: '',
    emailAddress: '', password: '', bio: '', template: 'template1',
  })
  const [picFile, setPicFile] = useState(null)
  const [picPreview, setPicPreview] = useState(null)
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))
  const setVal = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const handlePic = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setPicFile(f)
    setPicPreview(URL.createObjectURL(f))
  }

  const canNext = [
    form.firstName && form.emailAddress && form.password.length >= 6,
    form.username.length >= 3,
    true,
  ]

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (picFile) fd.append('profilePicture', picFile)
      const res = await apiRegister(fd)
      login(res.data.user)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Registration failed'
      setError(msg)
      setStep(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border)]">
        <Logo />
        <p className="text-sm text-[var(--color-muted)] hidden md:block">Already have an account?{' '}
          <Link to="/auth/login" className="text-[var(--color-accent)] font-medium">Sign in</Link>
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px]">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 ${i <= step ? 'text-[var(--color-accent)]' : 'text-[var(--color-disabled)]'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    i < step ? 'bg-[var(--color-accent)] text-white' :
                    i === step ? 'border-2 border-[var(--color-accent)] text-[var(--color-accent)]' :
                    'border-2 border-[var(--color-border)] text-[var(--color-disabled)]'
                  }`}>
                    {i < step ? <FiCheck size={12} /> : i + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px flex-1 w-8 transition-colors ${i < step ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[var(--color-text)] tracking-tight">
              {['Create your account', 'Set up your profile', 'Choose a template'][step]}
            </h1>
            <p className="text-sm text-[var(--color-muted)] mt-1.5">
              {['Free forever. No credit card required.', 'You can change all of this later.', 'You can switch templates any time.'][step]}
            </p>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            {error && (
              <div className="mb-5 flex items-start gap-2.5 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
                <FiAlertCircle size={15} className="text-[var(--color-destructive)] flex-shrink-0 mt-px" />
                <p className="text-sm text-[var(--color-destructive)]">{error}</p>
              </div>
            )}

            {/* Step 0 — Account */}
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="field">
                    <label className="label">First name</label>
                    <input className="input" value={form.firstName} onChange={set('firstName')} placeholder="Jane" required />
                  </div>
                  <div className="field">
                    <label className="label">Surname</label>
                    <input className="input" value={form.surname} onChange={set('surname')} placeholder="Doe" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email address</label>
                  <div className="relative">
                    <FiMail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-disabled)] pointer-events-none" />
                    <input type="email" className="input pl-9" value={form.emailAddress} onChange={set('emailAddress')} placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="relative">
                    <FiLock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-disabled)] pointer-events-none" />
                    <input type={showPw ? 'text' : 'password'} className="input pl-9 pr-10" value={form.password} onChange={set('password')} placeholder="Min 6 characters" required />
                    <button type="button" onClick={() => setShowPw((v) => !v)} tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-disabled)] hover:text-[var(--color-muted)]">
                      {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>
                <Button size="lg" className="w-full" onClick={() => setStep(1)} disabled={!canNext[0]}>
                  Continue
                </Button>
              </div>
            )}

            {/* Step 1 — Profile */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div className="field">
                  <label className="label">Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-sm pointer-events-none">@</span>
                    <input className="input pl-7" value={form.username}
                      onChange={(e) => setVal('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="janedoe" required />
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">taptosee.me/{form.username || 'yourname'}</p>
                </div>

                <div className="field">
                  <label className="label">Bio <span className="text-[var(--color-disabled)] font-normal">(optional)</span></label>
                  <textarea className="input input-textarea" rows={3} value={form.bio} onChange={set('bio')}
                    placeholder="A sentence about yourself…" maxLength={160} />
                  <p className="mt-1 text-xs text-[var(--color-muted)] text-right">{form.bio.length}/160</p>
                </div>

                <div className="field">
                  <label className="label">Profile photo <span className="text-[var(--color-disabled)] font-normal">(optional)</span></label>
                  <label className="flex items-center gap-4 p-4 border border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] cursor-pointer hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-muted)] transition-colors duration-150">
                    {picPreview ? (
                      <img src={picPreview} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-[var(--color-border)]" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[var(--color-surface-raised)] flex items-center justify-center flex-shrink-0">
                        <FiImage size={18} className="text-[var(--color-muted)]" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">{picPreview ? 'Change photo' : 'Upload a photo'}</p>
                      <p className="text-xs text-[var(--color-muted)]">JPG, PNG or WebP · Max 5MB</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePic} />
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(0)}>
                    <FiArrowLeft size={15} /> Back
                  </Button>
                  <Button size="lg" className="flex-1" onClick={() => setStep(2)} disabled={!canNext[1]}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2 — Template */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-0.5">
                  {Object.entries(TEMPLATES).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => setVal('template', key)}
                      className={`relative text-left rounded-[var(--radius-lg)] overflow-hidden border-2 transition-all duration-150 ${
                        form.template === key
                          ? 'border-[var(--color-accent)] shadow-[0_0_0_3px_var(--color-accent-muted)]'
                          : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
                      }`}
                    >
                      <div className={`h-16 bg-gradient-to-br ${t.pageBg}`} />
                      <div className="px-2.5 py-2 flex items-center justify-between bg-white">
                        <span className="text-xs font-medium text-[var(--color-text)]">{t.label}</span>
                        {form.template === key && (
                          <span className="w-4 h-4 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                            <FiCheck size={10} className="text-white" />
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-1">
                  <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>
                    <FiArrowLeft size={15} /> Back
                  </Button>
                  <Button size="lg" className="flex-1" loading={loading} onClick={handleSubmit}>
                    Create my page
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-[var(--color-muted)] mt-6 md:hidden">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-[var(--color-accent)] font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
