import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiUser,
  FiCode,
  FiFolder,
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiStar,
  FiFileText,
  FiLink,
  FiMail,
  FiSettings,
} from "react-icons/fi";

import logoImg from "../../assets/images/logo.png";

const NAV = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: FiGrid,
  },
  {
    to: "/admin/about",
    label: "About",
    icon: FiUser,
  },
  {
    to: "/admin/skills",
    label: "Skills",
    icon: FiCode,
  },
  {
    to: "/admin/projects",
    label: "Projects",
    icon: FiFolder,
  },
  {
    to: "/admin/experience",
    label: "Experience",
    icon: FiBriefcase,
  },
  {
    to: "/admin/education",
    label: "Education",
    icon: FiBookOpen,
  },
  {
    to: "/admin/certifications",
    label: "Certifications",
    icon: FiAward,
  },
  {
    to: "/admin/reviews",
    label: "Reviews",
    icon: FiStar,
  },
  {
    to: "/admin/blogs",
    label: "Blog",
    icon: FiFileText,
  },
  {
    to: "/admin/social-links",
    label: "Social Links",
    icon: FiLink,
  },
  {
    to: "/admin/contact-messages",
    label: "Messages",
    icon: FiMail,
  },
  {
    to: "/admin/settings",
    label: "Settings",
    icon: FiSettings,
  },
];

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* =================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`
          shrink-0
          h-full
          w-64

          flex
          flex-col

          bg-white/80
          dark:bg-[#11101f]/95

          border-r
          border-slate-200/80
          dark:border-white/10

          backdrop-blur-xl

          z-50

          transition-transform
          duration-300

          ${
            mobileOpen
              ? "fixed inset-y-0 left-0 translate-x-0"
              : "-translate-x-full md:translate-x-0 hidden md:flex"
          }
        `}
      >
        {/* =================================================
            LOGO / HEADER

            THIS NEVER SCROLLS
        ================================================== */}

        <div
          className="
            h-[102px]
            shrink-0

            px-6

            flex
            items-center

            border-b
            border-slate-200/60
            dark:border-white/10
          "
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo */}

            <div
              className="
                shrink-0
                p-[2px]
                rounded-xl

                bg-gradient-to-tr
                from-primary
                via-indigo-500
                to-secondary

                shadow-lg
                shadow-primary/20

                overflow-hidden
              "
            >
              <img
                src={logoImg}
                alt="Admin Portal Logo"
                className="
                  h-12
                  w-20

                  object-contain

                  rounded-lg

                  bg-slate-950

                  px-1
                  py-1
                "
              />
            </div>

            {/* Brand */}

            <h1
              className="
                font-display
                font-extrabold

                text-xl

                tracking-tight

                whitespace-nowrap

                text-slate-900
                dark:text-white
              "
            >
              Admin
              <span className="text-primary dark:text-primary-light">
                Portal
              </span>
            </h1>
          </div>
        </div>

        {/* =================================================
            NAVIGATION

            ONLY THIS PART CAN SCROLL
        ================================================== */}

        <nav
          className="
            flex-1
            min-h-0

            overflow-y-auto
            overflow-x-hidden
            p-4

            space-y-1

            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-slate-300
            dark:scrollbar-thumb-white/20
          "
        >
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `
                flex
                items-center
                gap-3

                w-full

                px-3
                py-2

                rounded-2xl

                text-sm
                font-bold

                transition-all
                duration-200

                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-primary
                      to-secondary

                      text-white

                      shadow-md
                      shadow-primary/20
                    `
                    : `
                      text-slate-600
                      dark:text-slate-300

                      hover:bg-slate-100
                      dark:hover:bg-white/10
                    `
                }
              `}
            >
              <Icon size={20} className="shrink-0" />

              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* =================================================
          MOBILE BACKDROP
      ================================================== */}

      {mobileOpen && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0

            bg-slate-950/60

            backdrop-blur-sm

            z-40

            md:hidden
          "
        />
      )}
    </>
  );
}
