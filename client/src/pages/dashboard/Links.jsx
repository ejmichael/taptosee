import { useState, useEffect } from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FiPlus, FiTrash2, FiEdit2, FiLink, FiAlertCircle, FiMoreVertical } from 'react-icons/fi'
import * as linksApi from '../../api/links.js'
import Button from '../../components/Button.jsx'
import Modal from '../../components/Modal.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

function Toggle({ checked, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
        checked ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]'
      }`}>
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-150 ${checked ? 'translate-x-[18px]' : 'translate-x-[3px]'}`} />
    </button>
  )
}

function SortableLink({ link, onEdit, onDelete, onToggle }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link._id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }

  return (
    <div ref={setNodeRef} style={style}
      className={`group flex items-center gap-3 px-4 h-[56px] bg-[var(--color-surface)] rounded-[var(--radius-lg)] border transition-colors duration-100 ${
        link.isActive ? 'border-[var(--color-border)]' : 'border-dashed border-[var(--color-border)]'
      } ${isDragging ? '' : 'hover:border-[var(--color-border-strong)]'}`}>
      <button {...attributes} {...listeners}
        className="text-[var(--color-disabled)] hover:text-[var(--color-muted)] cursor-grab active:cursor-grabbing transition-colors duration-100 flex-shrink-0 touch-none">
        <FiMoreVertical size={16} />
      </button>

      <div className={`flex-1 min-w-0 ${!link.isActive ? 'opacity-50' : ''}`}>
        <p className="text-sm font-medium text-[var(--color-text)] truncate">{link.title}</p>
        <p className="text-xs text-[var(--color-muted)] truncate">{link.url}</p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
        <button onClick={() => onEdit(link)}
          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)] transition-colors duration-100">
          <FiEdit2 size={14} />
        </button>
        <button onClick={() => onDelete(link._id)}
          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-destructive)] hover:bg-[var(--color-destructive-muted)] transition-colors duration-100">
          <FiTrash2 size={14} />
        </button>
      </div>

      <Toggle checked={link.isActive} onChange={() => onToggle(link)} />
    </div>
  )
}

const empty = { title: '', url: '' }

export default function Links() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  useEffect(() => {
    linksApi.getLinks().then((r) => setLinks(r.data.links)).finally(() => setLoading(false))
  }, [])

  const openAdd = () => { setEditing(null); setForm(empty); setError(''); setModalOpen(true) }
  const openEdit = (l) => { setEditing(l); setForm({ title: l.title, url: l.url }); setError(''); setModalOpen(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editing) {
        const r = await linksApi.updateLink(editing._id, form)
        setLinks((prev) => prev.map((l) => l._id === editing._id ? r.data.link : l))
      } else {
        const r = await linksApi.addLink(form)
        setLinks((prev) => [...prev, r.data.link])
      }
      setModalOpen(false)
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this link?')) return
    await linksApi.deleteLink(id)
    setLinks((prev) => prev.filter((l) => l._id !== id))
  }

  const handleToggle = async (link) => {
    const r = await linksApi.toggleLink(link._id)
    setLinks((prev) => prev.map((l) => l._id === link._id ? r.data.link : l))
  }

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return
    const oldIdx = links.findIndex((l) => l._id === active.id)
    const newIdx = links.findIndex((l) => l._id === over.id)
    const reordered = arrayMove(links, oldIdx, newIdx)
    setLinks(reordered)
    await linksApi.reorderLinks(reordered.map((l, i) => ({ id: l._id, order: i })))
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">Links</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            {links.length} link{links.length !== 1 ? 's' : ''} · drag to reorder
          </p>
        </div>
        <Button onClick={openAdd} size="sm">
          <FiPlus size={14} />
          Add link
        </Button>
      </div>

      {links.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[var(--color-border)] rounded-[var(--radius-xl)] text-center">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] flex items-center justify-center mb-3">
            <FiLink size={18} className="text-[var(--color-muted)]" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text)]">No links yet</p>
          <p className="text-sm text-[var(--color-muted)] mt-1 mb-4">Add your first link to get started</p>
          <Button onClick={openAdd} size="sm"><FiPlus size={14} />Add link</Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={links.map((l) => l._id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <SortableLink key={link._id} link={link} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit link' : 'Add link'}>
        {error && (
          <div className="mb-4 flex items-start gap-2.5 p-3 bg-[var(--color-destructive-muted)] border border-[var(--color-destructive-border)] rounded-[var(--radius-md)]">
            <FiAlertCircle size={14} className="text-[var(--color-destructive)] flex-shrink-0 mt-px" />
            <p className="text-sm text-[var(--color-destructive)]">{error}</p>
          </div>
        )}
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="field">
            <label className="label">Title</label>
            <input className="input" value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="My website" required />
          </div>
          <div className="field">
            <label className="label">URL</label>
            <input type="url" className="input" value={form.url}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
              placeholder="https://example.com" required />
          </div>
          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1" loading={saving}>{editing ? 'Save changes' : 'Add link'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
