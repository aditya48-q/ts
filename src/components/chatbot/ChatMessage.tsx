import { motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType } from './useChatbot';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm sm:max-w-[78%] ${
          isUser
            ? 'rounded-br-md bg-accent text-white shadow-[0_10px_30px_rgba(79,70,229,0.18)]'
            : 'rounded-bl-md border border-border/70 bg-card/90 text-text'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}