import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch.js'
import settingsService from '../../services/settingsService.js'
import Loader from '../../components/common/Loader.jsx'

export default function WebsiteSettings() {
  const { data: settings, loading, refetch } = useFetch(() => settingsService.get(), [])
  const [form, setForm] = useState({})

  useEffect(() => { if (settings) setForm(settings) }, [settings])

  const handleChange = (name, value) => setForm((p) => ({ ...p, [name]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await settingsService.update(form)
      toast.success('Settings updated')
      refetch()
    } catch { toast.error('Update failed') }
  }

  if (loading) return <Loader />

  const inputCls = 'w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50'

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Website Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input className={inputCls} placeholder="Site Title" value={form.siteTitle || ''} onChange={(e) => handleChange('siteTitle', e.target.value)} />
        <input className={inputCls} placeholder="Site Tagline" value={form.siteTagline || ''} onChange={(e) => handleChange('siteTagline', e.target.value)} />
        <textarea className={inputCls} rows={3} placeholder="Meta Description" value={form.metaDescription || ''} onChange={(e) => handleChange('metaDescription', e.target.value)} />
        <input className={inputCls} placeholder="Favicon URL" value={form.favicon || ''} onChange={(e) => handleChange('favicon', e.target.value)} />
        <select className={inputCls} value={form.defaultTheme || 'dark'} onChange={(e) => handleChange('defaultTheme', e.target.value)}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!form.maintenanceMode} onChange={(e) => handleChange('maintenanceMode', e.target.checked)} />
          Maintenance Mode
        </label>
        <button type="submit" className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white">
          Save Settings
        </button>
      </form>
    </div>
  )
}
