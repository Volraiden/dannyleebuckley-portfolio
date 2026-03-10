import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DANNY_INTRO = `Hey, I'm Danny (Daniel Lee Buckley). You can chat with me here or book a session — just say you want to book and I'll walk you through it (name, location, when you want it, etc.). I'll then send the details straight to Daniel so he can get back to you. What do you need?`;

type Message = { role: 'user' | 'assistant'; content: string };

type AIChatProps = {
  open: boolean;
  onClose: () => void;
};

export function AIChat({ open, onClose }: AIChatProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const showIntro = messages.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showIntro]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data.error || data.message || (typeof data === 'string' ? data : res.statusText);
        const err = new Error(msg) as Error & { status?: number };
        err.status = res.status;
        throw err;
      }

      const reply = data.reply ?? data.message ?? 'Something went wrong.';
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);

      if (data.booking) {
        try {
          const bookingRes = await fetch('/.netlify/functions/submit-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data.booking),
          });
          const bookingData = await bookingRes.json().catch(() => ({}));
          if (!bookingRes.ok || bookingData.ok === false) {
            setMessages((m) => [
              ...m,
              {
                role: 'assistant',
                content:
                  "I tried to email Daniel your booking but it didn't fully go through. Copy your details and send them to Danielleebuckley@gmail.com so nothing gets lost.",
              },
            ]);
          } else {
            setMessages((m) => [
              ...m,
              {
                role: 'assistant',
                content:
                  "Got you — I’ve sent your booking details straight to Daniel’s email. He’ll hit you back to lock in the session.",
              },
            ]);
          }
        } catch {
          setMessages((m) => [
            ...m,
            {
              role: 'assistant',
              content:
                "I couldn't auto-email your booking — copy what you sent and email it to Danielleebuckley@gmail.com so he definitely sees it.",
            },
          ]);
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      const status = (e as Error & { status?: number }).status;
      const isNotFound = status === 404 || msg.includes('Not Found');
      const isConfigError = msg.includes("isn't set up") || msg.includes('DEEPSEEK');
      let content: string;
      if (isNotFound) {
        content = "AI chat only works when the site is deployed on Netlify (or when you run \"netlify dev\" locally). Right now the chat server isn't available — email Daniel directly or try on the live site.";
      } else if (isConfigError) {
        content = msg;
      } else {
        content = `Sorry, something went wrong: ${msg}. Try again or email Daniel directly.`;
      }
      setMessages((m) => [...m, { role: 'assistant', content }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="ai-chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.aside
            className="ai-chat-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="ai-chat-header">
              <div className="ai-chat-title">
                <MessageCircle size={22} />
                <span>{t('navAIChat')}</span>
              </div>
              <button type="button" className="ai-chat-close" onClick={onClose} aria-label="Close chat">
                <X size={20} />
              </button>
            </div>

            <div className="ai-chat-messages">
              {showIntro && (
                <div className="ai-chat-message assistant">
                  <div className="ai-chat-avatar">D</div>
                  <div className="ai-chat-bubble">
                    <p>{DANNY_INTRO}</p>
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`ai-chat-message ${msg.role}`}>
                  {msg.role === 'assistant' && <div className="ai-chat-avatar">D</div>}
                  <div className="ai-chat-bubble">
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="ai-chat-message assistant">
                  <div className="ai-chat-avatar">D</div>
                  <div className="ai-chat-bubble ai-chat-typing">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              className="ai-chat-form"
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            >
              <input
                type="text"
                className="ai-chat-input"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button type="submit" className="ai-chat-send" disabled={loading || !input.trim()}>
                <Send size={18} />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
