import { useState } from 'react'
import { FiCamera, FiCheck, FiExternalLink, FiAlertCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { updateProfile, updateUsername } from '../../api/user.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/Button.jsx'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || '',
  })
  const [newUsername, setNewUsername] = useState(user?.username || '')
  const [picFile, setPicFile] = useState(null)
  const [picPreview, setPicPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [savingUsername, setSavingUsername] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [usernameSaved, setUsernameSaved] = useState(false)

  const handlePic = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setPicFile(f)
    setPicPreview(URL.createObjectURL(f))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('displayName', form.displayName)
      fd.append('bio', form.bio)
      if (picFile) fd.append('profilePicture', picFile)
      const r = await updateProfile(fd)
      updateUser(r.data.user)
      setPicFile(null)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleUsernameUpdate = async (e) => {
    e.preventDefault()
    if (newUsername === user?.username) return
    setSavingUsername(true)
    setUsernameError('')
    try {
      const r = await updateUsername(newUsername)
      updateUser({ username: r.data.username })
      setUsernameSaved(true)
      setTimeout(() => setUsernameSaved(false), 2000)
    } catch (err) {
      setUsernameError(err.response?.data?.message || 'Username unavailable')
    } finally {
      setSavingUsername(false)
    }
  }

  const avatarSrc = picPreview || user?.profilePicture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.username || 'U')}&background=4f46e5&color=fff&size=200`

  return (
    <div className="max-w-[520px] space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">Profile</h1>
        <p className="text-sm text-[var(--color-muted)] mt-1">What visitors see on your page</p>
      </div>

      {/* Profile info */}
      <form onSubmit={handleSave}
        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 flex flex-col gap-5">
        {error && (
          <div className="flex items-start gap-2.5 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
            <FiAlertCircle size={14} className="text-[var(--color-destructive)] flex-shrink-0 mt-px" />
            <p className="text-sm text-[var(--color-destructive)]">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <img src={avatarSrc} alt="" className="w-20 h-20 rounded-full object-cover ring-2 ring-[var(--color-border)]" />
            <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-[var(--color-accent)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--color-accent-hover)] transition-colors duration-150 shadow-sm">
              <FiCamera className="text-white" size={13} />
              <input type="file" accept="image/*" className="hidden" onChange={handlePic} />
            </label>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[var(--color-text)] truncate">{user?.displayName || user?.username}</p>
            <Link to={`/${user?.username}`} target="_blank"
              className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors duration-100 mt-0.5">
              taptosee.me/{user?.username} <FiExternalLink size={11} />
            </Link>
          </div>
        </div>

        <div className="field">
          <label className="label">Display name</label>
          <input className="input" value={form.displayName}
            onChange={(e) => setForm((p) => ({ ...p, displayName: e.target.value }))}
            placeholder="Your name" />
        </div>

        <div className="field">
          <label className="label">Bio</label>
          <textarea className="input input-textarea" rows={3} value={form.bio}
            onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
            placeholder="Tell people about yourself…" maxLength={160} />
          <p className="mt-1 text-xs text-[var(--color-muted)] text-right">{form.bio.length}/160</p>
        </div>

        <Button type="submit" loading={saving} className="w-full">
          {saved ? <><FiCheck size={14} />Saved!</> : 'Save changes'}
        </Button>
      </form>

      {/* Username */}
      <form onSubmit={handleUsernameUpdate}
        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)]">Username</p>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">Changing this updates your public URL</p>
        </div>
        {usernameError && (
          <div className="flex items-start gap-2.5 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
            <FiAlertCircle size={14} className="text-[var(--color-destructive)] flex-shrink-0 mt-px" />
            <p className="text-sm text-[var(--color-destructive)]">{usernameError}</p>
          </div>
        )}
        <div className="field">
          <label className="label">Username</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-sm pointer-events-none">@</span>
            <input className="input pl-7" value={newUsername}
              onChange={(e) => setNewUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} />
          </div>
          <p className="mt-1 text-xs text-[var(--color-muted)]">taptosee.me/{newUsername}</p>
        </div>
        <Button type="submit" variant="outline" loading={savingUsername}
          disabled={newUsername === user?.username} className="w-full">
          {usernameSaved ? <><FiCheck size={14} />Updated!</> : 'Update username'}
        </Button>
      </form>
    </div>
  )
}
