import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../admin/components/Sidebar.jsx'
import AdminNavbar from '../admin/components/AdminNavbar.jsx'

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-bg-dark text-slate-900 dark:text-white">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex-1 min-w-0">
        <AdminNavbar onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="p-5 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
