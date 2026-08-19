import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import blogService from '../../services/blogService.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function BlogManage() {
  const { data, loading, refetch } = useFetch(() => blogService.getAll({ size: 100 }), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const fields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'coverImage', label: 'Cover Image URL' },
    { name: 'description', label: 'Short Description', type: 'textarea' },
    { name: 'content', label: 'Content', type: 'textarea', required: true },
    { name: 'categoryId', label: 'Category ID' },
    { name: 'published', label: 'Published', type: 'checkbox' },
  ]

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'published', label: 'Published', render: (row) => (row.published ? 'Yes' : 'No') },
  ]

  const handleSubmit = async (values) => {
    try {
      if (editing) await blogService.update(editing.id, values)
      else await blogService.create(values)
      toast.success('Saved'); setModalOpen(false); refetch()
    } catch { toast.error('Save failed') }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.title}"?`)) return
    try { await blogService.delete(row.id); toast.success('Deleted'); refetch() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Blog Posts</h1>
      <DataTable columns={columns} rows={data?.content || []} onAdd={() => { setEditing(null); setModalOpen(true) }} onEdit={(r) => { setEditing(r); setModalOpen(true) }} onDelete={handleDelete} addLabel="Add Post" />
      <FormModal open={modalOpen} title={editing ? 'Edit Post' : 'Add Post'} fields={fields} initialValues={editing || {}} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
