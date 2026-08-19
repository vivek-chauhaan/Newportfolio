import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import reviewService from '../../services/reviewService.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function ReviewsManage() {
  const { data, loading, refetch } = useFetch(() => reviewService.getAllForAdmin(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const fields = [
    { name: 'clientName', label: 'Client Name', required: true },
    { name: 'company', label: 'Company' },
    { name: 'clientImage', label: 'Client Image URL' },
    { name: 'reviewText', label: 'Review Text', type: 'textarea', required: true },
    { name: 'rating', label: 'Rating (1-5)', type: 'number' },
    { name: 'approved', label: 'Approved (visible on site)', type: 'checkbox' },
  ]

  const columns = [
    { key: 'clientName', label: 'Client' },
    { key: 'rating', label: 'Rating' },
    { key: 'approved', label: 'Approved', render: (row) => (row.approved ? 'Yes' : 'No') },
  ]

  const handleSubmit = async (values) => {
    try {
      if (editing) await reviewService.update(editing.id, values)
      else await reviewService.create(values)
      toast.success('Saved'); setModalOpen(false); refetch()
    } catch { toast.error('Save failed') }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete review from "${row.clientName}"?`)) return
    try { await reviewService.delete(row.id); toast.success('Deleted'); refetch() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Reviews</h1>
      <DataTable columns={columns} rows={data || []} onAdd={() => { setEditing(null); setModalOpen(true) }} onEdit={(r) => { setEditing(r); setModalOpen(true) }} onDelete={handleDelete} addLabel="Add Review" />
      <FormModal open={modalOpen} title={editing ? 'Edit Review' : 'Add Review'} fields={fields} initialValues={editing || {}} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
