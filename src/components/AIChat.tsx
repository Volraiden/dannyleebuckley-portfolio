import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, MessageSquare, Calendar, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type Intent = 'chat' | 'booking' | 'support' | null;
type Message = { role: 'user' | 'assistant'; content: string };
type BookingPayload = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  date?: string;
  sessionType?: string;
  notes?: string;
};

type AIChatProps = {
  open: boolean;
  onClose: () => void;
};

const INTENT_OPTIONS: { id: Intent; label: string; icon: typeof MessageSquare }[] = [
  { id: 'chat', label: 'Just chat', icon: MessageSquare },
  { id: 'booking', label: 'Booking', icon: Calendar },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

const INTRO_BY_INTENT: Record<NonNullable<Intent>, string> = {
  chat: "Hey, I'm Danny — here to chat. Ask me about the site, Daniel's work, or whatever.",
  booking: "Let's get you booked. I'll need your name, email, phone, location, when you want the session, and what type (photo, video, etc.). What's your name?",
  support: "Hey, I'm Danny. Having an issue or question? Tell me what's up and I'll point you in the right direction.",
};

const DANNY_REACH_BACK =
  "All set — I've sent your details to Daniel. He'll reach out to you via a call or email to confirm the session.";

const SHOOTING_TYPE_OPTIONS = [
  'Event',
  'Portrait',
  'Commercial',
  'Brand Film',
  'Wedding',
  'Sports',
  'Documentary',
  'Other',
];

export function AIChat({ open, onClose }: AIChatProps) {
  const { t } = useLanguage();
  const [intent, setIntent] = useState<Intent>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<BookingPayload | null>(null);
  const [shootingTypeSelect, setShootingTypeSelect] = useState<string>('Event');
  const [shootingTypeOther, setShootingTypeOther] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const showIntentPicker = intent === null;
  const showIntro = intent !== null && messages.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showIntro, pendingBooking]);

  useEffect(() => {
    if (!pendingBooking?.sessionType) return;
    const st = pendingBooking.sessionType.trim();
    const match = SHOOTING_TYPE_OPTIONS.find((o) => o.toLowerCase() === st.toLowerCase());
    if (match) {
      setShootingTypeSelect(match);
      setShootingTypeOther('');
    } else {
      setShootingTypeSelect('Other');
      setShootingTypeOther(st);
    }
  }, [pendingBooking]);

  const sendMessage = async (textOverride?: string) => {
    const text = (textOverride ?? input.trim()).trim();
    if (!text || loading) return;

    if (!textOverride) setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    setPendingBooking(null);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent,
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
        setPendingBooking(data.booking);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      const status = (e as Error & { status?: number }).status;
      const isNotFound = status === 404 || msg.includes('Not Found');
      const isConfigError = msg.includes("isn't set up") || msg.includes('DEEPSEEK');
      let content: string;
      if (isNotFound) {
        content =
          'AI chat only works when the site is deployed on Netlify (or when you run "netlify dev" locally). Right now the chat server isn\'t available — email Daniel directly or try on the live site.';
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

  const confirmBooking = async () => {
    if (!pendingBooking) return;
    const sessionType =
      shootingTypeSelect === 'Other' ? shootingTypeOther.trim() || 'Other' : shootingTypeSelect;
    const payload = { ...pendingBooking, sessionType };
    setLoading(true);
    try {
      const bookingRes = await fetch('/.netlify/functions/submit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const bookingData = await bookingRes.json().catch(() => ({}));
      if (!bookingRes.ok || bookingData.ok === false) {
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content:
              "I tried to email Daniel your booking but it didn't go through. Please email Danielleebuckley@gmail.com with your details so nothing gets lost.",
          },
        ]);
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: DANNY_REACH_BACK }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            "Couldn't send the booking automatically. Please email your details to Danielleebuckley@gmail.com.",
        },
      ]);
    } finally {
      setPendingBooking(null);
      setLoading(false);
    }
  };

  const requestBookingEdit = () => {
    setPendingBooking(null);
    setMessages((m) => [
      ...m,
      {
        role: 'assistant',
        content: "No worries — tell me what you'd like to change and I'll update it.",
      },
    ]);
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
              {showIntentPicker && (
                <div className="ai-chat-intent-wrap">
                  <p className="ai-chat-intent-kicker">Hey, I&apos;m Danny. What do you need?</p>
                  <div className="ai-chat-intent-buttons">
                    {INTENT_OPTIONS.map((opt) => (
                      <motion.button
                        key={opt.id}
                        type="button"
                        className="ai-chat-intent-btn"
                        onClick={() => setIntent(opt.id)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <opt.icon size={20} />
                        <span>{opt.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {showIntro && intent && (
                <div className="ai-chat-message assistant">
                  <div className="ai-chat-avatar">D</div>
                  <div className="ai-chat-bubble">
                    <p>{INTRO_BY_INTENT[intent]}</p>
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

              {pendingBooking && (
                <div className="ai-chat-booking-confirm">
                  <p className="ai-chat-booking-confirm-title">Confirm your details</p>
                  <dl className="ai-chat-booking-details">
                    {pendingBooking.name && (
                      <>
                        <dt>Name</dt>
                        <dd>{pendingBooking.name}</dd>
                      </>
                    )}
                    {pendingBooking.email && (
                      <>
                        <dt>Email</dt>
                        <dd>{pendingBooking.email}</dd>
                      </>
                    )}
                    {pendingBooking.phone && (
                      <>
                        <dt>Phone</dt>
                        <dd>{pendingBooking.phone}</dd>
                      </>
                    )}
                    {pendingBooking.location && (
                      <>
                        <dt>Location</dt>
                        <dd>{pendingBooking.location}</dd>
                      </>
                    )}
                    {pendingBooking.date && (
                      <>
                        <dt>Date / time</dt>
                        <dd>{pendingBooking.date}</dd>
                      </>
                    )}
                    {pendingBooking.notes && (
                      <>
                        <dt>Notes</dt>
                        <dd>{pendingBooking.notes}</dd>
                      </>
                    )}
                  </dl>
                  <div className="ai-chat-booking-shooting">
                    <label htmlFor="ai-chat-shooting-type">Type of shooting</label>
                    <select
                      id="ai-chat-shooting-type"
                      className="ai-chat-shooting-select"
                      value={shootingTypeSelect}
                      onChange={(e) => setShootingTypeSelect(e.target.value)}
                    >
                      {SHOOTING_TYPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {shootingTypeSelect === 'Other' && (
                      <input
                        type="text"
                        className="ai-chat-shooting-other"
                        placeholder="Specify type of shooting..."
                        value={shootingTypeOther}
                        onChange={(e) => setShootingTypeOther(e.target.value)}
                        aria-label="Custom type of shooting"
                      />
                    )}
                  </div>
                  <p className="ai-chat-booking-note">Daniel will reach back to you via a call or email.</p>
                  <div className="ai-chat-booking-actions">
                    <motion.button
                      type="button"
                      className="ai-chat-booking-btn confirm"
                      onClick={confirmBooking}
                      disabled={loading}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Info is correct
                    </motion.button>
                    <motion.button
                      type="button"
                      className="ai-chat-booking-btn edit"
                      onClick={requestBookingEdit}
                      disabled={loading}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Needs editing
                    </motion.button>
                  </div>
                </div>
              )}

              {loading && (
                <div className="ai-chat-message assistant">
                  <div className="ai-chat-avatar">D</div>
                  <div className="ai-chat-bubble ai-chat-typing">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {!showIntentPicker && (
              <form
                className="ai-chat-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
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
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
