import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiDownload, FiCode } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle.jsx";
import PrimaryButton from "../buttons/PrimaryButton.jsx";
import { NAV_LINKS } from "../../constants/navLinks.js";
import useFetch from "../../hooks/useFetch.js";
import useActiveSection from "../../hooks/useActiveSection.js";
import aboutService from "../../services/aboutService.js";
import logoImg from "../../assets/images/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data: about } = useFetch(() => aboutService.get(), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  // ---- Active link highlighting (presentation only) ----
  const onHome = location.pathname === "/";
  const sectionIds = [
    ...NAV_LINKS.map((l) => l.to.split("#")[1]),
    "education", // not in the nav, so it keeps "Experience" lit
  ];
  const scrollActive = useActiveSection(sectionIds, onHome);
  const pathActive = location.pathname.startsWith("/projects")
    ? "projects"
    : location.pathname.startsWith("/blog")
    ? "blog"
    : "";
  const activeId = onHome
    ? scrollActive === "education"
      ? "experience"
      : scrollActive
    : pathActive;
  const isActive = (link) => link.to.split("#")[1] === activeId;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-bg-dark/80 border-b border-slate-200/60 dark:border-white/10 shadow-lg shadow-black/5 py-2.5"
          : "bg-transparent py-3.5"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8">
        {/* Left: Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="neon-ring relative p-0.5 rounded-xl bg-gradient-to-tr from-primary via-indigo-500 to-secondary shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden flex items-center justify-center">
            <img
              src={logoImg}
              alt="Amit Kumar Logo"
              className="h-8 w-auto max-w-[120px] object-contain rounded-[10px] bg-slate-950 px-1 py-0.5"
            />
          </div>
          <span className="font-display font-extrabold text-xl md:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary-light dark:to-white group-hover:from-primary group-hover:to-secondary transition-all duration-300 whitespace-nowrap">
            {about?.fullName?.split(" ")[0] || "Vivek"}.dev
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-0.5 p-1.5 rounded-full bg-slate-100/80 dark:bg-white/[0.05] border border-slate-200/70 dark:border-white/10 backdrop-blur-md shadow-inner shadow-slate-200/40 dark:shadow-none">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={active ? "true" : undefined}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap ${
                  active
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-light hover:bg-white dark:hover:bg-white/10"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-600 to-secondary shadow-lg shadow-primary/40"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <ThemeToggle />
          {about?.resumeUrl && (
            <a
              href={about.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <button className="h-9 px-4 rounded-full text-xs font-bold bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white hover:border-primary transition-all inline-flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm">
                <FiDownload size={14} /> Resume
              </button>
            </a>
          )}
          <Link to="/#contact" className="shrink-0">
            <PrimaryButton className="!h-9 !py-0 !px-5 text-xs font-bold whitespace-nowrap">
              Hire Me
            </PrimaryButton>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 lg:hidden shrink-0">
          <ThemeToggle />
          <button
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-lg text-slate-800 dark:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden backdrop-blur-2xl bg-white/95 dark:bg-bg-dark/95 border-b border-slate-200 dark:border-white/10 shadow-xl"
          >
            <div className="flex flex-col gap-1.5 px-6 py-6">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center justify-end gap-2.5 w-full px-4 py-2.5 rounded-2xl text-sm font-bold transition-all text-right ${
                      active
                        ? "text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 border border-primary/30"
                        : "text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-primary-light hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        active
                          ? "bg-primary dark:bg-primary-light scale-100"
                          : "bg-transparent scale-0"
                      }`}
                    />
                  </Link>
                );
              })}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3 w-full">
                {about?.resumeUrl && (
                  <a
                    href={about.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full"
                  >
                    <button className="w-full py-3 rounded-2xl text-sm font-bold bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-white/20 transition-all">
                      <FiDownload /> Resume
                    </button>
                  </a>
                )}
                <Link
                  to="/#contact"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  <PrimaryButton className="w-full justify-center py-3 text-sm rounded-2xl">
                    Hire Me
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
