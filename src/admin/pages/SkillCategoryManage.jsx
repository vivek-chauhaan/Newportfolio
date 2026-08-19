import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import skillService from '../../services/skillService.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function SkillCategoryManage() {
  const { data: categories, loading, refetch } = useFetch(() => skillService.getCategories(), [])
  const [modalOpen, setModalOpen] = useState(false)

  const fields = [
    { name: 'name', label: 'Category Name', required: true },
    { name: 'icon', label: 'Icon' },
    { name: 'displayOrder', label: 'Display Order', type: 'number' },
  ]

  const columns = [{ key: 'name', label: 'Name' }, { key: 'displayOrder', label: 'Order' }]

  const handleSubmit = async (values) => {
    try {
      await skillService.createCategory(values)
      toast.success('Category created')
      setModalOpen(false)
      refetch()
    } catch {
      toast.error('Save failed')
    }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.name}"?`)) return
    try {
      await skillService.deleteCategory(row.id)
      toast.success('Category deleted')
      refetch()
    } catch {
      toast.error('Delete failed')
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Skill Categories</h1>
      <DataTable columns={columns} rows={categories || []} onAdd={() => setModalOpen(true)} onEdit={() => {}} onDelete={handleDelete} addLabel="Add Category" />
      <FormModal open={modalOpen} title="Add Category" fields={fields} initialValues={{}} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
