import { motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiZap } from 'react-icons/fi';
import { personalDetails } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

const highlights = [
  {
    icon: FiZap,
    title: 'AI-assisted development',
    text: 'Using AI as a productivity multiplier while keeping code quality, structure, and judgment in focus.',
  },
  {
    icon: FiBookOpen,
    title: 'Continuous learning',
    text: 'Actively improving in DSA, OOP, and frontend engineering through projects and practice.',
  },
  {
    icon: FiAward,
    title: 'Problem solving mindset',
    text: 'Motivated by clear outputs, careful iteration, and building interfaces that feel refined.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="About"
          title="A student portfolio built to feel like a product launch"
          description={personalDetails.summary}
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <GlassCard className="p-7 sm:p-8">
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65 }}
            >
              <p className="text-sm uppercase tracking-[0.28em] text-muted">Who I am</p>
              <p className="text-base leading-8 text-muted sm:text-lg">
                I am <span className="font-semibold text-text">Aditya Gupta</span>, a Computer Science student focused on
                building intuitive interfaces, learning modern development workflows, and turning ideas into polished web
                experiences.
              </p>
              <p className="text-base leading-8 text-muted sm:text-lg">
                My interest sits at the intersection of frontend engineering, AI tools, and practical problem solving. I
                like systems that feel clear to use and satisfying to interact with.
              </p>
            </motion.div>
          </GlassCard>

          <div className="grid gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <GlassCard className="p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
