import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { projects } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <GlassCard className="relative h-full overflow-hidden p-6 transition duration-300 group-hover:shadow-glow sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_26%)] opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-muted">{project.featured}</p>
              <h3 className="mt-3 text-2xl font-semibold text-text">{project.title}</h3>
            </div>
            <div className="rounded-full border border-border/70 bg-bg/70 px-3 py-1 text-xs font-semibold text-accent">
              {project.tech[0]}
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-muted sm:text-base">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/70 bg-bg/70 px-3 py-1 text-xs font-medium text-text"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border/70 bg-bg/70 px-4 py-3 text-sm font-semibold text-text transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              Live Demo <FiExternalLink className="ml-2" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              GitHub <FiGithub className="ml-2" />
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Projects"
          title="Interactive work with room to explore"
          description="Selected projects that show design taste, frontend fundamentals, and the progression from simple layouts to more polished interfaces."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
