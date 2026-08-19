import { FiEdit2, FiTrash2, FiPlus, FiInbox } from 'react-icons/fi'

export default function DataTable({ columns, rows, onAdd, onEdit, onDelete, addLabel = 'Add New' }) {
  return (
    <div className="space-y-4">
      {onAdd && (
        <div className="flex justify-end">
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            <FiPlus size={16} /> {addLabel}
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 dark:bg-white/[0.05] border-b border-slate-200/60 dark:border-white/10 font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-4 font-bold">{col.label}</th>
              ))}
              {(onEdit || onDelete) && <th className="px-5 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-12 text-slate-400">
                  <FiInbox className="mx-auto text-3xl mb-2 text-slate-300 dark:text-slate-600" />
                  No records found. Click "{addLabel}" to create one.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-4 text-slate-800 dark:text-slate-200 font-medium">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={14} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
