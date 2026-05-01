import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-3xl text-center"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-accent/90">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{description}</p> : null}
    </motion.div>
  );
}
