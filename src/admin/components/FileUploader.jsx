import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiUploadCloud } from 'react-icons/fi'
import uploadService from '../../services/uploadService.js'

export default function FileUploader({ type, value, onUploaded, label = 'Upload File' }) {
  const [uploading, setUploading] = useState(false)

  const handleChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const meta = await uploadService.upload(type, file)
      onUploaded(meta.filePath)
      toast.success('File uploaded')
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 border-dashed cursor-pointer hover:bg-white/10 text-sm">
        <FiUploadCloud />
        {uploading ? 'Uploading...' : label}
        <input type="file" className="hidden" onChange={handleChange} />
      </label>
      {value && <p className="text-xs text-current/50 mt-1 truncate">{value}</p>}
    </div>
  )
}
