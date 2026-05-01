import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { AnimatedButton } from './AnimatedButton';

interface BackToTopButtonProps {
  visible: boolean;
}

export function BackToTopButton({ visible }: BackToTopButtonProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <AnimatedButton
            as="a"
            href="#home"
            className="h-12 w-12 rounded-full px-0 shadow-glow"
            aria-label="Back to top"
          >
            <FiArrowUp className="text-lg" />
          </AnimatedButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
