import { useState } from 'react'
import { FiCheck, FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { updateProfile } from '../../api/user.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { TEMPLATES } from '../../utils/templates.js'
import Button from '../../components/Button.jsx'

export default function Appearance() {
  const { user, updateUser } = useAuth()
  const [selected, setSelected] = useState(user?.template || 'template1')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('template', selected)
      const r = await updateProfile(fd)
      updateUser(r.data.user)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = selected !== (user?.template || 'template1')

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">Appearance</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">Choose how your profile page looks</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/${user?.username}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm"><FiExternalLink size={14} />Preview</Button>
          </Link>
          <Button size="sm" onClick={handleSave} loading={saving} disabled={!hasChanges && !saved}>
            {saved ? <><FiCheck size={14} />Saved</> : 'Save'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(TEMPLATES).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`relative text-left rounded-[var(--radius-lg)] overflow-hidden border-2 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
              selected === key
                ? 'border-[var(--color-accent)] shadow-[0_0_0_3px_var(--color-accent-muted)]'
                : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
            }`}
          >
            <div className={`h-20 bg-gradient-to-br ${t.pageBg} flex items-center justify-center`}>
              <div className={`w-12 rounded-lg p-1.5 ${t.cardBg} shadow`}>
                <div className="w-5 h-5 rounded-full bg-white/40 mx-auto mb-1" />
                <div className="h-1 rounded-full bg-white/30 mb-1" />
                <div className="h-1 rounded-full bg-white/20" />
              </div>
            </div>
            <div className="px-2.5 py-2 bg-[var(--color-surface)] flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--color-text)]">{t.label}</span>
              {selected === key && (
                <span className="w-4 h-4 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                  <FiCheck size={9} className="text-white" />
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
