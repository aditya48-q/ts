import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalDetails } from '../../data/portfolio';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

export function ContactSection() {
  return (
    <section id="contact" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Open to opportunities, collaborations, and ambitious ideas"
          description="If you want to build something thoughtful, polished, or AI-assisted, this is the best place to start."
        />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="p-7 sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Direct contact</p>
            <h3 className="mt-3 text-3xl font-semibold text-text">Let’s build something sharp.</h3>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              I am currently focused on frontend development, clear UI systems, and stronger problem-solving. Feel free to
              reach out for internships, collaborations, or project discussions.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${personalDetails.email}`}
                className="flex items-center gap-4 rounded-2xl border border-border/70 bg-bg/70 p-4 text-text transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                  <FiMail />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">Email</p>
                  <p className="text-sm font-medium">{personalDetails.email}</p>
                </div>
              </a>

              <a
                href={personalDetails.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border/70 bg-bg/70 p-4 text-text transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                  <FiGithub />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">GitHub</p>
                  <p className="text-sm font-medium">aditya48-q</p>
                </div>
              </a>

              <a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border/70 bg-bg/70 p-4 text-text transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white">
                  <FiLinkedin />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">LinkedIn</p>
                  <p className="text-sm font-medium">Aditya Gupta</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/a7di___/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border/70 bg-bg/70 p-4 text-text transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white">
                  <FiInstagram />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">Instagram</p>
                  <p className="text-sm font-medium">a7di___</p>
                </div>
              </a>
            </div>
          </GlassCard>

          <GlassCard className="relative overflow-hidden p-7 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.16),transparent_30%)]" />
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted">Quick action</p>
              <h3 className="mt-3 text-3xl font-semibold text-text">A polished first impression.</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
                This contact block is designed for low-friction outreach and clear next steps. The site keeps motion subtle
                so the message remains the focus.
              </p>

              <form action="https://formspree.io/f/xjgjzjzk" method="POST" className="mt-8 space-y-4">
                <input type="hidden" name="_subject" value="New message from Aditya Gupta portfolio" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-muted">Your Name</span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border border-border/70 bg-bg/70 px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted/70 focus:border-accent focus:shadow-glow"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-muted">Your Email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-border/70 bg-bg/70 px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted/70 focus:border-accent focus:shadow-glow"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-muted">Message</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    className="w-full resize-none rounded-2xl border border-border/70 bg-bg/70 px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted/70 focus:border-accent focus:shadow-glow"
                  />
                </label>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <AnimatedButton as="button" type="submit" className="w-full sm:w-auto">
                    Send Message
                  </AnimatedButton>
                  <AnimatedButton
                    as="a"
                    href={personalDetails.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group border border-border/70 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-text shadow-none hover:shadow-glow dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
                  >
                    <FiGithub className="mr-2 text-base" />
                    View GitHub
                    <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </AnimatedButton>
                </div>
              </form>
            </motion.div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
