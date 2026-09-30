import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../admin/components/Sidebar.jsx";
import AdminNavbar from "../admin/components/AdminNavbar.jsx";

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div
      className="
        h-screen
        w-full
        overflow-hidden

        flex

        bg-slate-50
        dark:bg-bg-dark

        text-slate-900
        dark:text-white
      "
    >
      {/* =========================================
          SIDEBAR
      ========================================== */}

      <Sidebar mobileOpen={mobileMenuOpen} onClose={closeMobileMenu} />

      {/* =========================================
          RIGHT SIDE
      ========================================== */}

      <div
        className="
          flex
          flex-col
          flex-1
          min-w-0
          h-full
          overflow-hidden
        "
      >
        {/* =======================================
            NAVBAR

            Does NOT scroll
        ======================================== */}

        <AdminNavbar onToggleMobileMenu={toggleMobileMenu} />

        {/* =======================================
            MAIN CONTENT

            ONLY THIS AREA SCROLLS
        ======================================== */}

        <main
          className="
            flex-1
            min-h-0

            overflow-y-auto
            overflow-x-hidden

            scroll-smooth
          "
        >
          <div
            className="
              w-full
              max-w-7xl
              mx-auto

              p-5
              md:p-4
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
