import { useEffect, useState } from 'react'
import { FiX, FiCheck } from 'react-icons/fi'

export default function FormModal({ open, title, fields, initialValues, onClose, onSubmit }) {
  const [values, setValues] = useState(initialValues || {})

  useEffect(() => {
    setValues(initialValues || {})
  }, [initialValues, open])

  if (!open) return null

  const handleChange = (name, value) => setValues((prev) => ({ ...prev, [name]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" />

      {/* Modal Box */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-bg-darksurface border border-slate-200 dark:border-white/10 p-6 md:p-8 shadow-2xl z-10 text-slate-900 dark:text-white"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10 mb-6">
          <h2 className="font-display font-bold text-lg">{title}</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <FiX size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  required={f.required}
                  rows={4}
                  value={values[f.name] ?? ''}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              ) : f.type === 'checkbox' ? (
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!values[f.name]}
                    onChange={(e) => handleChange(f.name, e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-semibold">{f.label}</span>
                </label>
              ) : (
                <input
                  required={f.required}
                  type={f.type || 'text'}
                  value={values[f.name] ?? ''}
                  onChange={(e) => handleChange(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-xs"
        >
          <FiCheck /> Save Changes
        </button>
      </form>
    </div>
  )
}
