import { motion } from 'framer-motion';

interface ProfileImageProps {
  className?: string;
}

const profileImageSrc =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1a-nHQZMmyZdXKypbFqUqXbxRGvmORRRRLQ&s';

export function ProfileImage({ className = '' }: ProfileImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
      transition={{
        opacity: { duration: 0.5, ease: 'easeOut' },
        scale: { duration: 0.5, ease: 'easeOut' },
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileHover={{ scale: 1.05 }}
      className={`relative isolate ${className}`}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.28),transparent_68%)] blur-2xl" />
      <div className="relative rounded-full bg-gradient-to-br from-accent via-violet-500 to-cyan-400 p-[3px] shadow-glow transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(96,165,250,0.35),0_30px_90px_rgba(37,99,235,0.24)]">
        <div className="rounded-full bg-card/60 p-2 backdrop-blur-xl">
          <div className="relative overflow-hidden rounded-full border border-white/10 bg-bg/70">
            <img
              src={profileImageSrc}
              alt="Aditya Gupta profile picture"
              width={240}
              height={240}
              loading="lazy"
              decoding="async"
              className="h-[120px] w-[120px] rounded-full object-cover object-center sm:h-40 sm:w-40 lg:h-[220px] lg:w-[220px]"
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
    </motion.div>
  );
}