import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import educationService from '../../services/educationService.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function EducationManage() {
  const { data, loading, refetch } = useFetch(() => educationService.getAll(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const fields = [
    { name: 'institution', label: 'Institution', required: true },
    { name: 'degree', label: 'Degree', required: true },
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
    { name: 'cgpa', label: 'CGPA' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'displayOrder', label: 'Display Order', type: 'number' },
  ]

  const columns = [{ key: 'institution', label: 'Institution' }, { key: 'degree', label: 'Degree' }]

  const handleSubmit = async (values) => {
    try {
      if (editing) await educationService.update(editing.id, values)
      else await educationService.create(values)
      toast.success('Saved'); setModalOpen(false); refetch()
    } catch { toast.error('Save failed') }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.institution}"?`)) return
    try { await educationService.delete(row.id); toast.success('Deleted'); refetch() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Education</h1>
      <DataTable columns={columns} rows={data || []} onAdd={() => { setEditing(null); setModalOpen(true) }} onEdit={(r) => { setEditing(r); setModalOpen(true) }} onDelete={handleDelete} addLabel="Add Education" />
      <FormModal open={modalOpen} title={editing ? 'Edit Education' : 'Add Education'} fields={fields} initialValues={editing || {}} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
