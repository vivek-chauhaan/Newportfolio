import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import certificationService from '../../services/certificationService.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function CertificationsManage() {
  const { data, loading, refetch } = useFetch(() => certificationService.getAll(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const fields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'organization', label: 'Organization', required: true },
    { name: 'issueDate', label: 'Issue Date', type: 'date' },
    { name: 'credentialUrl', label: 'Credential URL' },
    { name: 'imageUrl', label: 'Image URL' },
    { name: 'displayOrder', label: 'Display Order', type: 'number' },
  ]

  const columns = [{ key: 'title', label: 'Title' }, { key: 'organization', label: 'Organization' }]

  const handleSubmit = async (values) => {
    try {
      if (editing) await certificationService.update(editing.id, values)
      else await certificationService.create(values)
      toast.success('Saved'); setModalOpen(false); refetch()
    } catch { toast.error('Save failed') }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.title}"?`)) return
    try { await certificationService.delete(row.id); toast.success('Deleted'); refetch() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Certifications</h1>
      <DataTable columns={columns} rows={data || []} onAdd={() => { setEditing(null); setModalOpen(true) }} onEdit={(r) => { setEditing(r); setModalOpen(true) }} onDelete={handleDelete} addLabel="Add Certification" />
      <FormModal open={modalOpen} title={editing ? 'Edit Certification' : 'Add Certification'} fields={fields} initialValues={editing || {}} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
