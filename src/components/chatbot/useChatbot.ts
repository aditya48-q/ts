import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { personalDetails, projects, skillGroups } from '../../data/portfolio';

export type ChatRole = 'assistant' | 'user';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  pending?: boolean;
}

type ChatIntent = 'projects' | 'skills' | 'contact' | 'resume' | 'about' | 'education' | 'building';

const WELCOME_MESSAGE = "Hi, I'm Aditya's assistant. Ask me anything about his work.";
const FALLBACK_MESSAGE = 'I can help you explore this portfolio. Try asking about projects, skills, or contact.';

function createMessage(role: ChatRole, content: string, pending = false): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    pending,
  };
}

function normalizeMessage(message: string) {
  return message.toLowerCase().replace(/[?!.:,/\\-]/g, ' ');
}

function detectIntent(message: string): ChatIntent | null {
  const normalized = normalizeMessage(message);

  if (/\b(project|projects|portfolio|work)\b/.test(normalized)) {
    return 'projects';
  }

  if (/\b(skill|skills|tech|stack|technologies)\b/.test(normalized)) {
    return 'skills';
  }

  if (/\b(contact|email|reach out|linkedin|github|instagram)\b/.test(normalized)) {
    return 'contact';
  }

  if (/\b(resume|cv|download)\b/.test(normalized)) {
    return 'resume';
  }

  if (/\b(about you|about|who are you|intro|yourself)\b/.test(normalized)) {
    return 'about';
  }

  if (/\b(education|study|college|school)\b/.test(normalized)) {
    return 'education';
  }

  if (/\b(building|learning|currently|now)\b/.test(normalized)) {
    return 'building';
  }

  return null;
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function downloadResume() {
  if (typeof document === 'undefined') {
    return;
  }

  const resumeText = [
    'Aditya Gupta',
    'Computer Science Student',
    '',
    'Summary',
    personalDetails.summary,
    '',
    'Highlights',
    '- Frontend development with React, TypeScript, Tailwind, and Framer Motion',
    '- AI-assisted development and prompt engineering',
    '- Problem solving, DSA, and core computer science concepts',
    '',
    'Selected Projects',
    ...projects.map((project) => `- ${project.title}: ${project.description}`),
    '',
    'Skills',
    ...skillGroups.flatMap((group) => [`- ${group.title}: ${group.items.map((item) => item.name).join(', ')}`]),
    '',
    `Email: ${personalDetails.email}`,
    `GitHub: ${personalDetails.github}`,
    `LinkedIn: ${personalDetails.linkedin}`,
  ].join('\n');

  const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Aditya_Gupta_Resume.txt';
  link.click();
  URL.revokeObjectURL(url);
}

function getLocalResponse(message: string): { response: string; action?: () => void } {
  const intent = detectIntent(message);

  if (intent === 'projects') {
    return {
      response: `He has built ${projects.length} selected projects, including ${projects[0]?.title}, ${projects[1]?.title}, and ${projects[2]?.title}. Jumping to the projects section now.`,
      action: () => scrollToSection('projects'),
    };
  }

  if (intent === 'skills') {
    return {
      response: 'His skills cover programming, web development, core CS concepts, AI tools, and communication. I am opening the skills section now.',
      action: () => scrollToSection('skills'),
    };
  }

  if (intent === 'contact') {
    return {
      response: `You can reach him at ${personalDetails.email}. I am scrolling to the contact section so the full set of links is visible.`,
      action: () => scrollToSection('contact'),
    };
  }

  if (intent === 'resume') {
    return {
      response: 'I am preparing a downloadable resume file for you now.',
      action: downloadResume,
    };
  }

  if (intent === 'about') {
    return {
      response: 'Aditya is a Computer Science student focused on frontend development, AI-assisted workflows, and polished user experiences.',
      action: () => scrollToSection('about'),
    };
  }

  if (intent === 'education') {
    return {
      response: 'He is currently studying Computer Science at IET DAVV with a focus on Business Systems. I am opening the education section now.',
      action: () => scrollToSection('education'),
    };
  }

  if (intent === 'building') {
    return {
      response: 'He is currently building interactive front ends, sharpening problem solving, and exploring AI-assisted development workflows.',
      action: () => scrollToSection('building'),
    };
  }

  return { response: FALLBACK_MESSAGE };
}

export async function sendMessageToAI(message: string, history: ChatMessage[] = []) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
  if (!apiKey) {
    throw new Error('AI is not configured.');
  }

  const model = (import.meta.env.VITE_OPENAI_MODEL as string | undefined) ?? 'gpt-4o-mini';
  const assistantContext = [
    `You are Aditya's portfolio assistant.`,
    `Keep replies short, helpful, and friendly.`,
    `Help users explore projects, skills, contact, resume, about, education, and building sections.`,
    `If appropriate, mention that the user can ask about projects, skills, or contact.`,
  ].join(' ');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        { role: 'system', content: assistantContext },
        ...history.slice(-6).map((entry) => ({ role: entry.role === 'assistant' ? 'assistant' : 'user', content: entry.content })),
        { role: 'user', content: message },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('AI response failed.');
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return payload.choices?.[0]?.message?.content?.trim() || FALLBACK_MESSAGE;
}

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([createMessage('assistant', WELCOME_MESSAGE)]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const hasConfiguredAI = Boolean(import.meta.env.VITE_OPENAI_API_KEY);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((currentValue) => !currentValue), []);

  const sendLocalResponse = useCallback((message: string) => {
    const { response, action } = getLocalResponse(message);
    setMessages((currentMessages) => [...currentMessages, createMessage('assistant', response)]);
    window.setTimeout(() => action?.(), 180);
  }, []);

  const sendMessage = useCallback(
    async (rawMessage?: string) => {
      const message = (rawMessage ?? input).trim();
      if (!message || isLoading) {
        return;
      }

      setInput('');
      setMessages((currentMessages) => [...currentMessages, createMessage('user', message)]);

      const intent = detectIntent(message);
      if (intent) {
        sendLocalResponse(message);
        return;
      }

      if (!hasConfiguredAI) {
        setMessages((currentMessages) => [...currentMessages, createMessage('assistant', FALLBACK_MESSAGE)]);
        return;
      }

      setIsLoading(true);
      try {
        const reply = await sendMessageToAI(message, messages);
        setMessages((currentMessages) => [...currentMessages, createMessage('assistant', reply)]);
      } catch {
        setMessages((currentMessages) => [...currentMessages, createMessage('assistant', FALLBACK_MESSAGE)]);
      } finally {
        setIsLoading(false);
      }
    },
    [hasConfiguredAI, input, isLoading, messages, sendLocalResponse],
  );

  const showTyping = useMemo(() => isLoading, [isLoading]);

  return {
    messages,
    input,
    setInput,
    isOpen,
    isLoading,
    showTyping,
    bottomRef,
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
  };
}