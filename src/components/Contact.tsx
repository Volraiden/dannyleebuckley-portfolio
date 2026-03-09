import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Instagram, Youtube, ArrowUpRight, Send, CheckCircle, Mail, MessageSquare, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@Buckley.lens',
    url: 'https://instagram.com/Buckley.lens',
    icon: Instagram,
    color: '#E4405F',
    followers: 'Portfolio',
  },
  {
    name: 'YouTube',
    handle: '@Volraiden',
    url: 'https://youtube.com/@Volraiden',
    icon: Youtube,
    color: '#FF0000',
    followers: 'Videos',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.contact-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-header',
            start: 'top 85%',
          },
        }
      );

      // Left column reveal
      gsap.fromTo(
        '.contact-info',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 85%',
          },
        }
      );

      // Form reveal
      gsap.fromTo(
        '.contact-form',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const inputClasses = (field: string) =>
    `w-full rounded-xl border bg-transparent px-4 py-4 text-white placeholder-white/30 transition-all duration-300 focus:outline-none ${
      focusedField === field
        ? 'border-accent shadow-lg shadow-accent/10'
        : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="contact-header mb-16 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent">
            Get in Touch
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-white text-3d sm:text-5xl lg:text-6xl">
            Let's Create Something
            <span className="text-accent text-3d-accent"> Amazing</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Available for motorsport events, commercial projects, and creative collaborations.
            Based in Uzbekistan, working worldwide.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <div className="contact-info space-y-8">
            {/* Location Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-6"
              data-cursor="hover"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                  <MapPin className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Based in Uzbekistan
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Available for projects across Central Asia, Middle East, and worldwide.
                    Previous work locations include Dubai, Australia, and various Asian circuits.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="grid gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="group flex items-center gap-4 rounded-2xl bg-card p-5 transition-all duration-300 hover:bg-card/80"
                  data-cursor="hover"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{ backgroundColor: `${social.color}15` }}
                  >
                    <social.icon className="h-7 w-7" style={{ color: social.color }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{social.name}</h4>
                    <p className="text-sm text-white/50">{social.handle}</p>
                  </div>
                  <div className="text-right">
                    <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-300 group-hover:text-white/60" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Facts */}
            <div className="rounded-2xl bg-card p-6">
              <h4 className="mb-4 font-display font-semibold text-white">
                Quick Facts
              </h4>
              <ul className="space-y-3">
                {[
                  'Available for international travel',
                  'Motorsport event coverage specialist',
                  'Same-day editing available',
                  'Multi-camera setup available',
                ].map((fact) => (
                  <li key={fact} className="flex items-center gap-3 text-sm text-white/50">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-accent" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative rounded-3xl bg-card p-8"
            >
              {/* Success Overlay */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-card"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20"
                      >
                        <CheckCircle className="h-10 w-10 text-green-500" />
                      </motion.div>
                      <h3 className="font-display text-2xl font-semibold text-white">
                        Message Sent!
                      </h3>
                      <p className="mt-2 text-white/50">I'll get back to you soon.</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="mb-6 font-display text-xl font-semibold text-white">
                Send a Message
              </h3>

              <div className="space-y-5">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses('name') + ' pl-12'}
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses('email') + ' pl-12'}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Subject */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses('subject') + ' pl-12'}
                    placeholder="Subject"
                    required
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-white/30" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    className={inputClasses('message') + ' resize-none pl-12 pt-4'}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glow-btn group flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 font-semibold text-white transition-all disabled:opacity-50"
                  data-cursor="hover"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                    />
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <img
                src="/images/logos/duneworks.png"
                alt="Duneworks"
                className="h-8 w-auto opacity-40"
              />
              <span className="text-sm text-white/40">
                © {new Date().getFullYear()} Daniel Lee Buckley
              </span>
            </div>
            <div className="flex items-center gap-6">
              {['Instagram', 'YouTube'].map((link) => (
                <a
                  key={link}
                  href={link === 'Instagram' ? 'https://instagram.com/Buckley.lens' : 'https://youtube.com/@Volraiden'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 transition-colors hover:text-white"
                  data-cursor="hover"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
