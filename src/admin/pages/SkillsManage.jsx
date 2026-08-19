import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import skillService from '../../services/skillService.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function SkillsManage() {
  const { data: skills, loading, refetch } = useFetch(() => skillService.getAll(), [])
  const { data: categories } = useFetch(() => skillService.getCategories(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const categoryMap = Object.fromEntries((categories || []).map((c) => [c.id, c.name]))

  const fields = [
    { name: 'name', label: 'Skill Name', required: true },
    { name: 'categoryId', label: 'Category ID', required: true },
    { name: 'proficiency', label: 'Proficiency (0-100)', type: 'number' },
    { name: 'icon', label: 'Icon (key/URL)' },
    { name: 'displayOrder', label: 'Display Order', type: 'number' },
  ]

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category', render: (row) => categoryMap[row.categoryId] || '—' },
    { key: 'proficiency', label: 'Proficiency', render: (row) => `${row.proficiency || 0}%` },
  ]

  const handleAdd = () => { setEditing(null); setModalOpen(true) }
  const handleEdit = (row) => { setEditing(row); setModalOpen(true) }

  const handleSubmit = async (values) => {
    try {
      if (editing) await skillService.update(editing.id, values)
      else await skillService.create(values)
      toast.success(editing ? 'Skill updated' : 'Skill created')
      setModalOpen(false)
      refetch()
    } catch {
      toast.error('Save failed')
    }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.name}"?`)) return
    try {
      await skillService.delete(row.id)
      toast.success('Skill deleted')
      refetch()
    } catch {
      toast.error('Delete failed')
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Skills</h1>
      <DataTable columns={columns} rows={skills || []} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} addLabel="Add Skill" />
      <FormModal
        open={modalOpen}
        title={editing ? 'Edit Skill' : 'Add Skill'}
        fields={fields}
        initialValues={editing || {}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
