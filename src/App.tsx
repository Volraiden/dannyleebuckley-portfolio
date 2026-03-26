import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Camera,
  Sun,
  Moon,
  Clapperboard,
  Code,
  CalendarDays,
  Instagram,
  Mail,
  Youtube,
  ExternalLink,
  Send,
  Globe,
  Menu,
  X,
  Film,
  Video,
} from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AIChat } from './components/AIChat';

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    let index = 0;
    const interval = window.setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        window.clearInterval(interval);
      }
    }, speed);
    return () => window.clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`typewriter-text ${isComplete ? 'complete' : ''}`}>
      {displayText}
      {!isComplete && <span className="typewriter-cursor">|</span>}
    </span>
  );
}

gsap.registerPlugin(ScrollTrigger);

const serviceKeys = [
  { titleKey: 'service1Title', descKey: 'service1Desc', icon: Camera },
  { titleKey: 'service2Title', descKey: 'service2Desc', icon: Film },
  { titleKey: 'service3Title', descKey: 'service3Desc', icon: Video },
  { titleKey: 'service4Title', descKey: 'service4Desc', icon: Clapperboard },
  { titleKey: 'service5Title', descKey: 'service5Desc', icon: Code },
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

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [cameraDetailIndex, setCameraDetailIndex] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedPartner, setSelectedPartner] = useState<{ name: string; logo: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [chatStep, setChatStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput] = useState('');
  const [showInputCursor, setShowInputCursor] = useState(true);

  const chatDemoSequence = [
    { type: 'user' as const, text: 'Can I book you for an event shoot next week?' },
    { type: 'bot' as const, text: 'Absolutely! I specialize in motorsport and brand events. What location?' },
    { type: 'user' as const, text: 'Dubai, Formula racing content.' },
    { type: 'bot' as const, text: 'Perfect fit! 🏎️ I will open the full AI chat where we can discuss dates, deliverables, and pricing.' },
  ];

  useEffect(() => {
    let timeout: number;
    const runSequence = () => {
      if (chatStep < chatDemoSequence.length) {
        setIsTyping(true);
        timeout = window.setTimeout(() => {
          setChatMessages((prev) => [...prev, chatDemoSequence[chatStep]]);
          setIsTyping(false);
          setChatStep((prev) => prev + 1);
        }, 1200);
      }
    };
    runSequence();
    return () => window.clearTimeout(timeout);
  }, [chatStep]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setShowInputCursor((prev) => !prev);
    }, 530);
    return () => window.clearInterval(interval);
  }, []);

  // Keep the full company list; if a logo file is missing, render a text fallback.
  const clientLogos = [
    { name: 'Client 2', logo: '/images/logos/client2.png' },
    { name: 'Client 3', logo: '/images/logos/client3.png' },
    { name: 'Client 4', logo: '/images/logos/client4.png' },
    { name: 'Client 5', logo: '/images/logos/client5.png' },
    { name: 'Client 6', logo: '/images/logos/client6.png' },
    { name: 'Client 7', logo: '/images/logos/client7.png' },
    { name: 'ZBS', logo: '/images/logos/zbs.png' },
    { name: 'Iguana Studios', logo: '/images/logos/iguana-studios.png' },
    { name: '24H Series', logo: '/images/logos/24h-series.png' },
    { name: 'Asian Le Mans Series', logo: '/images/logos/asian-le-mans.png' },
    { name: 'OSCAR Academy', logo: '/images/logos/oscar-academy.png' },
    { name: 'LS', logo: '/images/logos/ls.png' },
    { name: 'Duneworks Media', logo: '/images/logos/duneworks-media.png' },
    { name: 'D Logo', logo: '/images/logos/d-logo.png' },
    { name: 'Trusted Partner 1', logo: '/images/logos/new-trusted-1.png' },
    { name: 'Trusted Partner 2', logo: '/images/logos/new-trusted-2.png' },
    { name: 'Trusted Partner 3', logo: '/images/logos/new-trusted-3.webp' },
  ];
  const [brokenLogos, setBrokenLogos] = useState<Record<string, boolean>>({});
  const cameraDetails = [
    t('service1Title'),
    t('service2Title'),
    t('service3Title'),
    t('service4Title'),
    t('service5Title'),
  ];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('site-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      return;
    }
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('site-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);
    return () => mediaQuery.removeEventListener('change', updateMobileState);
  }, []);

  useEffect(() => {
    const loaderDelay = isMobile ? 250 : 1200;
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, loaderDelay);

    return () => window.clearTimeout(timer);
  }, [isMobile]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (!isMobile || !heroVideoRef.current) return;
    heroVideoRef.current.play().catch(() => {});
  }, [isMobile]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCameraDetailIndex((prev) => (prev + 1) % cameraDetails.length);
    }, 1600);
    return () => window.clearInterval(interval);
  }, [cameraDetails.length]);

  useEffect(() => {
    // On mobile, preload logos so the "Trusted By" grid appears faster.
    if (!isMobile) return;
    clientLogos.forEach((client) => {
      const img = new Image();
      img.src = client.logo;
      img.decoding = 'async';
    });
  }, [isMobile]);

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
      <motion.div
        className="startup-loader"
        aria-live="polite"
        aria-label="Site loading"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
      >
        <div className="startup-loader-inner">
          <motion.p
            className="startup-loader-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Systems starting up
          </motion.p>
          <div className="startup-loader-logo-wrap">
            <motion.div
              className="startup-loader-ring"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            <motion.img
              src="/images/logos/duneworks.png"
              alt="Duneworks logo"
              className="startup-loader-logo"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </div>
          <motion.h2
            className="startup-loader-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            AI systems booting
          </motion.h2>
          <motion.div
            className="startup-loader-bars"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <span />
            <span />
            <span />
          </motion.div>
        </div>
      </motion.div>

      {/* Header */}
      <header className="site-header">
        <motion.a 
          className="wordmark" 
          href="#hero"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="/images/profile-top-left.webp" 
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
          <button
            type="button"
            onClick={toggleTheme}
            className="site-theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <motion.a 
            className="header-cta" 
            href="https://cal.com/danielleebuckley"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Book a Call
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
          <button type="button" className="mobile-theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          </button>
          <a
            href="https://cal.com/danielleebuckley"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-menu-cta"
          >
            Book a Call
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
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              className="hero-video"
              preload={isMobile ? 'auto' : 'metadata'}
              onLoadedData={() => {
                if (isMobile && heroVideoRef.current) {
                  heroVideoRef.current.play().catch(() => {});
                }
              }}
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
              <div className="camera-card" aria-hidden="true">
                <div className="camera-body">
                  <div className="camera-top">
                    <span className="camera-indicator" />
                    <span className="camera-brand">DUNE CAM</span>
                  </div>
                  <div className="camera-screen">
                    <motion.div
                      key={cameraDetails[cameraDetailIndex]}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="camera-screen-text"
                    >
                      {cameraDetails[cameraDetailIndex]}
                    </motion.div>
                    <div className="camera-screen-lines" />
                  </div>
                  <div className="camera-controls">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
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
            <div className="work-cinematic-ui">
              <div className="work-cinematic-row">
                <motion.span
                  className="work-rec-dot"
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="work-rec-label">REC</span>
                <Camera size={16} />
                <Clapperboard size={16} />
                <Film size={16} />
              </div>
              <div className="work-cinematic-track-wrap">
                <motion.div
                  className="work-cinematic-track"
                  animate={{ backgroundPositionX: ['0%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>
          </div>

          <div className="cinema-room js-reveal">
            <div className="cinema-room-topbar">
              <span className="cinema-pill">Cinema Room</span>
              <span className="cinema-pill imax">IMAX</span>
              <span className="cinema-pill">Dolby Atmos</span>
            </div>

            <div className="cinema-room-screen">
              <div className="cinema-room-glow" />
              <div className="cinema-ambient-lights" aria-hidden="true">
                {[...Array(8)].map((_, lightIndex) => (
                  <span key={lightIndex} className="cinema-light" />
                ))}
              </div>
              <div className="cinema-room-stage">
                <div className="cinema-letterbox top" />
                <div className="cinema-letterbox bottom" />
                <div className="cinema-room-grid">
                  {serviceKeys.map((service) => (
                    <motion.article
                      key={service.titleKey}
                      className="cinema-card"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="studio-card-icon">
                        <service.icon size={20} />
                      </div>
                      <h3>{t(service.titleKey)}</h3>
                      <p>{t(service.descKey)}</p>
                    </motion.article>
                  ))}

                  {featuredWorkKeys.map((item) => (
                    <motion.article
                      key={item.titleKey}
                      className="cinema-card featured"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="cinema-card-kicker">{t(item.categoryKey)}</span>
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
              </div>
              <div className="cinema-seats" aria-hidden="true">
                {[...Array(18)].map((_, seatIndex) => (
                  <span key={seatIndex} className="cinema-seat" />
                ))}
              </div>
            </div>
          </div>

          {/* Client Logos */}
          <div className="clients-section">
            <div className="clients-header js-reveal">
              <h3>{t('trustedBy')}</h3>
              <p>{t('clientsSubtext')}</p>
            </div>

            <div className="camera-trusted-strip">
              <div className="camera-trusted-top">
                <span className="camera-trusted-dot" />
                <span className="camera-trusted-label">Viewfinder</span>
              </div>
              <div className="camera-trusted-track">
                <div className="camera-trusted-row">
                  {[...clientLogos, ...clientLogos].map((client, index) => (
                    <button
                      key={`${client.name}-${index}`}
                      type="button"
                      className="camera-trusted-logo"
                      onClick={() => setSelectedPartner(client)}
                    >
                      {brokenLogos[client.name] ? (
                        <span className="client-logo-fallback">{client.name}</span>
                      ) : (
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="client-logo-img"
                          loading={isMobile ? 'eager' : 'lazy'}
                          fetchPriority={isMobile && index < 8 ? 'high' : 'auto'}
                          decoding="async"
                          onError={() =>
                            setBrokenLogos((prev) => ({
                              ...prev,
                              [client.name]: true,
                            }))
                          }
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedPartner && (
              <motion.div
                className="partner-viewfinder-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPartner(null)}
              >
                <motion.div
                  className="partner-viewfinder-modal"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="partner-viewfinder-header">
                    <div className="partner-viewfinder-status">
                      <span className="partner-vf-dot" />
                      <span className="partner-vf-label">FOCUS MONITOR</span>
                    </div>
                    <button
                      type="button"
                      className="partner-viewfinder-close"
                      onClick={() => setSelectedPartner(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="partner-viewfinder-body">
                    <div className="partner-viewfinder-screen">
                      <div className="partner-viewfinder-frame">
                        <div className="partner-vf-corner tl" />
                        <div className="partner-vf-corner tr" />
                        <div className="partner-vf-corner bl" />
                        <div className="partner-vf-corner br" />
                        <div className="partner-vf-crosshair h" />
                        <div className="partner-vf-crosshair v" />
                      </div>
                      <img
                        src={selectedPartner.logo}
                        alt={selectedPartner.name}
                        className="partner-viewfinder-logo"
                      />
                      <div className="partner-vf-overlay">
                        <span className="partner-vf-rec">● REC</span>
                        <span className="partner-vf-focal">50mm f/1.4</span>
                      </div>
                    </div>
                    <p className="partner-viewfinder-name">{selectedPartner.name}</p>
                    <p className="partner-viewfinder-meta">Trusted Partner • 4K LOGO</p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            <div className="mini-booking-card js-reveal">
              <p className="mini-booking-kicker">Available for bookings</p>
              <h4>Book me for your next project or call</h4>
              <p className="mini-booking-copy">
                Fast response for events, brand shoots, and commercial collaborations.
              </p>
              <a
                href="https://cal.com/danielleebuckley"
                target="_blank"
                rel="noreferrer"
                className="mini-booking-btn"
              >
                Book Me on Cal.com
              </a>
            </div>
          </div>

          <div className="ai-chat-preview js-reveal">
            <div className="ai-chat-preview-top">
              <div className="ai-preview-header">
                <div className="ai-preview-avatar">AI</div>
                <div>
                  <p className="ai-preview-title">Daniel&apos;s AI Assistant</p>
                  <p className="ai-preview-status">
                    <span className="ai-status-dot" />
                    Online now
                  </p>
                </div>
              </div>
              <button type="button" className="mini-booking-btn" onClick={() => setChatOpen(true)}>
                Open Chat
              </button>
            </div>
            <div className="ai-chat-preview-body">
              <div className="ai-preview-messages">
                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`ai-message ${msg.type}`}
                    initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  >
                    <TypewriterText text={msg.text} />
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    className="ai-typing-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </motion.div>
                )}
              </div>
              <button
                type="button"
                className="ai-preview-input"
                onClick={() => setChatOpen(true)}
              >
                {userInput}
                <span className={`input-cursor ${showInputCursor ? 'visible' : ''}`}>|</span>
                {!userInput && <span className="input-placeholder">Type to chat...</span>}
              </button>
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
              href="https://cal.com/danielleebuckley"
              target="_blank"
              rel="noreferrer"
              className="social-btn booking-btn"
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarDays size={28} />
              <div className="social-btn-text">
                <span className="social-label">Book a Call</span>
                <span className="social-handle">cal.com/danielleebuckley</span>
              </div>
              <ExternalLink size={16} className="social-arrow" />
            </motion.a>

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
