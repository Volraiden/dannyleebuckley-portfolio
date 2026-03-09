import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Camera,
  Clapperboard,
  Code,
  Instagram,
  Mail,
  Youtube,
  ExternalLink,
  Send,
  Globe,
} from 'lucide-react';
import LogoMarquee from './components/LogoMarquee';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Photography',
    description:
      'I shoot event coverage, portraits, brand campaigns, and documentary-style storytelling across any genre.',
    icon: Camera,
  },
  {
    title: 'Cinematic Video',
    description:
      'I create commercial edits, event recaps, branded films, and polished social-first content.',
    icon: Clapperboard,
  },
  {
    title: 'Development',
    description:
      'I build websites, software, and systems — from portfolio sites to custom applications and creative tools.',
    icon: Code,
  },
];

const highlights = [
  { value: '6', label: 'Years Experience' },
  { value: '50+', label: 'Events Covered' },
  { value: '50K+', label: 'Photos Captured' },
];

const featuredWork = [
  {
    title: 'Event Coverage',
    category: 'Live Production',
    copy:
      'I deliver fast-paced storytelling for events, brands, partners, and media channels.',
  },
  {
    title: 'Brand Films',
    category: 'Commercial Production',
    copy:
      'I create cinematic visual campaigns that blend motion, sound, and performance.',
  },
  {
    title: 'Web Development',
    category: 'Development',
    copy:
      'I build websites, applications, and digital systems for creative professionals and brands.',
  },
];

