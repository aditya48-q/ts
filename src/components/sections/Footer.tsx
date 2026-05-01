import { personalDetails } from '../../data/portfolio';

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-card/40">
      <div className="section-shell flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {personalDetails.name}. Crafted with React, Tailwind CSS, Framer Motion, and Three.js.
        </p>
        <p className="text-sm text-muted">Computer Science Student · Building with clarity, motion, and intent.</p>
      </div>
    </footer>
  );
}
