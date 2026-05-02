import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowDownLeft, FiMinimize2, FiZap } from 'react-icons/fi';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import type { ChatMessage as ChatMessageType } from './useChatbot';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatWindow({ messages, isLoading, value, onChange, onSend, onClose, bottomRef }: ChatWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 16 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="pointer-events-auto flex h-[min(500px,calc(100vh-6rem))] w-[calc(100vw-1.25rem)] max-w-[24rem] flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/85 shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur-2xl sm:w-[24rem]"
      role="dialog"
      aria-label="Portfolio assistant"
      aria-modal="false"
    >
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 text-white shadow-glow">
            <FiZap />
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Portfolio Assistant</p>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Ready to help
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Minimize chatbot"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-bg/70 text-muted transition hover:text-text focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          <FiMinimize2 />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <div className="space-y-3">
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {isLoading ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-border/70 bg-card/90 px-4 py-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5" aria-label="Assistant is typing">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent/80 [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent/60 [animation-delay:240ms]" />
                </span>
              </div>
            </motion.div>
          ) : null}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-border/70 bg-bg/40">
        <ChatInput value={value} onChange={onChange} onSend={onSend} disabled={isLoading} />
        <div className="px-4 pb-3 text-[11px] leading-5 text-muted sm:px-5">
          Try projects, skills, contact, resume, or about.
          <span className="ml-2 inline-flex items-center gap-1 text-accent">
            <FiArrowDownLeft /> Press Enter to send
          </span>
        </div>
      </div>
    </motion.div>
  );
}