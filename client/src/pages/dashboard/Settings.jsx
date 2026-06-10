import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiAlertTriangle, FiCheck, FiAlertCircle, FiLock } from 'react-icons/fi'
import { changePassword } from '../../api/auth.js'
import { deleteAccount } from '../../api/user.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/Button.jsx'
import Modal from '../../components/Modal.jsx'

export default function Settings() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (pw.newPassword !== pw.confirm) return setPwError('Passwords do not match')
    if (pw.newPassword.length < 6) return setPwError('Minimum 6 characters')
    setPwLoading(true)
    setPwError('')
    try {
      await changePassword({ currentPassword: pw.currentPassword, newPassword: pw.newPassword })
      setPwSuccess(true)
      setPw({ currentPassword: '', newPassword: '', confirm: '' })
      setTimeout(() => setPwSuccess(false), 3000)
    } catch (err) {
      setPwError(err.response?.data?.message || 'Failed to change password')
    } finally {
      setPwLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    setDeleteError('')
    try {
      await deleteAccount(deletePassword)
      logout()
      navigate('/')
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Incorrect password')
    } finally {
      setDeleteLoading(false)
    }
  }

  const pwFields = [
    { label: 'Current password', key: 'currentPassword' },
    { label: 'New password', key: 'newPassword' },
    { label: 'Confirm new password', key: 'confirm' },
  ]

  return (
    <div className="max-w-[520px] space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--color-muted)] mt-1">Manage your account security</p>
      </div>

      {/* Change password */}
      <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6">
        <div className="flex items-center gap-2 mb-5">
          <FiLock size={15} className="text-[var(--color-muted)]" />
          <h2 className="text-sm font-semibold text-[var(--color-text)]">Change password</h2>
        </div>

        {pwError && (
          <div className="mb-4 flex items-start gap-2.5 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
            <FiAlertCircle size={14} className="text-[var(--color-destructive)] flex-shrink-0 mt-px" />
            <p className="text-sm text-[var(--color-destructive)]">{pwError}</p>
          </div>
        )}
        {pwSuccess && (
          <div className="mb-4 flex items-center gap-2 p-3 bg-[var(--color-success-muted)] border border-[var(--color-success-border)] rounded-[var(--radius-md)]">
            <FiCheck size={14} className="text-[var(--color-success)] flex-shrink-0" />
            <p className="text-sm text-[var(--color-success)]">Password updated successfully</p>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          {pwFields.map(({ label, key }) => (
            <div key={key} className="field">
              <label className="label">{label}</label>
              <input type="password" className="input" value={pw[key]}
                onChange={(e) => setPw((p) => ({ ...p, [key]: e.target.value }))} required />
            </div>
          ))}
          <Button type="submit" loading={pwLoading} variant="outline" className="w-full mt-1">Update password</Button>
        </form>
      </section>

      {/* Danger zone */}
      <section className="bg-[var(--color-surface)] border border-[var(--color-destructive-border)] rounded-[var(--radius-xl)] p-6">
        <div className="flex items-center gap-2 mb-2">
          <FiAlertTriangle size={15} className="text-[var(--color-destructive)]" />
          <h2 className="text-sm font-semibold text-[var(--color-destructive)]">Danger zone</h2>
        </div>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Permanently delete your account and all data. This cannot be undone.
        </p>
        <Button variant="danger" size="sm" onClick={() => setDeleteModal(true)}>Delete account</Button>
      </section>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Delete account">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
            <FiAlertTriangle className="text-[var(--color-destructive)] flex-shrink-0 mt-0.5" size={16} />
            <p className="text-sm text-[var(--color-destructive)]">
              This will permanently delete your account, all links, socials, and analytics. There's no going back.
            </p>
          </div>

          {deleteError && (
            <div className="flex items-start gap-2.5 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
              <FiAlertCircle size={14} className="text-[var(--color-destructive)] flex-shrink-0 mt-px" />
              <p className="text-sm text-[var(--color-destructive)]">{deleteError}</p>
            </div>
          )}

          <div className="field">
            <label className="label">Enter your password to confirm</label>
            <input type="password" className="input" value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)} placeholder="••••••••" />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" className="flex-1" loading={deleteLoading}
              onClick={handleDeleteAccount} disabled={!deletePassword}>
              Delete forever
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
