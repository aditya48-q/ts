import { motion } from 'framer-motion';
import { skillGroups } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

export function SkillsSection() {
  return (
    <section id="skills" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Skills"
          title="A visual snapshot of strengths"
          description="A balanced skill profile covering programming, web development, core CS concepts, and AI-assisted workflows."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.55, delay: groupIndex * 0.06 }}
            >
              <GlassCard className="h-full p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-text">{group.title}</h3>
                <div className="mt-6 space-y-5">
                  {group.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="font-medium text-text">{skill.name}</span>
                        <span className="text-muted">{skill.level}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-border/40">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
