import { motion } from 'framer-motion';
import { learningHighlights } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

export function LearningSection() {
  return (
    <section id="building" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="What I'm Building"
          title="The work-in-progress layer behind the portfolio"
          description="A snapshot of the habits, goals, and learning loops shaping the next version of the developer behind this website."
        />

        <GlassCard className="overflow-hidden p-6 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-2">
            {learningHighlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-2xl border border-border/70 bg-bg/70 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 shadow-[0_0_18px_rgba(96,165,250,0.55)]" />
                  <p className="text-sm leading-7 text-muted sm:text-base">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
