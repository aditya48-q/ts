import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiZap } from 'react-icons/fi';
import { personalDetails } from '../../data/portfolio';
import { ProfileImage } from '../ui/ProfileImage';
import { AnimatedButton } from '../ui/AnimatedButton';

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
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="relative z-10 order-2 max-w-3xl lg:order-1">
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
          className="relative z-10 order-1 flex justify-center lg:order-2 lg:justify-end lg:pl-8"
          initial={{ opacity: 0, scale: 0.95, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="relative flex w-full items-center justify-center lg:justify-end">
            <div className="absolute -z-10 h-[12rem] w-[12rem] rounded-full bg-blue-500/15 blur-3xl sm:h-[16rem] sm:w-[16rem] lg:h-[18rem] lg:w-[18rem]" />
            <ProfileImage className="mx-auto lg:mx-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
