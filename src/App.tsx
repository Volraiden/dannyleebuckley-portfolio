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

function TypewriterText({ text, speed = 25, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    setIsVisible(false);

    const startTimeout = window.setTimeout(() => {
      setIsVisible(true);
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
    }, delay);

    return () => window.clearTimeout(startTimeout);
  }, [text, speed, delay]);

  if (!isVisible) return <span className="typewriter-placeholder" />;

  return (
    <span className={`typewriter-text ${isComplete ? 'complete' : 'typing'}`}>
      {displayText}
      {!isComplete && <span className="typewriter-cursor" />}
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
  const { t, locale } = useLanguage();
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
    { type: 'user' as const, text: 'What packages do you offer?' },
    { type: 'bot' as const, text: 'I have half-day (4h) and full-day (8h) packages. Both include editing and fast turnaround.' },
    { type: 'bot' as const, text: 'Click "Open Chat" above to see detailed pricing and availability!' },
  ];

  useEffect(() => {
    let timeout: number;
    const runSequence = () => {
      if (chatStep < chatDemoSequence.length) {
        setIsTyping(true);
        timeout = window.setTimeout(() => {
          setChatMessages((prev) => {
            const newMessages = [...prev, chatDemoSequence[chatStep]];
            // Keep only last 6 messages to prevent overflow
            if (newMessages.length > 6) {
              return newMessages.slice(newMessages.length - 6);
            }
            return newMessages;
          });
          setIsTyping(false);
          setChatStep((prev) => prev + 1);
        }, 1500);
      } else {
        // Loop back after delay
        timeout = window.setTimeout(() => {
          setChatMessages([]);
          setChatStep(0);
        }, 4000);
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

  // Camera detail rotation - cycles through 5 services every 2 seconds
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCameraDetailIndex((prev) => (prev + 1) % 5);
    }, 2000);
    return () => window.clearInterval(interval);
  }, []);

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
                {/* Viewfinder Eyepiece */}
                <div className="camera-viewfinder-eyepiece">
                  <div className="eyepiece-tube">
                    <div className="eyepiece-glass">
                      <div className="eyepiece-reflection" />
                    </div>
                  </div>
                  <div className="eyepiece-rubber">
                    <div className="eyepiece-rubber-ring" />
                  </div>
                </div>
                <div className="camera-body">
                  <div className="camera-top">
                    <span className="camera-indicator" />
                    <span className="camera-brand">DUNE CAM</span>
                  </div>
                  <div className="camera-screen">
                    <motion.div
                      key={`title-${cameraDetailIndex}-${locale}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="camera-screen-text"
                    >
                      {cameraDetailIndex === 0 && t('service1Title')}
                      {cameraDetailIndex === 1 && t('service2Title')}
                      {cameraDetailIndex === 2 && t('service3Title')}
                      {cameraDetailIndex === 3 && t('service4Title')}
                      {cameraDetailIndex === 4 && t('service5Title')}
                    </motion.div>
                    <motion.div
                      key={`detail-${cameraDetailIndex}-${locale}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="camera-screen-subtext"
                    >
                      {cameraDetailIndex === 0 && t('service1Desc').split('.')[0]}
                      {cameraDetailIndex === 1 && t('service2Desc').split('.')[0]}
                      {cameraDetailIndex === 2 && t('service3Desc').split('.')[0]}
                      {cameraDetailIndex === 3 && t('service4Desc').split('.')[0]}
                      {cameraDetailIndex === 4 && t('service5Desc').split('.')[0]}
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

          <motion.div
            className="cinema-room js-reveal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="cinema-room-topbar">
              <motion.span
                className="cinema-pill"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Cinema Room
              </motion.span>
              <motion.span
                className="cinema-pill imax"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                IMAX
              </motion.span>
              <motion.span
                className="cinema-pill"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Dolby Atmos
              </motion.span>
            </div>

            <div className="cinema-room-screen">
              {/* Animated film grain overlay */}
              <div className="cinema-film-grain" aria-hidden="true" />

              {/* Enhanced glow with animation */}
              <motion.div
                className="cinema-room-glow"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Animated light beams */}
              <div className="cinema-light-beams" aria-hidden="true">
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="light-beam"
                    initial={{ opacity: 0, rotate: -30 + i * 30 }}
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                      x: [-20, 20, -20],
                    }}
                    transition={{
                      duration: 6 + i * 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>

              <div className="cinema-ambient-lights" aria-hidden="true">
                {[...Array(8)].map((_, lightIndex) => (
                  <motion.span
                    key={lightIndex}
                    className="cinema-light"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: lightIndex * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Projector flicker effect */}
              <div className="cinema-projector-flicker" aria-hidden="true" />

              <div className="cinema-room-stage">
                {/* Racing Car Scene Bars */}
                <motion.div
                  className="cinema-racing-bar top"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="racing-stripe-container">
                    <div className="racing-stripe red" />
                    <div className="racing-stripe white" />
                    <div className="racing-stripe black" />
                  </div>
                  <div className="racing-speed-lines">
                    {[...Array(8)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="speed-line"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 400, opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.5 + Math.random() * 0.5,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: 'linear',
                        }}
                      />
                    ))}
                  </div>
                  <div className="racing-text">LAP 47/56</div>
                </motion.div>

                <motion.div
                  className="cinema-racing-bar bottom"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="racing-stripe-container">
                    <div className="racing-stripe red" />
                    <div className="racing-stripe white" />
                    <div className="racing-stripe black" />
                  </div>
                  <div className="racing-speed-lines">
                    {[...Array(8)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="speed-line"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 400, opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.5 + Math.random() * 0.5,
                          repeat: Infinity,
                          delay: i * 0.15 + 0.5,
                          ease: 'linear',
                        }}
                      />
                    ))}
                  </div>
                  <div className="racing-telemetry">
                    <span className="telemetry-item">SPEED 287 KM/H</span>
                    <span className="telemetry-item">RPM 12,400</span>
                    <span className="telemetry-item">GEAR 6</span>
                  </div>
                </motion.div>

                <div className="cinema-room-grid">
                  {serviceKeys.map((service, index) => (
                    <motion.article
                      key={service.titleKey}
                      className="cinema-card"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      }}
                    >
                      <motion.div
                        className="studio-card-icon"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <service.icon size={20} />
                      </motion.div>
                      <h3>{t(service.titleKey)}</h3>
                      <p>{t(service.descKey)}</p>
                    </motion.article>
                  ))}

                  {featuredWorkKeys.map((item, index) => (
                    <motion.article
                      key={item.titleKey}
                      className="cinema-card featured"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (serviceKeys.length + index) * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      }}
                    >
                      <motion.span
                        className="cinema-card-kicker"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {t(item.categoryKey)}
                      </motion.span>
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
                  <motion.span
                    key={seatIndex}
                    className="cinema-seat"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: seatIndex * 0.05 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Client Logos */}
          <div className="clients-section">
            <div className="clients-header js-reveal">
              <h3>{t('trustedBy')}</h3>
              <p>{t('clientsSubtext')}</p>
            </div>

            {/* Camera Monitor with Viewfinder */}
            <motion.div
              className="camera-monitor-trusted js-reveal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Camera Body Shoulder */}
              <div className="cam-shoulder">
                <div className="cam-shoulder-pad" />
                <div className="cam-recording-indicator">
                  <span className="cam-rec-dot" />
                  <span className="cam-rec-text">REC</span>
                </div>
                <div className="cam-battery-indicator">
                  <span className="cam-bat-icon">🔋</span>
                  <span className="cam-bat-level">87%</span>
                </div>
              </div>

              {/* Professional Viewfinder with Trusted By Logos */}
              <div className="cam-viewfinder-section">
                <div className="cam-evf-assembly">
                  {/* Rubber eyecup like Sony A7 III */}
                  <div className="cam-evf-eyecup">
                    <div className="eyecup-rubber">
                      <div className="eyecup-inner-ring" />
                    </div>
                  </div>
                  {/* Viewfinder housing */}
                  <div className="cam-evf-housing">
                    <div className="cam-evf-housing-top">
                      <span className="evf-sensor-label">XGA OLED</span>
                    </div>
                    <div className="cam-evf-display">
                      {/* Viewfinder screen showing logos */}
                      <div className="evf-screen">
                        <div className="evf-grid-overlay" />
                        <div className="evf-logos-container">
                          <div className="evf-logos-track">
                            {/* First set of logos */}
                            {clientLogos.slice(0, 5).map((client, idx) => (
                              <div key={`a-${idx}`} className="evf-logo-item">
                                <img
                                  src={client.logo}
                                  alt={client.name}
                                  className="evf-logo-img"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('fallback');
                                  }}
                                />
                              </div>
                            ))}
                            {/* Duplicated for smooth infinite scroll */}
                            {clientLogos.slice(0, 5).map((client, idx) => (
                              <div key={`b-${idx}`} className="evf-logo-item">
                                <img
                                  src={client.logo}
                                  alt={client.name}
                                  className="evf-logo-img"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('fallback');
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="evf-badge">{t('trustedByBadge')}</div>
                      </div>
                    </div>
                    <div className="cam-evf-branding">
                      <span className="evf-brand-text">SONY</span>
                      <span className="evf-model-text">FX6</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Monitor Screen */}
              <div className="cam-monitor-bezel">
                <div className="cam-monitor-brand-row">
                  <span className="cam-brand">SONY</span>
                  <span className="cam-model">FX6</span>
                  <div className="cam-status-icons">
                    <span className="cam-icon">⚡</span>
                    <span className="cam-icon">📹</span>
                    <span className="cam-icon">🎤</span>
                  </div>
                </div>

                <div className="cam-screen-container">
                  {/* Screen with viewfinder overlay */}
                  <div className="cam-screen">
                    {/* Professional viewfinder overlay */}
                    <div className="cam-vf-overlay">
                      {/* Safety zone frame */}
                      <div className="cam-safety-frame">
                        <span className="corner-tl">┏</span>
                        <span className="corner-tr">┓</span>
                        <span className="corner-bl">┗</span>
                        <span className="corner-br">┛</span>
                      </div>

                      {/* Center crosshair */}
                      <div className="cam-crosshair">
                        <div className="crosshair-h" />
                        <div className="crosshair-v" />
                        <div className="crosshair-center" />
                      </div>

                      {/* Rule of thirds grid */}
                      <div className="cam-thirds-grid">
                        <div className="third-line v left" />
                        <div className="third-line v right" />
                        <div className="third-line h top" />
                        <div className="third-line h bottom" />
                      </div>

                      {/* HUD Info */}
                      <div className="cam-hud">
                        <div className="cam-hud-top">
                          <span className="hud-item timecode">00:45:23:18</span>
                          <span className="hud-item format">4K 60p</span>
                          <span className="hud-item codec">XAVC-I</span>
                        </div>
                        <div className="cam-hud-bottom">
                          <span className="hud-item iris">F2.8</span>
                          <span className="hud-item iso">ISO 800</span>
                          <span className="hud-item shutter">1/120</span>
                          <span className="hud-item wb">5600K</span>
                          <span className="hud-item lut">S-LOG3</span>
                        </div>
                      </div>

                      {/* Focus peaking simulation */}
                      <div className="cam-focus-peaking">
                        <svg viewBox="0 0 400 240" className="peaking-svg">
                          <path d="M50 80 Q100 60 150 80 T250 80" stroke="#ff0000" strokeWidth="2" fill="none" strokeDasharray="4,4" opacity="0.6" />
                          <path d="M120 150 Q180 130 240 150" stroke="#ff0000" strokeWidth="2" fill="none" strokeDasharray="4,4" opacity="0.6" />
                        </svg>
                      </div>
                    </div>

                    {/* Content inside monitor - Trusted By Title */}
                    <div className="cam-screen-content">
                      <motion.div
                        className="cam-trusted-title"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="trusted-badge">{t('trustedByBadge')}</span>
                        <span className="trusted-count">{t('brandsCount')}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Monitor controls */}
                <div className="cam-controls-row">
                  <div className="cam-dial">
                    <div className="dial-markings" />
                  </div>
                  <div className="cam-buttons">
                    <span className="cam-btn-monitor">MENU</span>
                    <span className="cam-btn-monitor">DISPLAY</span>
                    <span className="cam-btn-monitor">ZEBRA</span>
                    <span className="cam-btn-monitor">PEAK</span>
                  </div>
                  <div className="cam-joystick">
                    <div className="joystick-base">
                      <div className="joystick-stick" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Camera lens mount preview */}
              <div className="cam-lens-section-mini">
                <div className="cam-lens-mount-ring">
                  <span className="mount-dot-mini" />
                  <span className="mount-label">E-MOUNT</span>
                  <span className="mount-dot-mini" />
                </div>
                <div className="cam-lens-barrel-mini">
                  <div className="lens-grip-rings">
                    <div className="grip-ring focus" />
                    <div className="grip-ring zoom" />
                  </div>
                  <div className="lens-glass-mini">
                    <div className="aperture-blades-mini" />
                    <div className="lens-reflection-mini" />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="camera-trusted-strip">
              <div className="camera-trusted-top">
                <span className="camera-trusted-dot" />
                <span className="camera-trusted-label">{t('viewfinderLabel')}</span>
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
                  className="camera-monitor-device"
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Camera Body Top */}
                  <div className="camera-body-top">
                    <div className="camera-mic-holes">
                      {[...Array(6)].map((_, i) => (
                        <span key={i} className="mic-hole" />
                      ))}
                    </div>
                    <div className="camera-shoulder" />
                  </div>

                  {/* Camera Monitor Screen */}
                  <div className="camera-monitor-screen-wrap">
                    <div className="camera-monitor-bezel">
                      <div className="camera-monitor-brand">SONY</div>
                      <div className="camera-monitor-screen">
                        {/* Viewfinder Overlay */}
                        <div className="camera-vf-overlay">
                          <div className="camera-vf-safety-frame" />
                          <div className="camera-vf-center-mark" />
                          <div className="camera-vf-rule-thirds">
                            <div className="vf-line h top" />
                            <div className="vf-line h bottom" />
                            <div className="vf-line v left" />
                            <div className="vf-line v right" />
                          </div>
                          <div className="camera-vf-hud">
                            <span className="vf-hud-item vf-rec">
                              <span className="vf-rec-dot" /> REC
                            </span>
                            <span className="vf-hud-item vf-timecode">00:12:34:15</span>
                            <span className="vf-hud-item vf-fstop">f/2.8</span>
                            <span className="vf-hud-item vf-iso">ISO 800</span>
                            <span className="vf-hud-item vf-shutter">1/200</span>
                            <span className="vf-hud-item vf-battery">100%</span>
                          </div>
                        </div>

                        {/* Logo Display */}
                        <img
                          src={selectedPartner.logo}
                          alt={selectedPartner.name}
                          className="camera-monitor-logo"
                        />
                      </div>
                      <div className="camera-monitor-controls">
                        <span className="cam-btn menu">MENU</span>
                        <span className="cam-btn">ZEBRA</span>
                        <span className="cam-btn">PEAK</span>
                        <span className="cam-btn">LUT</span>
                      </div>
                    </div>
                  </div>

                  {/* Camera Lens */}
                  <div className="camera-lens-section">
                    <div className="camera-lens-mount">
                      <div className="lens-mount-ring">
                        <span className="mount-dot" />
                        <span className="mount-text">E-MOUNT</span>
                        <span className="mount-dot" />
                      </div>
                    </div>
                    <div className="camera-lens-body">
                      <div className="lens-focus-ring">
                        <div className="focus-grip" />
                      </div>
                      <div className="lens-zoom-ring">
                        <div className="zoom-grip" />
                      </div>
                      <div className="lens-glass">
                        <div className="lens-reflection" />
                        <div className="lens-aperture">
                          <div className="aperture-blades" />
                        </div>
                      </div>
                    </div>
                    <div className="lens-hood">
                      <div className="hood-ribs">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="hood-rib" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Camera Info Panel */}
                  <div className="camera-info-panel">
                    <p className="camera-info-name">{selectedPartner.name}</p>
                    <p className="camera-info-meta">Trusted Partner • 4K Resolution</p>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    className="camera-monitor-close"
                    onClick={() => setSelectedPartner(null)}
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>
            )}

          <div className="ai-chat-preview js-reveal">
            <div className="ai-chat-preview-top">
              <div className="ai-preview-header">
                <div className="ai-preview-avatar">
                  <span className="ai-avatar-pulse" />
                  AI
                </div>
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
                    initial={{ opacity: 0, y: msg.type === 'user' ? 10 : 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                  >
                    <TypewriterText text={msg.text} delay={index === 0 ? 300 : 100} />
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    className="ai-typing-indicator"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
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
                {!userInput && <span className="input-placeholder">Click to start chatting...</span>}
              </button>
            </div>
          </div>

          <div className="mini-booking-card js-reveal" style={{ marginTop: '28px' }}>
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
