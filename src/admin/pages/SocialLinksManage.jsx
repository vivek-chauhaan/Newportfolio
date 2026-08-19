import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import socialLinkService from '../../services/socialLinkService.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function SocialLinksManage() {
  const { data, loading, refetch } = useFetch(() => socialLinkService.getAll(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const fields = [
    { name: 'platform', label: 'Platform (e.g. github)', required: true },
    { name: 'url', label: 'URL', required: true },
    { name: 'icon', label: 'Icon key (github/linkedin/twitter/email)' },
    { name: 'displayOrder', label: 'Display Order', type: 'number' },
  ]

  const columns = [{ key: 'platform', label: 'Platform' }, { key: 'url', label: 'URL' }]

  const handleSubmit = async (values) => {
    try {
      if (editing) await socialLinkService.update(editing.id, values)
      else await socialLinkService.create(values)
      toast.success('Saved'); setModalOpen(false); refetch()
    } catch { toast.error('Save failed') }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.platform}"?`)) return
    try { await socialLinkService.delete(row.id); toast.success('Deleted'); refetch() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Social Links</h1>
      <DataTable columns={columns} rows={data || []} onAdd={() => { setEditing(null); setModalOpen(true) }} onEdit={(r) => { setEditing(r); setModalOpen(true) }} onDelete={handleDelete} addLabel="Add Link" />
      <FormModal open={modalOpen} title={editing ? 'Edit Link' : 'Add Link'} fields={fields} initialValues={editing || {}} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
