import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { navigationLinks, personalDetails } from '../../data/portfolio';
import { ThemeToggle } from '../ui/ThemeToggle';

interface NavbarProps {
  activeSection: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Navbar({ activeSection, theme, toggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-3 text-text">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-blue-500/25">
            AG
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">{personalDetails.name}</p>
            <p className="text-xs text-muted">{personalDetails.role}</p>
          </div>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-border/60 bg-bg/50 px-2 py-1 lg:flex">
          {navigationLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-text/80 transition hover:text-text"
              >
                {isActive ? (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-card shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 text-text transition hover:shadow-glow lg:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-3 max-w-7xl lg:hidden"
          >
            <div className="glass-panel rounded-3xl p-3 shadow-xl">
              <div className="grid gap-2">
                {navigationLinks.map((link) => {
                  const isActive = activeSection === link.id;

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        isActive ? 'bg-card text-text shadow-sm' : 'text-muted hover:bg-bg/70 hover:text-text'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
