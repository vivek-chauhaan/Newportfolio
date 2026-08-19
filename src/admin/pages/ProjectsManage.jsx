import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import projectService from '../../services/projectService.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function ProjectsManage() {
  const { data, loading, refetch } = useFetch(() => projectService.getAll({ size: 100 }), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const fields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'shortDescription', label: 'Short Description' },
    { name: 'description', label: 'Full Description', type: 'textarea' },
    { name: 'thumbnailImage', label: 'Thumbnail URL' },
    { name: 'category', label: 'Category' },
    { name: 'githubUrl', label: 'GitHub URL' },
    { name: 'liveDemoUrl', label: 'Live Demo URL' },
    { name: 'problemStatement', label: 'Case Study: The Problem', type: 'textarea' },
    { name: 'solutionOverview', label: 'Case Study: The Solution', type: 'textarea' },
    { name: 'systemArchitecture', label: 'Case Study: System Architecture & Data Flow', type: 'textarea' },
    { name: 'keyOutcomesText', label: 'Case Study: Key Outcomes (one result per line)', type: 'textarea' },
    { name: 'featured', label: 'Featured', type: 'checkbox' },
    { name: 'displayOrder', label: 'Display Order', type: 'number' },
  ]

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'featured', label: 'Featured', render: (row) => (row.featured ? 'Yes' : 'No') },
  ]

  const handleAdd = () => { setEditing(null); setModalOpen(true) }
  const handleEdit = (row) => {
    const formatted = {
      ...row,
      keyOutcomesText: Array.isArray(row.keyOutcomes) ? row.keyOutcomes.join('\n') : (row.keyOutcomes || ''),
    }
    setEditing(formatted)
    setModalOpen(true)
  }

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        keyOutcomes: typeof values.keyOutcomesText === 'string'
          ? values.keyOutcomesText.split('\n').map((s) => s.trim()).filter(Boolean)
          : (values.keyOutcomes || []),
      }
      delete payload.keyOutcomesText

      if (editing) await projectService.update(editing.id, payload)
      else await projectService.create(payload)
      toast.success(editing ? 'Project updated' : 'Project created')
      setModalOpen(false)
      refetch()
    } catch {
      toast.error('Save failed')
    }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.title}"?`)) return
    try {
      await projectService.delete(row.id)
      toast.success('Project deleted')
      refetch()
    } catch {
      toast.error('Delete failed')
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Projects</h1>
      <DataTable columns={columns} rows={data?.content || []} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} addLabel="Add Project" />
      <FormModal
        open={modalOpen}
        title={editing ? 'Edit Project' : 'Add Project'}
        fields={fields}
        initialValues={editing || {}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
