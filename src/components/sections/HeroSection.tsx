import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiZap } from 'react-icons/fi';
import { personalDetails } from '../../data/portfolio';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GlassCard } from '../ui/GlassCard';

const roles = ['Developer', 'Problem Solver', 'AI Enthusiast'];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRoleIndex((currentIndex) => (currentIndex + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative z-10 max-w-3xl">
          <motion.p
            className="mb-5 inline-flex items-center rounded-full border border-border/70 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-muted backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {personalDetails.role}
          </motion.p>

          <motion.h1
            className="text-balance text-5xl font-semibold tracking-tight text-text sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            I build intelligent web experiences
          </motion.h1>

          <motion.div
            className="mt-5 flex items-center gap-3 text-lg text-muted sm:text-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
          >
            <span className="font-medium text-text">{personalDetails.tagline}</span>
          </motion.div>

          <motion.div
            className="mt-6 flex h-10 items-center gap-3 text-base text-muted sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
          >
            <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Currently
            </span>
            <motion.span
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="font-semibold text-text"
            >
              {roles[roleIndex]}
            </motion.span>
          </motion.div>

          <motion.p
            className="mt-7 max-w-2xl text-balance text-base leading-8 text-muted sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
          >
            {personalDetails.summary}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.55 }}
          >
            <AnimatedButton as="a" href="#projects">
              View Projects <FiArrowRight className="ml-2" />
            </AnimatedButton>
            <AnimatedButton
              as="a"
              href="#contact"
              className="border border-border/70 bg-card/70 text-text shadow-none hover:shadow-glow"
              style={{ backgroundImage: 'none' }}
            >
              Contact Me <FiMail className="ml-2" />
            </AnimatedButton>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.62 }}
          >
            {[
              'React + Tailwind',
              'Motion-first UI',
              '3D background',
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-xs font-medium text-muted backdrop-blur"
              >
                <FiZap className="text-[0.7rem] text-accent" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.72 }}
          >
            <a
              href={personalDetails.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 text-text transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <FiGithub />
            </a>
            <a
              href={personalDetails.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 text-text transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <FiLinkedin />
            </a>
            <a
              href={`mailto:${personalDetails.email}`}
              className="rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-medium text-text transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              {personalDetails.email}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 lg:pl-8"
          initial={{ opacity: 0, scale: 0.95, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <GlassCard className="relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.18),transparent_28%)]" />
            <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -right-6 bottom-8 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Portfolio status</p>
                  <h2 className="mt-2 text-2xl font-semibold text-text">Building high-signal web products</h2>
                </div>
                <div className="rounded-full border border-border/70 bg-card/80 px-3 py-2 text-xs font-semibold text-accent">
                  Available for projects
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Focus', value: 'Frontend + AI workflows' },
                  { label: 'Core stack', value: 'React, Tailwind, Motion' },
                  { label: 'Learning', value: 'DSA, system design, UX' },
                  { label: 'Approach', value: 'Polish, performance, clarity' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/70 bg-bg/60 p-4">
                    <p className="text-xs uppercase tracking-[0.26em] text-muted">{item.label}</p>
                    <p className="mt-2 text-sm font-medium text-text">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-border/70 bg-bg/60 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-muted">Interface philosophy</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Premium portfolios feel tactile, confident, and responsive. This build combines motion, subtle depth, and
                  high-contrast typography to keep the content sharp across themes.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Focus', value: 'Frontend craft' },
                  { label: 'Energy', value: 'AI-assisted' },
                  { label: 'Goal', value: 'Top-tier internships' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/70 bg-bg/55 px-4 py-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">{item.label}</p>
                    <p className="mt-2 text-sm font-medium text-text">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
