import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 text-text shadow-sm backdrop-blur-md transition hover:shadow-glow"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -25, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 25, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25 }}
      >
        {theme === 'dark' ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
      </motion.div>
    </motion.button>
  );
}
