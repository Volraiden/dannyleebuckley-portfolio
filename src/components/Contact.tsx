import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Instagram, Youtube, ArrowUpRight, Send, CheckCircle } from 'lucide-react';

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@Buckley.lens',
    url: 'https://instagram.com/Buckley.lens',
    icon: Instagram,
    color: 'hover:text-pink-500',
  },
  {
    name: 'YouTube',
    handle: '@Volraiden',
    url: 'https://youtube.com/@Volraiden',
    icon: Youtube,
    color: 'hover:text-red-500',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-display text-sm font-medium uppercase tracking-widest text-accent">
            Get in Touch
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Let's Create Something
            <span className="text-accent"> Amazing</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted">
            Available for motorsport events, commercial projects, and creative collaborations. 
            Based in Uzbekistan, working worldwide.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Location */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Based in Uzbekistan
                  </h3>
                  <p className="mt-2 text-muted">
                    Available for projects across Central Asia, Middle East, and worldwide. 
                    Previous work locations include Dubai, Australia, and various Asian circuits.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid gap-4 sm:grid-cols-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="group flex items-center gap-4 rounded-2xl bg-card p-5 transition-all duration-300 hover:bg-card/80"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-300 ${social.color}`}>
                    <social.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{social.name}</h4>
                    <p className="text-sm text-muted">{social.handle}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            {/* Quick Info */}
            <div className="rounded-2xl bg-card p-6">
              <h4 className="mb-4 font-display font-semibold text-foreground">
                Quick Facts
              </h4>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Available for international travel</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Motorsport event coverage specialist</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Same-day editing available</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Multi-camera setup available</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="rounded-3xl bg-card p-8">
              <h3 className="mb-6 font-display text-xl font-semibold text-foreground">
                Send a Message
              </h3>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder-muted transition-all duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder-muted transition-all duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder-muted transition-all duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`group flex w-full items-center justify-center gap-2 rounded-xl py-4 font-medium text-white transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500'
                      : 'bg-accent hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <img
              src="/images/logos/duneworks.png"
              alt="Duneworks"
              className="h-8 w-auto opacity-50"
            />
            <span className="text-sm text-muted">
              © {new Date().getFullYear()} Daniel Lee Buckley. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/Buckley.lens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@Volraiden"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
