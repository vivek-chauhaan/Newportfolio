import toast from 'react-hot-toast'
import { FiCheck, FiTrash2 } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch.js'
import contactService from '../../services/contactService.js'
import Loader from '../../components/common/Loader.jsx'

export default function ContactMessages() {
  const { data, loading, refetch } = useFetch(() => contactService.getAll({ size: 50 }), [])

  const handleRead = async (id) => {
    await contactService.markRead(id)
    refetch()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try { await contactService.delete(id); toast.success('Deleted'); refetch() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Contact Messages</h1>
      <div className="space-y-3">
        {(data?.content || []).length === 0 && <p className="text-current/50">No messages yet.</p>}
        {(data?.content || []).map((msg) => (
          <div key={msg.id} className={`p-5 rounded-2xl border ${msg.read ? 'bg-white/5 border-white/10' : 'bg-primary/5 border-primary/30'}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold">{msg.name} <span className="text-current/50 font-normal">— {msg.email} {msg.phone ? `| 📞 ${msg.phone}` : ''}</span></p>
                <p className="text-xs text-current/50">{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                {!msg.read && (
                  <button onClick={() => handleRead(msg.id)} className="p-2 rounded-lg bg-white/10 hover:bg-secondary/70">
                    <FiCheck size={14} />
                  </button>
                )}
                <button onClick={() => handleDelete(msg.id)} className="p-2 rounded-lg bg-white/10 hover:bg-red-500/70">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
            {msg.subject && <p className="text-sm font-medium mb-1">{msg.subject}</p>}
            <p className="text-sm text-current/70">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
