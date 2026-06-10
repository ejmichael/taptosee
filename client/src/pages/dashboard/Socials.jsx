import { useState, useEffect, useRef } from 'react'
import { FiPlus, FiTrash2, FiEdit2, FiShare2, FiAlertCircle, FiChevronDown, FiCheck } from 'react-icons/fi'
import { FaYoutube, FaInstagram, FaLinkedin, FaFacebook, FaTiktok, FaGithub, FaTwitch, FaDiscord, FaSnapchat, FaPinterest, FaGlobe } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { AnimatePresence, motion } from 'framer-motion'
import * as socialsApi from '../../api/socials.js'
import Button from '../../components/Button.jsx'
import Modal from '../../components/Modal.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

const PLATFORMS = [
  { id: 'youtube',   label: 'YouTube',     icon: FaYoutube,        placeholder: 'https://youtube.com/@channel' },
  { id: 'instagram', label: 'Instagram',   icon: FaInstagram,      placeholder: 'https://instagram.com/username' },
  { id: 'twitter',   label: 'Twitter / X', icon: FaSquareXTwitter, placeholder: 'https://x.com/username' },
  { id: 'linkedin',  label: 'LinkedIn',    icon: FaLinkedin,       placeholder: 'https://linkedin.com/in/username' },
  { id: 'tiktok',    label: 'TikTok',      icon: FaTiktok,         placeholder: 'https://tiktok.com/@username' },
  { id: 'facebook',  label: 'Facebook',    icon: FaFacebook,       placeholder: 'https://facebook.com/username' },
  { id: 'github',    label: 'GitHub',      icon: FaGithub,         placeholder: 'https://github.com/username' },
  { id: 'twitch',    label: 'Twitch',      icon: FaTwitch,         placeholder: 'https://twitch.tv/username' },
  { id: 'discord',   label: 'Discord',     icon: FaDiscord,        placeholder: 'https://discord.gg/invite' },
  { id: 'snapchat',  label: 'Snapchat',    icon: FaSnapchat,       placeholder: 'https://snapchat.com/add/username' },
  { id: 'pinterest', label: 'Pinterest',   icon: FaPinterest,      placeholder: 'https://pinterest.com/username' },
  { id: 'website',   label: 'Website',     icon: FaGlobe,          placeholder: 'https://yourwebsite.com' },
]

const getPlatform = (id) => PLATFORMS.find((p) => p.id === id) || { icon: FaGlobe, label: id }

function PlatformDropdown({ value, onChange, excludeIds }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const available = PLATFORMS.filter((p) => !excludeIds.includes(p.id))
  const selected = getPlatform(value)
  const SelectedIcon = selected.icon

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false) }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`input flex items-center justify-between gap-2 w-full text-left transition-colors duration-100 ${
          open ? 'border-[var(--color-accent)] ring-2 ring-[var(--color-accent-border)]' : ''
        }`}
      >
        <span className="flex items-center gap-2.5">
          <SelectedIcon size={16} className="text-[var(--color-muted)] flex-shrink-0" />
          <span className="text-sm text-[var(--color-text)]">{selected.label}</span>
        </span>
        <FiChevronDown
          size={15}
          className={`text-[var(--color-muted)] flex-shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 mt-1 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-lg overflow-hidden py-1"
          >
            {available.map((p) => {
              const Icon = p.icon
              const isSelected = p.id === value
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => { onChange(p.id); setOpen(false) }}
                    className={`flex items-center justify-between gap-2.5 w-full px-3 h-9 text-sm transition-colors duration-100 ${
                      isSelected
                        ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)]'
                        : 'text-[var(--color-text)] hover:bg-[var(--color-surface-raised)]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={15} className="flex-shrink-0" />
                      {p.label}
                    </span>
                    {isSelected && <FiCheck size={13} className="flex-shrink-0" />}
                  </button>
                </li>
              )
            })}
            {available.length === 0 && (
              <li className="px-3 py-2 text-sm text-[var(--color-muted)]">All platforms added</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Socials() {
  const [socials, setSocials] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ platform: 'instagram', url: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    socialsApi.getSocials().then((r) => setSocials(r.data.socials)).finally(() => setLoading(false))
  }, [])

  const openAdd = () => { setEditing(null); setForm({ platform: 'instagram', url: '' }); setError(''); setModalOpen(true) }
  const openEdit = (s) => { setEditing(s); setForm({ platform: s.platform, url: s.url }); setError(''); setModalOpen(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editing) {
        const r = await socialsApi.updateSocial(editing._id, { url: form.url })
        setSocials((prev) => prev.map((s) => s._id === editing._id ? r.data.social : s))
      } else {
        const r = await socialsApi.addSocial(form)
        setSocials((prev) => {
          const idx = prev.findIndex((s) => s.platform === form.platform)
          return idx >= 0 ? prev.map((s, i) => i === idx ? r.data.social : s) : [...prev, r.data.social]
        })
      }
      setModalOpen(false)
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    await socialsApi.deleteSocial(id)
    setSocials((prev) => prev.filter((s) => s._id !== id))
  }

  const activePlatformIds = socials.map((s) => s.platform)
  const selectedPlatform = getPlatform(form.platform)

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">Socials</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">Social icons displayed on your profile page</p>
        </div>
        <Button onClick={openAdd} size="sm"><FiPlus size={14} />Add social</Button>
      </div>

      {socials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[var(--color-border)] rounded-[var(--radius-xl)] text-center">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] flex items-center justify-center mb-3">
            <FiShare2 size={18} className="text-[var(--color-muted)]" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text)]">No social links yet</p>
          <p className="text-sm text-[var(--color-muted)] mt-1 mb-4">Add your social profiles</p>
          <Button onClick={openAdd} size="sm"><FiPlus size={14} />Add social</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {socials.map((s) => {
            const p = getPlatform(s.platform)
            const Icon = p.icon
            return (
              <div key={s._id}
                className="group flex items-center gap-3 px-4 h-[56px] bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-100">
                <Icon size={18} className="text-[var(--color-muted)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text)]">{p.label}</p>
                  <p className="text-xs text-[var(--color-muted)] truncate">{s.url}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                  <button onClick={() => openEdit(s)}
                    className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)] transition-colors duration-100">
                    <FiEdit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(s._id)}
                    className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-destructive)] hover:bg-[var(--color-destructive-muted)] transition-colors duration-100">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? `Edit ${getPlatform(editing.platform).label}` : 'Add social link'}>
        {error && (
          <div className="mb-4 flex items-start gap-2.5 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
            <FiAlertCircle size={14} className="text-[var(--color-destructive)] flex-shrink-0 mt-px" />
            <p className="text-sm text-[var(--color-destructive)]">{error}</p>
          </div>
        )}
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {!editing && (
            <div className="field">
              <label className="label">Platform</label>
              <PlatformDropdown
                value={form.platform}
                onChange={(id) => setForm((p) => ({ ...p, platform: id }))}
                excludeIds={activePlatformIds}
              />
            </div>
          )}
          <div className="field">
            <label className="label">URL</label>
            <input type="url" className="input" value={form.url}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
              placeholder={selectedPlatform?.placeholder || 'https://'} required />
          </div>
          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1" loading={saving}>{editing ? 'Save changes' : 'Add'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
