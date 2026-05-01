import { motion } from 'framer-motion';
import { education } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

export function EducationSection() {
  return (
    <section id="education" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation and early milestones"
          description="Education, school achievements, and the context behind the work being built today."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <GlassCard className="h-full p-6 sm:p-7">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.place}</p>
                <h3 className="mt-3 text-2xl font-semibold text-text">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.detail}</p>
                <p className="mt-3 text-sm font-medium text-accent">{item.meta}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
