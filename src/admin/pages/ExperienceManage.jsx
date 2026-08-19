import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import experienceService from '../../services/experienceService.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function ExperienceManage() {
  const { data, loading, refetch } = useFetch(() => experienceService.getAll(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const fields = [
    { name: 'company', label: 'Company', required: true },
    { name: 'designation', label: 'Designation', required: true },
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
    { name: 'currentlyWorking', label: 'Currently Working', type: 'checkbox' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'displayOrder', label: 'Display Order', type: 'number' },
  ]

  const columns = [
    { key: 'company', label: 'Company' },
    { key: 'designation', label: 'Designation' },
  ]

  const handleSubmit = async (values) => {
    try {
      if (editing) await experienceService.update(editing.id, values)
      else await experienceService.create(values)
      toast.success('Saved')
      setModalOpen(false)
      refetch()
    } catch { toast.error('Save failed') }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.company}"?`)) return
    try { await experienceService.delete(row.id); toast.success('Deleted'); refetch() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Experience</h1>
      <DataTable columns={columns} rows={data || []} onAdd={() => { setEditing(null); setModalOpen(true) }} onEdit={(r) => { setEditing(r); setModalOpen(true) }} onDelete={handleDelete} addLabel="Add Experience" />
      <FormModal open={modalOpen} title={editing ? 'Edit Experience' : 'Add Experience'} fields={fields} initialValues={editing || {}} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
