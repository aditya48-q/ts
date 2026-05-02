import { AnimatePresence, motion } from 'framer-motion';
import { FiMessageCircle, FiZap } from 'react-icons/fi';
import { ChatWindow } from './ChatWindow';
import { useChatbot } from './useChatbot';

export function Chatbot() {
  const {
    messages,
    input,
    setInput,
    isOpen,
    isLoading,
    showTyping,
    bottomRef,
    closeChat,
    toggleChat,
    sendMessage,
  } = useChatbot();

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <ChatWindow
            key="window"
            messages={messages}
            isLoading={showTyping}
            value={input}
            onChange={setInput}
            onSend={() => sendMessage()}
            onClose={closeChat}
            bottomRef={bottomRef}
          />
        ) : (
          <motion.button
            key="button"
            type="button"
            onClick={toggleChat}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.2 },
            }}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-border/70 bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-500 text-white shadow-[0_18px_50px_rgba(37,99,235,0.32)] outline-none focus:ring-2 focus:ring-accent/40"
            aria-label="Open portfolio assistant"
          >
            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition duration-300 group-hover:opacity-100" />
            <FiMessageCircle className="relative z-10 text-xl" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card text-[10px] font-bold text-accent shadow-lg">
              <FiZap />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}