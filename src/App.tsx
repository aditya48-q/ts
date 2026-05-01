import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { EducationSection } from './components/sections/EducationSection';
import { Footer } from './components/sections/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { LearningSection } from './components/sections/LearningSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { Navbar } from './components/layout/Navbar';
import { BackToTopButton } from './components/ui/BackToTopButton';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { useActiveSection } from './hooks/useActiveSection';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useTheme } from './hooks/useTheme';
import { navigationLinks } from './data/portfolio';

const ThreeBackground = lazy(() =>
  import('./components/sections/ThreeBackground').then((module) => ({ default: module.ThreeBackground })),
);

const sectionIds = navigationLinks.map((link) => link.id);

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(sectionIds);
  const scrollProgress = useScrollProgress();
  const showBackToTop = scrollProgress > 7;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${(event.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--cursor-y', `${(event.clientY / window.innerHeight) * 100}%`);
    };

    window.addEventListener('pointermove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-text transition-colors duration-300">
      <ScrollProgressBar progress={scrollProgress} />
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.main
          key={theme}
          className="relative"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Suspense
            fallback={
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.08),transparent_30%)]" />
            }
          >
            <ThreeBackground />
          </Suspense>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <LearningSection />
          <ContactSection />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTopButton visible={showBackToTop} />
    </div>
  );
}