// Client logos - all companies I've worked with
const clientLogos = [
  { name: 'Client 2', logo: '/images/logos/client2.png?v=6' },
  { name: 'Client 3', logo: '/images/logos/client3.png?v=6' },
  { name: 'Client 4', logo: '/images/logos/client4.png?v=6' },
  { name: 'Client 5', logo: '/images/logos/client5.png?v=6' },
  { name: 'Client 6', logo: '/images/logos/client6.png?v=6' },
  { name: 'Client 7', logo: '/images/logos/client7.png?v=6' },
  { name: '24H Series', logo: '/images/logos/24h-series.png?v=6' },
  { name: 'ZBS', logo: '/images/logos/zbs.png?v=6' },
  { name: 'Iguana Studios', logo: '/images/logos/iguana-studios.png?v=6' },
];

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
            },
          }
        );
      });

      // Stagger animation for grids
      gsap.utils.toArray<HTMLElement>('.stagger-grid').forEach((grid) => {
        const items = grid.querySelectorAll('.stagger-item');
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
            },
          }
        );
      });
    }, appRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={appRef} className="site-shell">
      {/* Header */}
      <header className="site-header">
        <motion.a 
          className="wordmark" 
          href="#hero"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="/images/profile.png" 
            alt="Daniel Lee Buckley"
            className="profile-photo"
          />
          <span className="wordmark-text">DANIEL LEE BUCKLEY</span>
        </motion.a>

        <nav className="site-nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>

        <motion.a 
          className="header-cta" 
          href="#contact"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Book a Project
        </motion.a>
      </header>

      <main>
        {/* Hero Section with Video */}
        <section id="hero" className="hero-section">
          <div className="hero-video-container">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="hero-video"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="hero-overlay" />

          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-line">
                <span className="hero-title-text">DANIEL LEE</span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-text">BUCKLEY</span>
              </span>
            </h1>

            <p className="hero-subtitle">
              Professional photographer, filmmaker, and developer creating
              world-class visual content, websites, and digital systems.
            </p>

            <div className="hero-actions">
              <motion.a 
                className="button-primary" 
                href="#work"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
              </motion.a>
              <motion.a 
                className="button-secondary" 
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </div>

          <div className="hero-scroll">Scroll to explore</div>
        </section>

        {/* Trusted Partners */}
        <LogoMarquee />

        {/* About Section */}
        <section id="about" className="content-section">
          <div className="about-heading-row">
            <div className="section-heading js-reveal">
              <span className="section-label">About</span>
              <h2>I create premium visual content for brands, events, and creators worldwide.</h2>
            </div>
            <div className="about-hero-image js-reveal">
              <img
                src="/images/hero-car.png"
                alt="Premium visual content — motorsport and events"
                className="about-hero-img"
              />
            </div>
          </div>

          <div className="about-layout">
            <div className="about-copy js-reveal">
              <p>
                Based in Uzbekistan and originally from Australia, I build high-end visuals
                across commercial production, events, and digital content. I also develop
                websites, software, and systems for creative professionals and brands.
              </p>
              <p>
                From fast-paced event environments to branded media campaigns and web development,
                I focus on making projects feel cinematic, sharp, and professionally executed
                without losing clarity or creative vision.
              </p>
            </div>

            <div className="stats-grid js-reveal">
              {highlights.map((item, index) => (
                <motion.div 
                  key={item.label} 
                  className="stat-card-clean"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <span>{item.value}</span>
                  <p>{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="content-section">
          <div className="section-heading js-reveal">
            <span className="section-label">Work</span>
            <h2>I build premium visual content across photo, film, and digital delivery.</h2>
          </div>

          <div className="service-grid stagger-grid">
            {services.map((service) => (
              <motion.article
                key={service.title}
                className="studio-card stagger-item"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="studio-card-icon">
                  <service.icon size={22} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="featured-grid stagger-grid">
            {featuredWork.map((item) => (
              <motion.article
                key={item.title}
                className="featured-card stagger-item"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <motion.a 
                  href="https://instagram.com/Buckley.lens"
                  target="_blank"
                  rel="noreferrer"
                  className="featured-link"
                  whileHover={{ x: 4 }}
                >
                  <span>View on Instagram</span>
                  <ExternalLink size={14} />
                </motion.a>
              </motion.article>
            ))}
          </div>

          {/* Client Logos */}
          <div className="clients-section">
            <div className="clients-header js-reveal">
              <h3>Trusted By</h3>
              <p>Companies and brands I&apos;ve had the privilege to work with</p>
            </div>

            <div className="clients-grid stagger-grid">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={client.name}
                  className="client-logo stagger-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="client-logo-img"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Duneworks CEO Section */}
          <motion.div 
            className="duneworks-section js-reveal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="duneworks-content">
              <div className="duneworks-logo">
                <img src="/images/logos/duneworks.png" alt="Duneworks" />
              </div>
              <div className="duneworks-text">
                <span className="duneworks-label">CEO & Founder</span>
                <h3>Duneworks</h3>
                <p>
                  Leading Duneworks Studios, Duneworks Productions, and The Dune Network — 
                  a creative ecosystem spanning photography, film production, and professional networking across Central Asia.
                </p>
                <motion.a 
                  href="https://duneworksproductions.com"
                  target="_blank"
                  rel="noreferrer"
                  className="duneworks-website-btn"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Globe size={18} />
                  <span>Visit Website</span>
                  <ExternalLink size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="content-section">
          <div className="section-heading js-reveal">
            <span className="section-label">Contact</span>
            <h2>Let&apos;s work together.</h2>
          </div>

          {/* Social Links - Prominent */}
          <motion.div 
            className="social-links-row js-reveal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a 
              href="https://instagram.com/Buckley.lens" 
              target="_blank" 
              rel="noreferrer"
              className="social-btn instagram-btn"
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Instagram size={28} />
              <div className="social-btn-text">
                <span className="social-label">Follow on Instagram</span>
                <span className="social-handle">@Buckley.lens</span>
              </div>
              <ExternalLink size={16} className="social-arrow" />
            </motion.a>

            <motion.a 
              href="https://youtube.com/@Volraiden" 
              target="_blank" 
              rel="noreferrer"
              className="social-btn youtube-btn"
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Youtube size={28} />
              <div className="social-btn-text">
                <span className="social-label">Subscribe on YouTube</span>
                <span className="social-handle">@Volraiden</span>
              </div>
              <ExternalLink size={16} className="social-arrow" />
            </motion.a>

            <motion.a 
              href="mailto:Danielleebuckley@gmail.com"
              className="social-btn email-btn"
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail size={28} />
              <div className="social-btn-text">
                <span className="social-label">Send me an email</span>
                <span className="social-handle">Danielleebuckley@gmail.com</span>
              </div>
              <ExternalLink size={16} className="social-arrow" />
            </motion.a>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-container js-reveal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="contact-form-header">
              <h3>Get in Touch</h3>
              <p>Select the reason for your message and I&apos;ll get back to you as soon as possible.</p>
            </div>

            <form 
              className="contact-form"
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">Reason for Contact</label>
                <select id="category" name="category" required>
                  <option value="">Select a reason...</option>
                  <option value="work">Work With Me - I want to hire you for a project</option>
                  <option value="job">Join My Team - I&apos;m interested in working for you</option>
                  <option value="bug">Report a Bug - Something&apos;s wrong with the website</option>
                  <option value="collab">Collaboration - Let&apos;s work together</option>
                  <option value="other">Other - Something else</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  placeholder="Tell me about your project, the bug you found, or why you want to join the team..."
                  required
                />
              </div>

              <motion.button 
                type="submit" 
                className="submit-btn"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                <span>Send Message</span>
              </motion.button>

              <p className="form-note">
                Your message will be sent directly to my email. I typically respond within 24-48 hours.
              </p>
            </form>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default App;
