import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const canSend = Boolean(value.trim()) && !disabled;

  return (
    <form
      className="flex items-end gap-2 border-t border-border/70 px-3 py-3 sm:px-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (canSend) {
          onSend();
        }
      }}
    >
      <label className="sr-only" htmlFor="chatbot-input">
        Ask about my work
      </label>
      <input
        id="chatbot-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask about my work..."
        aria-label="Ask about my work"
        className="min-h-12 flex-1 rounded-full border border-border/70 bg-bg/80 px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white transition duration-200 hover:scale-105 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-45"
      >
        <FiSend className="text-base" />
      </button>
    </form>
  );
}