import { FiLogOut, FiMenu, FiGlobe } from "react-icons/fi";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

import ThemeToggle from "../../components/common/ThemeToggle.jsx";

export default function AdminNavbar({ onToggleMobileMenu }) {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header
      className="
        shrink-0

        h-[76px]

        flex
        items-center
        justify-between

        px-6

        border-b
        border-slate-200/80
        dark:border-white/10

        bg-white/70
        dark:bg-[#11101f]/80

        backdrop-blur-xl

        z-30
      "
    >
      {/* =================================================
          LEFT SIDE
      ================================================== */}

      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Menu */}

        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="
               md:hidden

            shrink-0

            p-2.5

            rounded-xl

            bg-slate-100
            dark:bg-white/10

            text-slate-800
            dark:text-white

            hover:bg-slate-200
            dark:hover:bg-white/20

            transition-colors
          "
          aria-label="Open Navigation"
        >
          <FiMenu size={20} />
        </button>

        {/* User Information */}

        <div className="min-w-0">
          <p
            className="
              text-xs
              font-semibold

              text-slate-500
              dark:text-slate-400

              truncate
            "
          >
            Authenticated Admin Portal
          </p>

          <p
            className="
              text-sm
              font-bold

              text-slate-900
              dark:text-white

              truncate
            "
          >
            Logged in as{" "}
            <span
              className="
                text-primary
                dark:text-primary-light
              "
            >
              {user?.name || "Admin"}
            </span>
          </p>
        </div>
      </div>

      {/* =================================================
          RIGHT SIDE
      ================================================== */}

      <div className="flex items-center gap-3">
        {/* View Live Site */}

        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden
            sm:flex

            items-center
            gap-2

            px-4
            py-2

            rounded-xl

            text-sm
            font-bold

            bg-slate-100
            dark:bg-white/10

            text-slate-800
            dark:text-white

            border
            border-transparent

            hover:border-primary

            transition-all
          "
        >
          <FiGlobe size={17} />

          <span>View Live Site</span>
        </Link>

        {/* Theme */}

        <ThemeToggle />

        {/* Logout */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2

            px-4
            py-2

            rounded-xl

            text-sm
            font-bold

            bg-rose-500/10

            text-rose-600
            dark:text-rose-400

            hover:bg-rose-500/20

            transition-colors
          "
        >
          <FiLogOut size={16} />

          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
