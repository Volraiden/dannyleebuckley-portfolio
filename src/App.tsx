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
  const aiPreviewMessagesRef = useRef<HTMLDivElement>(null);
  const cameraScrollContainerRef = useRef<HTMLDivElement>(null);
  const trustedLogosDisplayRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedPartner, setSelectedPartner] = useState<{ name: string; logo: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [chatStep, setChatStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput] = useState('');
  const [showInputCursor, setShowInputCursor] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

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
            if (newMessages.length > 6) {
              return newMessages.slice(newMessages.length - 6);
            }
            return newMessages;
          });
          setIsTyping(false);
          setChatStep((prev) => prev + 1);
        }, 1500);
      } else {
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

  useEffect(() => {
    const el = aiPreviewMessagesRef.current;
    if (!el) return;

    const scrollToBottom = () => {
      el.scrollTop = el.scrollHeight;
    };

    scrollToBottom();

    const intervalId = window.setInterval(scrollToBottom, 180);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 3800);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [chatMessages]);

  const clientLogos = [
    { name: 'Client 2', logo: 'https://danielbuckley.pics/images/logos/client2.png' },
    { name: 'Client 3', logo: 'https://danielbuckley.pics/images/logos/client3.png' },
    { name: 'Client 4', logo: 'https://danielbuckley.pics/images/logos/client4.png' },
    { name: 'Client 5', logo: 'https://danielbuckley.pics/images/logos/client5.png' },
    { name: 'Client 6', logo: 'https://danielbuckley.pics/images/logos/client6.png' },
    { name: 'ZBS', logo: 'https://danielbuckley.pics/images/logos/zbs.png' },
    { name: 'Iguana Studios', logo: 'https://danielbuckley.pics/images/logos/iguana-studios.png' },
    { name: '24H Series', logo: '/images/logos/24h-series.png' },
    { name: 'Asian Le Mans Series', logo: '/images/logos/asian-le-mans.png' },
    { name: 'OSCAR Academy', logo: '/images/logos/oscar-academy.png' },
    { name: 'LS', logo: '/images/logos/ls.png' },
    { name: 'FIA', logo: '/images/logos/fia.png' },
    { name: 'Red Bull', logo: 'https://i.postimg.cc/2CLJ7G72/image-2026-05-07-174957466-Photoroom.png' },
    { name: 'Duneworks Media', logo: '/images/logos/duneworks-media.png' },
    { name: 'D Logo', logo: '/images/logos/d-logo.png' },
    { name: 'Trusted Partner 1', logo: '/images/logos/new-trusted-1.png' },
    { name: 'Trusted Partner 2', logo: '/images/logos/new-trusted-2.png' },
    { name: 'Trusted Partner 3', logo: '/images/logos/new-trusted-3.webp' },
  ];
  // Duplicated set required: CSS keyframes scroll to -50% for a seamless infinite loop
  const displayedClientLogos = [...clientLogos, ...clientLogos];
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

  /** Mobile: continuously auto-advance the trusted logos strip */
  useEffect(() => {
    if (!isMobile || selectedPartner) return;

    const root = trustedLogosDisplayRef.current;
    if (!root) return;

    const wrapper = root.querySelector<HTMLElement>('.trusted-logos-wrapper');
    if (!wrapper) return;

    let rafId = 0;

    const speedPxPerFrame = 0.48;

    const tick = () => {
      const half = wrapper.scrollWidth / 2;
      if (half > 1) {
        let next = root.scrollLeft + speedPxPerFrame;
        if (next >= half) next -= half;
        root.scrollLeft = next;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [isMobile, selectedPartner]);

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
    const video = heroVideoRef.current;
    if (!video) return;

    // Optimize video loading for both PC and mobile
    video.load();

    const playVideo = async () => {
      try {
        if (video.paused) {
          await video.play();
        }
      } catch (err) {
        console.log('Video autoplay prevented:', err);
        setVideoError(true);
      }
    };

    // Try to play immediately and on load
    playVideo();

    video.addEventListener('loadeddata', () => {
      setVideoLoaded(true);
      playVideo();
    });

    video.addEventListener('canplay', () => {
      setVideoLoaded(true);
      playVideo();
    });

    video.addEventListener('error', () => {
      console.log('Video error occurred');
      setVideoError(true);
    });

    // Retry play on user interaction if autoplay was blocked
    const handleInteraction = () => {
      playVideo();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useEffect(() => {
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
            href="https://linktr.ee/Volraiden"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            title="Linktree"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <img
              src="https://i.postimg.cc/p5Q8h43D/image-2026-03-27-021532300.png"
              alt="Linktree"
              style={{
                width: '22px',
                height: '22px',
                objectFit: 'contain',
              }}
            />
          </motion.a>
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

      {/* Modern Mobile Navbar Sheet */}
      <div className={`mobile-nav-sheet ${mobileMenuOpen ? 'mobile-nav-open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <motion.div
          className="mobile-nav-content"
          initial={false}
          animate={mobileMenuOpen ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Nav Links as Row Cards */}
          <nav className="mobile-nav-rows" aria-label="Mobile">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
              <div className="mobile-nav-icon about-icon">
                <span className="nav-icon-dot" />
              </div>
              <span className="mobile-nav-label">{t('navAbout')}</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
              <div className="mobile-nav-icon work-icon">
                <span className="nav-icon-dot" />
              </div>
              <span className="mobile-nav-label">{t('navWork')}</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-row">
              <div className="mobile-nav-icon contact-icon">
                <span className="nav-icon-dot" />
              </div>
              <span className="mobile-nav-label">{t('navContact')}</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
          </nav>

          {/* Quick Actions Row */}
          <div className="mobile-nav-actions">
            <button
              type="button"
              className="mobile-action-btn chat-btn"
              onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }}
            >
              <span className="action-icon">💬</span>
              <span className="action-label">{t('navAIChat')}</span>
            </button>
            <button
              type="button"
              className="mobile-action-btn theme-btn"
              onClick={toggleTheme}
            >
              <span className="action-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span className="action-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>

          {/* CTA Section */}
          <a
            href="https://cal.com/danielleebuckley"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-cta"
          >
            <span className="cta-icon">📅</span>
            <span className="cta-text">Book a Call</span>
            <span className="cta-arrow">→</span>
          </a>

          {/* Language Switcher at Bottom */}
          <div className="mobile-nav-footer">
            <LanguageSwitcher />
          </div>
        </motion.div>
      </div>

      <AIChat open={chatOpen} onClose={() => setChatOpen(false)} />

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-video-container">
            {/* Video loading placeholder */}
            {!videoLoaded && !videoError && (
              <div className="hero-video-placeholder">
                <div className="video-loading-spinner" />
              </div>
            )}
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
              preload="auto"
              poster="/images/profile-top-left.webp"
              disablePictureInPicture
              disableRemotePlayback
              onLoadedData={() => setVideoLoaded(true)}
              onCanPlay={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
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

        <section id="about" className="content-section">
          <div className="about-heading-row">
            <div className="section-heading js-reveal">
              <span className="section-label">{t('sectionAbout')}</span>
              <h2>{t('aboutHeading')}</h2>
            </div>
            <div className="about-hero-image js-reveal">
              <div className="camera-card" aria-hidden="true">
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
                    <div className="camera-scroll-container" ref={cameraScrollContainerRef}>
                      <div className="camera-scroll-track">
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service1Title')}</span><span className="scroll-desc">{t('service1Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service2Title')}</span><span className="scroll-desc">{t('service2Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service3Title')}</span><span className="scroll-desc">{t('service3Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service4Title')}</span><span className="scroll-desc">{t('service4Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service5Title')}</span><span className="scroll-desc">{t('service5Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service1Title')}</span><span className="scroll-desc">{t('service1Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service2Title')}</span><span className="scroll-desc">{t('service2Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service3Title')}</span><span className="scroll-desc">{t('service3Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service4Title')}</span><span className="scroll-desc">{t('service4Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service5Title')}</span><span className="scroll-desc">{t('service5Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service1Title')}</span><span className="scroll-desc">{t('service1Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service2Title')}</span><span className="scroll-desc">{t('service2Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service3Title')}</span><span className="scroll-desc">{t('service3Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service4Title')}</span><span className="scroll-desc">{t('service4Desc').split('.')[0]}</span></div>
                        <div className="camera-scroll-item"><span className="scroll-title">{t('service5Title')}</span><span className="scroll-desc">{t('service5Desc').split('.')[0]}</span></div>
                      </div>
                    </div>
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

          {/* Desktop Cinema Room - Hidden on Mobile */}
          <motion.div
            className="cinema-room js-reveal desktop-only"
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
              <div className="cinema-film-grain" aria-hidden="true" />

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

              <div className="cinema-projector-flicker" aria-hidden="true" />

              <div className="cinema-room-stage">
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
                        className="cinema-card-icon"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <service.icon size={16} />
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

          {/* Mobile Services Showcase - Shown only on Mobile */}
          <div className="mobile-services-showcase">
            <div className="mobile-services-header">
              <span className="mobile-services-label">What I Do</span>
              <h3 className="mobile-services-title">Services</h3>
            </div>
            <div className="mobile-services-grid">
              {serviceKeys.map((service, index) => (
                <motion.div
                  key={service.titleKey}
                  className="mobile-service-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="mobile-service-icon">
                    <service.icon size={20} />
                  </div>
                  <div className="mobile-service-content">
                    <h4>{t(service.titleKey)}</h4>
                    <p>{t(service.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mobile-featured-header">
              <span className="mobile-services-label">Featured</span>
              <h3 className="mobile-services-title">Work</h3>
            </div>
            <div className="mobile-featured-grid">
              {featuredWorkKeys.map((item, index) => (
                <motion.div
                  key={item.titleKey}
                  className="mobile-featured-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mobile-featured-category">{t(item.categoryKey)}</span>
                  <h4>{t(item.titleKey)}</h4>
                  <p>{t(item.copyKey)}</p>
                  <a
                    href="https://instagram.com/Buckley.lens"
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-featured-link"
                  >
                    <span>View on Instagram</span>
                    <ExternalLink size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="clients-section">
            <div className="clients-header js-reveal">
              <h3>{t('trustedBy')}</h3>
              <p>{t('clientsSubtext')}</p>
            </div>

            <motion.div
              className="trusted-display-monitor js-reveal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="trusted-monitor-topbar">
                <div className="trusted-monitor-dot" />
                <span className="trusted-monitor-label">{t('trustedByBadge')}</span>
                <span className="trusted-monitor-count">{t('brandsCount')}</span>
              </div>

              <div className="trusted-display-screen">
                <div className="trusted-display-overlay">
                  <div className="trusted-grid-lines">
                    <div className="grid-v left" />
                    <div className="grid-v center" />
                    <div className="grid-v right" />
                    <div className="grid-h top" />
                    <div className="grid-h middle" />
                    <div className="grid-h bottom" />
                  </div>

                  <div className="trusted-corners">
                    <span className="corner-tl" />
                    <span className="corner-tr" />
                    <span className="corner-bl" />
                    <span className="corner-br" />
                  </div>

                  <div className="trusted-rec-indicator">
                    <span className="rec-dot" />
                    <span className="rec-text">REC</span>
                  </div>

                  <div className="trusted-focus-info">
                    <span>F2.8</span>
                    <span>ISO 800</span>
                    <span>1/120</span>
                  </div>
                </div>

                <div className="trusted-logos-display" ref={trustedLogosDisplayRef}>
                  <div className="trusted-logos-wrapper">
                    {displayedClientLogos.map((client, index) => (
                      <motion.button
                        key={`${client.name}-${index}`}
                        type="button"
                        className="trusted-logo-btn"
                        onClick={() => setSelectedPartner(client)}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        {brokenLogos[client.name] ? (
                          <span className="trusted-logo-fallback">{client.name}</span>
                        ) : (
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="trusted-logo-display-img"
                            loading={isMobile ? 'eager' : 'lazy'}
                            decoding="async"
                            onError={() =>
                              setBrokenLogos((prev) => ({
                                ...prev,
                                [client.name]: true,
                              }))
                            }
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="trusted-monitor-controls">
                <div className="trusted-control-dial">
                  <div className="dial-center" />
                </div>
                <div className="trusted-control-buttons">
                  <span>MENU</span>
                  <span>DISP</span>
                  <span>PEAK</span>
                </div>
                <div className="trusted-brand-badge">
                  <span>SONY</span>
                </div>
              </div>
            </motion.div>

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
                  <div className="camera-body-top">
                    <div className="camera-mic-holes">
                      {[...Array(6)].map((_, i) => (
                        <span key={i} className="mic-hole" />
                      ))}
                    </div>
                    <div className="camera-shoulder" />
                  </div>

                  <div className="camera-monitor-screen-wrap">
                    <div className="camera-monitor-bezel">
                      <div className="camera-monitor-brand">SONY</div>
                      <div className="camera-monitor-screen">
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

                  <div className="camera-info-panel">
                    <p className="camera-info-name">{selectedPartner.name}</p>
                    <p className="camera-info-meta">Trusted Partner • 4K Resolution</p>
                  </div>

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
              <div className="ai-preview-messages" ref={aiPreviewMessagesRef}>
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

        <section id="contact" className="content-section">
          <div className="section-heading js-reveal">
            <span className="section-label">{t('sectionContact')}</span>
            <h2>{t('getInTouchHeading')}</h2>
          </div>

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
