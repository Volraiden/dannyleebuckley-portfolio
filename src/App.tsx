import { useEffect, useRef, useState } from 'react';
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
  Menu,
  X,
} from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AIChat } from './components/AIChat';

gsap.registerPlugin(ScrollTrigger);

const serviceKeys = [
  { titleKey: 'service1Title', descKey: 'service1Desc', icon: Camera },
  { titleKey: 'service2Title', descKey: 'service2Desc', icon: Clapperboard },
  { titleKey: 'service3Title', descKey: 'service3Desc', icon: Code },
];

const highlightsKeys = [
  { value: '6', labelKey: 'stat1Label' },
  { value: '50+', labelKey: 'stat2Label' },
  { value: '50K+', labelKey: 'stat3Label' },
];

const featuredWorkKeys = [
  { titleKey: 'featured1Title', categoryKey: 'featured1Category', copyKey: 'featured1Copy' },
  { titleKey: 'featured2Title', categoryKey: 'featured2Category', copyKey: 'featured2Copy' },
  { titleKey: 'featured3Title', categoryKey: 'featured3Category', copyKey: 'featured3Copy' },
];

// Client logos - all companies I've worked with (Trusted By grid)
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
  { name: 'Asian Le Mans Series', logo: '/images/logos/asian-le-mans.png' },
  { name: 'OSCAR Academy', logo: '/images/logos/oscar-academy.png' },
  { name: 'LS', logo: '/images/logos/ls.png' },
];

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        <nav className="site-nav site-nav-desk" aria-label="Primary">
          <a href="#about">{t('navAbout')}</a>
          <a href="#work">{t('navWork')}</a>
          <a href="#contact">{t('navContact')}</a>
          <button
            type="button"
            className="site-nav-chat"
            onClick={() => setChatOpen(true)}
          >
            {t('navAIChat')}
          </button>
        </nav>

        <div className="site-header-right">
          <LanguageSwitcher />
          <motion.a 
            className="header-cta" 
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('bookProject')}
          </motion.a>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <nav className="mobile-nav" aria-label="Mobile">
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>{t('navAbout')}</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)}>{t('navWork')}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t('navContact')}</a>
          <button type="button" onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }}>
            {t('navAIChat')}
          </button>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-cta">
            {t('bookProject')}
          </a>
        </nav>
        <div className="mobile-menu-lang">
          <LanguageSwitcher />
        </div>
      </div>

      <AIChat open={chatOpen} onClose={() => setChatOpen(false)} />

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
              poster="/images/logos/duneworks.png"
              preload="auto"
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
              {t('heroSubtitle')}
            </p>

            <div className="hero-actions">
              <motion.a 
                className="button-primary" 
                href="#work"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('viewMyWork')}
              </motion.a>
              <motion.a 
                className="button-secondary" 
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('getInTouch')}
              </motion.a>
            </div>
          </div>

          <div className="hero-scroll">{t('scrollExplore')}</div>
        </section>

        {/* About Section */}
        <section id="about" className="content-section">
          <div className="about-heading-row">
            <div className="section-heading js-reveal">
              <span className="section-label">{t('sectionAbout')}</span>
              <h2>{t('aboutHeading')}</h2>
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
              <p>{t('aboutPara1')}</p>
              <p>{t('aboutPara2')}</p>
            </div>

            <div className="stats-grid js-reveal">
              {highlightsKeys.map((item, index) => (
                <motion.div 
                  key={item.labelKey} 
                  className="stat-card-clean"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <span>{item.value}</span>
                  <p>{t(item.labelKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="content-section">
          <div className="section-heading js-reveal">
            <span className="section-label">{t('sectionWork')}</span>
            <h2>{t('workHeading')}</h2>
          </div>

          <div className="service-grid stagger-grid">
            {serviceKeys.map((service) => (
              <motion.article
                key={service.titleKey}
                className="studio-card stagger-item"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="studio-card-icon">
                  <service.icon size={22} />
                </div>
                <h3>{t(service.titleKey)}</h3>
                <p>{t(service.descKey)}</p>
              </motion.article>
            ))}
          </div>

          <div className="featured-grid stagger-grid">
            {featuredWorkKeys.map((item) => (
              <motion.article
                key={item.titleKey}
                className="featured-card stagger-item"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <span>{t(item.categoryKey)}</span>
                <h3>{t(item.titleKey)}</h3>
                <p>{t(item.copyKey)}</p>
                <motion.a 
                  href="https://instagram.com/Buckley.lens"
                  target="_blank"
                  rel="noreferrer"
                  className="featured-link"
                  whileHover={{ x: 4 }}
                >
                  <span>{t('viewOnInstagram')}</span>
                  <ExternalLink size={14} />
                </motion.a>
              </motion.article>
            ))}
          </div>

          {/* Client Logos */}
          <div className="clients-section">
            <div className="clients-header js-reveal">
              <h3>{t('trustedBy')}</h3>
              <p>{t('clientsSubtext')}</p>
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
                <span className="duneworks-label">{t('duneworksLabel')}</span>
                <h3>Duneworks</h3>
                <p>{t('duneworksDesc')}</p>
                <motion.a 
                  href="https://duneworksproductions.com"
                  target="_blank"
                  rel="noreferrer"
                  className="duneworks-website-btn"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Globe size={18} />
                  <span>{t('visitWebsite')}</span>
                  <ExternalLink size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="content-section">
          <div className="section-heading js-reveal">
            <span className="section-label">{t('sectionContact')}</span>
            <h2>{t('getInTouchHeading')}</h2>
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
                <span className="social-label">{t('followInstagram')}</span>
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
                <span className="social-label">{t('subscribeYouTube')}</span>
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
                <span className="social-label">{t('sendEmail')}</span>
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
              <h3>{t('getInTouch')}</h3>
              <p>{t('contactFormIntro')}</p>
            </div>

            <form 
              className="contact-form"
              action="https://formspree.io/f/xqeypano"
              method="POST"
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t('yourName')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Mr. Arslan Gay"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('yourEmail')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="arslan@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">{t('reasonContact')}</label>
                <select id="category" name="category" required>
                  <option value="">{t('selectReasonPlaceholder')}</option>
                  <option value="work">{t('optionWork')}</option>
                  <option value="job">{t('optionJob')}</option>
                  <option value="bug">{t('optionBug')}</option>
                  <option value="collab">{t('optionCollab')}</option>
                  <option value="other">{t('optionOther')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('yourMessage')}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  placeholder={t('messagePlaceholder')}
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
                <span>{t('sendMessage')}</span>
              </motion.button>

              <p className="form-note">
                {t('formNote')}
              </p>
            </form>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default App;
