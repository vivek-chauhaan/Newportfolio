import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import aboutService from '../../services/aboutService.js'
import FileUploader from '../components/FileUploader.jsx'
import Loader from '../../components/common/Loader.jsx'

export default function AboutManage() {
  const { data: about, loading, refetch } = useFetch(() => aboutService.get(), [])
  const [form, setForm] = useState({})

  useEffect(() => { if (about) setForm(about) }, [about])

  const handleChange = (name, value) => setForm((p) => ({ ...p, [name]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await aboutService.update(form)
      toast.success('About updated')
      refetch()
    } catch {
      toast.error('Update failed')
    }
  }

  if (loading) return <Loader />

  const inputCls = 'w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50'

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">About</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input className={inputCls} placeholder="Full Name" value={form.fullName || ''} onChange={(e) => handleChange('fullName', e.target.value)} />
          <input className={inputCls} placeholder="Designation" value={form.designation || ''} onChange={(e) => handleChange('designation', e.target.value)} />
        </div>
        <input className={inputCls} placeholder="Greeting (e.g. Hi, I'm)" value={form.greeting || ''} onChange={(e) => handleChange('greeting', e.target.value)} />
        <textarea className={inputCls} rows={4} placeholder="Description" value={form.description || ''} onChange={(e) => handleChange('description', e.target.value)} />
        <div className="grid sm:grid-cols-3 gap-4">
          <input className={inputCls} type="number" placeholder="Years Experience" value={form.yearsOfExperience || ''} onChange={(e) => handleChange('yearsOfExperience', Number(e.target.value))} />
          <input className={inputCls} type="number" placeholder="Projects Completed" value={form.projectsCompleted || ''} onChange={(e) => handleChange('projectsCompleted', Number(e.target.value))} />
          <input className={inputCls} type="number" placeholder="Happy Clients" value={form.happyClients || ''} onChange={(e) => handleChange('happyClients', Number(e.target.value))} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <FileUploader type="profile" value={form.photoUrl} onUploaded={(path) => handleChange('photoUrl', path)} label="Upload Profile Photo" />
          <FileUploader type="resume" value={form.resumeUrl} onUploaded={(path) => handleChange('resumeUrl', path)} label="Upload Resume" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <input className={inputCls} placeholder="Email" value={form.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
          <input className={inputCls} placeholder="Phone" value={form.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
          <input className={inputCls} placeholder="Address" value={form.address || ''} onChange={(e) => handleChange('address', e.target.value)} />
        </div>
        <button type="submit" className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white">
          Save Changes
        </button>
      </form>
    </div>
  )
}
