import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
import { CustomCursor } from './components/CustomCursor';
import { PhotoGallery } from './components/PhotoGallery';

gsap.registerPlugin(ScrollTrigger);

/* ── Typewriter helper ───────────────────────────────────── */
function TypewriterText({
  text,
  speed = 25,
  delay = 0,
}: {
  text: string;
  speed?: number;
  delay?: number;
}) {
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

/* ── Static data ─────────────────────────────────────────── */
const serviceKeys = [
  { titleKey: 'service1Title', descKey: 'service1Desc', icon: Camera },
  { titleKey: 'service2Title', descKey: 'service2Desc', icon: Film },
  { titleKey: 'service3Title', descKey: 'service3Desc', icon: Video },
  { titleKey: 'service4Title', descKey: 'service4Desc', icon: Clapperboard },
  { titleKey: 'service5Title', descKey: 'service5Desc', icon: Code },
];

const highlightsKeys = [
  { value: '6',    labelKey: 'stat1Label' },
  { value: '50+',  labelKey: 'stat2Label' },
  { value: '50K+', labelKey: 'stat3Label' },
];

const featuredWorkKeys = [
  { titleKey: 'featured1Title', categoryKey: 'featured1Category', copyKey: 'featured1Copy' },
  { titleKey: 'featured2Title', categoryKey: 'featured2Category', copyKey: 'featured2Copy' },
  { titleKey: 'featured3Title', categoryKey: 'featured3Category', copyKey: 'featured3Copy' },
];

const clientLogos = [
  { name: 'Client 2',            logo: 'https://danielbuckley.pics/images/logos/client2.png' },
  { name: 'Client 3',            logo: 'https://danielbuckley.pics/images/logos/client3.png' },
  { name: 'Client 4',            logo: 'https://danielbuckley.pics/images/logos/client4.png' },
  { name: 'Client 5',            logo: 'https://danielbuckley.pics/images/logos/client5.png' },
  { name: 'Client 6',            logo: 'https://danielbuckley.pics/images/logos/client6.png' },
  { name: 'ZBS',                 logo: 'https://danielbuckley.pics/images/logos/zbs.png' },
  { name: 'Iguana Studios',      logo: 'https://danielbuckley.pics/images/logos/iguana-studios.png' },
  { name: '24H Series',          logo: '/images/logos/24h-series.png' },
  { name: 'Asian Le Mans Series',logo: '/images/logos/asian-le-mans.png' },
  { name: 'OSCAR Academy',       logo: '/images/logos/oscar-academy.png' },
  { name: 'LS',                  logo: '/images/logos/ls.png' },
  { name: 'FIA',                 logo: '/images/logos/fia.png' },
  { name: 'Red Bull',            logo: 'https://i.postimg.cc/2CLJ7G72/image-2026-05-07-174957466-Photoroom.png' },
  { name: 'Duneworks Media',     logo: '/images/logos/duneworks-media.png' },
  { name: 'D Logo',              logo: '/images/logos/d-logo.png' },
  { name: 'Trusted Partner 1',   logo: '/images/logos/new-trusted-1.png' },
  { name: 'Trusted Partner 2',   logo: '/images/logos/new-trusted-2.png' },
  { name: 'Trusted Partner 3',   logo: '/images/logos/new-trusted-3.webp' },
];

const displayedClientLogos = [...clientLogos, ...clientLogos];

/* ── Film strip perforations for loader ──────────────────── */
function FilmStrip() {
  return (
    <div className="loader-film-strip-row" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="film-perf" />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════ */
function App() {
  const appRef    = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLElement>(null);
  const heroVideoRef        = useRef<HTMLVideoElement>(null);
  const aiPreviewMessagesRef = useRef<HTMLDivElement>(null);
  const cameraScrollContainerRef = useRef<HTMLDivElement>(null);
  const trustedLogosDisplayRef   = useRef<HTMLDivElement>(null);

  const { t, locale } = useLanguage();

  /* ── State ─────────────────────────────────────────────── */
  const [chatOpen,       setChatOpen]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading,      setIsLoading]      = useState(true);
  const [isMobile,       setIsMobile]       = useState(false);
  const [reduceMotion,   setReduceMotion]   = useState(false);
  const [canHover,       setCanHover]       = useState(false);
  const [theme,          setTheme]          = useState<'dark' | 'light'>('dark');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<{ name: string; logo: string } | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [brokenLogos,    setBrokenLogos]    = useState<Record<string, boolean>>({});
  const [videoLoaded,    setVideoLoaded]    = useState(false);
  const [videoError,     setVideoError]     = useState(false);

  /* AI demo chat */
  const [chatMessages, setChatMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [chatStep,     setChatStep]     = useState(0);
  const [isTyping,     setIsTyping]     = useState(false);
  const [userInput]    = useState('');
  const [showInputCursor, setShowInputCursor] = useState(true);

  /* ── Hero parallax motion values ───────────────────────── */
  const heroMouseX = useMotionValue(0.5);
  const heroMouseY = useMotionValue(0.5);
  const smoothX = useSpring(heroMouseX, { stiffness: 55, damping: 20, mass: 0.6 });
  const smoothY = useSpring(heroMouseY, { stiffness: 55, damping: 20, mass: 0.6 });

  // Video layer moves opposite to mouse (depth effect)
  const videoParallaxX = useTransform(smoothX, [0, 1], ['4%', '-4%']);
  const videoParallaxY = useTransform(smoothY, [0, 1], ['4%', '-4%']);

  // Title floats slightly with mouse
  const titleParallaxX = useTransform(smoothX, [0, 1], ['-1.5%', '1.5%']);
  const titleParallaxY = useTransform(smoothY, [0, 1], ['-1%', '1%']);

  /* ── Chat demo sequence ────────────────────────────────── */
  const chatDemoSequence = [
    { type: 'user' as const, text: t('chatDemo1') },
    { type: 'bot'  as const, text: t('chatDemo2') },
    { type: 'user' as const, text: t('chatDemo3') },
    { type: 'bot'  as const, text: t('chatDemo4') },
    { type: 'user' as const, text: t('chatDemo5') },
    { type: 'bot'  as const, text: t('chatDemo6') },
    { type: 'bot'  as const, text: t('chatDemo7') },
  ];

  useEffect(() => {
    setChatMessages([]);
    setChatStep(0);
  }, [locale]);

  useEffect(() => {
    if (reduceMotion || document.hidden) return;
    let timeout: number;
    let cancelled = false;

    const runSequence = () => {
      if (cancelled || document.hidden) return;
      if (chatStep < chatDemoSequence.length) {
        setIsTyping(true);
        timeout = window.setTimeout(() => {
          setChatMessages((prev) => {
            const next = [...prev, chatDemoSequence[chatStep]];
            return next.length > 6 ? next.slice(next.length - 6) : next;
          });
          setIsTyping(false);
          setChatStep((s) => s + 1);
        }, isMobile ? 1900 : 1500);
      } else {
        timeout = window.setTimeout(() => {
          setChatMessages([]);
          setChatStep(0);
        }, 4000);
      }
    };

    const onVis = () => {
      if (document.hidden) {
        window.clearTimeout(timeout);
      } else {
        runSequence();
      }
    };

    document.addEventListener('visibilitychange', onVis);
    runSequence();
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      document.removeEventListener('visibilitychange', onVis);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatStep, locale, reduceMotion, isMobile]);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setShowInputCursor((p) => !p);
    }, 530);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  useEffect(() => {
    const el = aiPreviewMessagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    const id = window.setInterval(() => { el.scrollTop = el.scrollHeight; }, 180);
    const tid = window.setTimeout(() => window.clearInterval(id), 3800);
    return () => { window.clearTimeout(tid); window.clearInterval(id); };
  }, [chatMessages]);

  /* ── Theme init ────────────────────────────────────────── */
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    const saved = window.localStorage.getItem('site-theme');
    if (saved === 'light' || saved === 'dark') { setTheme(saved); return; }
    setTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('site-theme', theme);
  }, [theme]);

  /* ── Device / motion capability ────────────────────────── */
  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 768px)');
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)');

    const sync = () => {
      setIsMobile(mobileMq.matches);
      setReduceMotion(reduceMq.matches);
      setCanHover(hoverMq.matches);
      document.documentElement.classList.toggle('is-mobile', mobileMq.matches);
      document.documentElement.classList.toggle('reduce-motion', reduceMq.matches);
      document.documentElement.classList.toggle('can-hover', hoverMq.matches);
    };

    sync();
    mobileMq.addEventListener('change', sync);
    reduceMq.addEventListener('change', sync);
    hoverMq.addEventListener('change', sync);
    return () => {
      mobileMq.removeEventListener('change', sync);
      reduceMq.removeEventListener('change', sync);
      hoverMq.removeEventListener('change', sync);
    };
  }, []);

  /* ── Header scroll behaviour (rAF-throttled) ───────────── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setHeaderScrolled(window.scrollY > 80);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Mobile logos auto-scroll (pause on touch / hidden) ── */
  useEffect(() => {
    if (!isMobile || selectedPartner || reduceMotion) return;
    const root = trustedLogosDisplayRef.current;
    if (!root) return;
    const wrapper = root.querySelector<HTMLElement>('.trusted-logos-wrapper');
    if (!wrapper) return;

    let rafId = 0;
    let paused = false;
    let resumeTimer = 0;
    const speed = 0.42;

    const tick = () => {
      if (!paused && !document.hidden) {
        const half = wrapper.scrollWidth / 2;
        if (half > 1) {
          let next = root.scrollLeft + speed;
          if (next >= half) next -= half;
          root.scrollLeft = next;
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const scheduleResume = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, 1800);
    };

    root.addEventListener('touchstart', pause, { passive: true });
    root.addEventListener('touchend', scheduleResume, { passive: true });
    root.addEventListener('wheel', pause, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause();
      else scheduleResume();
    });

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(resumeTimer);
      root.removeEventListener('touchstart', pause);
      root.removeEventListener('touchend', scheduleResume);
      root.removeEventListener('wheel', pause);
    };
  }, [isMobile, selectedPartner, reduceMotion]);

  /* ── Loader timer ──────────────────────────────────────── */
  useEffect(() => {
    const delay = reduceMotion ? 200 : isMobile ? 450 : 1200;
    const timer = window.setTimeout(() => setIsLoading(false), delay);
    return () => window.clearTimeout(timer);
  }, [isMobile, reduceMotion]);

  /* ── Video playback (lazy + pause offscreen) ───────────── */
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        if (video.paused) await video.play();
      } catch {
        /* autoplay may be blocked until interaction */
      }
    };

    const onLoaded = () => setVideoLoaded(true);
    const onError = () => setVideoError(true);

    video.addEventListener('loadeddata', onLoaded);
    video.addEventListener('canplay', onLoaded);
    video.addEventListener('error', onError);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !document.hidden) {
          play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(video);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().top < window.innerHeight) play();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const handleInteraction = () => {
      play();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true, passive: true });

    // Kick off load without blocking first paint on mobile
    if (video.readyState >= 2) setVideoLoaded(true);
    else play();

    return () => {
      io.disconnect();
      video.removeEventListener('loadeddata', onLoaded);
      video.removeEventListener('canplay', onLoaded);
      video.removeEventListener('error', onError);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  /* ── GSAP scroll reveals ───────────────────────────────── */
  useEffect(() => {
    if (reduceMotion) {
      document.querySelectorAll<HTMLElement>('.js-reveal, .stagger-item').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const yOffset = isMobile ? 28 : 48;
    const duration = isMobile ? 0.55 : 0.9;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: yOffset, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.stagger-grid').forEach((grid) => {
        const items = grid.querySelectorAll('.stagger-item');
        gsap.fromTo(
          items,
          { y: isMobile ? 18 : 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.45 : 0.7,
            stagger: isMobile ? 0.06 : 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    }, appRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile, reduceMotion]);

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!canHover || reduceMotion || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    heroMouseX.set((e.clientX - rect.left) / rect.width);
    heroMouseY.set((e.clientY - rect.top) / rect.height);
  };

  /* ══════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════ */
  return (
    <div ref={appRef} className="site-shell">

      {/* ── Custom cursor ─────────────────────────────── */}
      <CustomCursor />

      {/* ══════════════════════════════════════════════
          STARTUP LOADER
          ══════════════════════════════════════════════ */}
      <motion.div
        className="startup-loader"
        aria-live="polite"
        aria-label="Site loading"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
      >
        <div className="loader-film-strip top" aria-hidden="true">
          <FilmStrip />
        </div>

        <div className="loader-main">
          <motion.img
            src="/images/logos/duneworks.png"
            alt="Duneworks"
            className="loader-logo"
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.h1
            className="loader-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            DUNEWORKS
          </motion.h1>
          <motion.p
            className="loader-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            {t('creativeStudio').toUpperCase()}
          </motion.p>
          <motion.div
            className="loader-progress-track"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          >
            <motion.div
              className="loader-progress-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 1.1, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        <div className="loader-film-strip bot" aria-hidden="true">
          <FilmStrip />
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          HEADER
          ══════════════════════════════════════════════ */}
      <header className={`site-header ${headerScrolled ? 'scrolled' : ''}`}>
        <motion.a
          className="wordmark"
          href="#hero"
          whileHover={{ opacity: 0.75 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="/images/profile-top-left.webp"
            alt="Daniel Lee Buckley"
            className="profile-photo"
          />
          <span className="wordmark-text">DANIEL LEE BUCKLEY</span>
        </motion.a>

        <nav className="site-nav-desk" aria-label="Primary">
          <a href="#about">{t('navAbout')}</a>
          <a href="#work">{t('navWork')}</a>
          <a href="#gallery">{t('navGallery')}</a>
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
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            <span>{theme === 'dark' ? t('themeLight') : t('themeDark')}</span>
          </button>

          <motion.a
            href="https://linktr.ee/Volraiden"
            target="_blank"
            rel="noreferrer"
            className="linktree-btn"
            title="Linktree"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://i.postimg.cc/p5Q8h43D/image-2026-03-27-021532300.png"
              alt="Linktree"
            />
          </motion.a>

          <motion.a
            className="header-cta"
            href="https://cal.com/danielleebuckley"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, opacity: 0.88 }}
            whileTap={{ scale: 0.97 }}
          >
            {t('bookACall')}
          </motion.a>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          FULLSCREEN MOBILE MENU
          ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-fullscreen"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 38px) 38px)' }}
            animate={{ opacity: 1, clipPath: 'circle(170% at calc(100% - 38px) 38px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 38px) 38px)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <button
              type="button"
              className="mobile-nav-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>

            <nav className="mobile-nav-links-wrap" aria-label="Mobile">
              {[
                { href: '#about',   label: t('navAbout'),   num: '01' },
                { href: '#work',    label: t('navWork'),    num: '02' },
                { href: '#gallery', label: t('navGallery'), num: '03' },
                { href: '#contact', label: t('navContact'), num: '04' },
              ].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                >
                  <span className="mobile-link-num">{link.num}</span>
                  <span className="mobile-link-text">{link.label}</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mobile-nav-bottom"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <button
                type="button"
                className="mobile-action-pill"
                onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }}
              >
                {t('navAIChat')}
              </button>
              <button
                type="button"
                className="mobile-action-pill"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                <span>{theme === 'dark' ? t('themeLight') : t('themeDark')}</span>
              </button>
              <div style={{ display: 'flex', marginLeft: 'auto' }}>
                <LanguageSwitcher />
              </div>
              <a
                href="https://cal.com/danielleebuckley"
                target="_blank"
                rel="noreferrer"
                className="mobile-nav-cta-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('bookACall')}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat overlay */}
      <AIChat open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* ══════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════ */}
      <main>

        {/* ────────────────────────────────────────────
            HERO
            ──────────────────────────────────────────── */}
        <section
          id="hero"
          className="hero-section"
          ref={heroRef}
          onMouseMove={canHover && !reduceMotion ? handleHeroMouseMove : undefined}
          onMouseLeave={
            canHover && !reduceMotion
              ? () => {
                  heroMouseX.set(0.5);
                  heroMouseY.set(0.5);
                }
              : undefined
          }
        >
          {/* Parallax video layer */}
          <motion.div
            className="hero-video-layer"
            style={
              canHover && !reduceMotion && !isMobile
                ? { x: videoParallaxX, y: videoParallaxY }
                : undefined
            }
          >
            <div className="hero-video-container">
              {!videoLoaded && !videoError && (
                <div className="hero-video-placeholder" />
              )}
              <video
                ref={heroVideoRef}
                autoPlay
                muted
                loop
                playsInline
                className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
                preload={isMobile ? 'metadata' : 'auto'}
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
          </motion.div>

          {/* Cinematic overlay */}
          <div className="hero-cinematic-overlay" aria-hidden="true" />

          {/* Film grain on hero */}
          <div className="hero-grain" aria-hidden="true" />

          {/* Side text — vertical */}
          <div className="hero-side-tag" aria-hidden="true">
            <span>{t('heroSideTag').toUpperCase()}</span>
          </div>

          {/* Main content */}
          <motion.div
            className="hero-content"
            style={
              canHover && !reduceMotion && !isMobile
                ? { x: titleParallaxX, y: titleParallaxY }
                : undefined
            }
          >
            <motion.span
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('heroEyebrow')}
            </motion.span>

            <h1 className="hero-title">
              <span className="hero-line">
                <motion.span
                  className="hero-line-inner"
                  initial={{ y: '110%' }}
                  animate={!isLoading ? { y: '0%' } : {}}
                  transition={{ delay: 0.6, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                >
                  DANIEL LEE
                </motion.span>
              </span>
              <span className="hero-line">
                <motion.span
                  className="hero-line-inner"
                  initial={{ y: '110%' }}
                  animate={!isLoading ? { y: '0%' } : {}}
                  transition={{ delay: 0.78, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                >
                  BUCKLEY
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.05, duration: 0.8 }}
            >
              {t('heroSubtitle')}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.25, duration: 0.8 }}
            >
              <a
                href="#work"
                className="btn-primary"
                data-cursor="EXPLORE"
              >
                {t('viewMyWork')}
              </a>
              <a
                href="#contact"
                className="btn-ghost"
              >
                {t('getInTouch')}
              </a>
            </motion.div>
          </motion.div>

          {/* Bottom info bar */}
          <motion.div
            className="hero-bottom"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span className="hero-location">{t('locationLabel')}</span>

            <div className="hero-scroll-indicator">
              <span>{t('scrollExplore')}</span>
              <motion.div
                className="scroll-line"
                animate={reduceMotion ? { scaleY: 1 } : { scaleY: [0, 1, 0] }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                }
              />
            </div>

            <span className="hero-year">2026</span>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────
            ABOUT
            ──────────────────────────────────────────── */}
        <section id="about" className="about-section">
          <div className="section-number-bg" aria-hidden="true">01</div>
          <div className="container">

            <div className="about-header js-reveal">
              <span className="section-tag">{t('sectionAbout')}</span>
              <h2 className="section-headline">{t('aboutHeading')}</h2>
            </div>

            <div className="about-body">
              <div className="about-text-col js-reveal">
                <p>{t('aboutPara1')}</p>
                <p>{t('aboutPara2')}</p>

                <div className="about-stats stagger-grid">
                  {highlightsKeys.map((item) => (
                    <motion.div
                      key={item.labelKey}
                      className="stat-item stagger-item"
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className="stat-value">{item.value}</span>
                      <span className="stat-label">{t(item.labelKey)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Camera gadget */}
              <div className="about-visual-col js-reveal">
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
                          {[...serviceKeys, ...serviceKeys, ...serviceKeys].map((s, idx) => (
                            <div key={idx} className="camera-scroll-item">
                              <span className="scroll-title">{t(s.titleKey)}</span>
                              <span className="scroll-desc">{t(s.descKey).split('.')[0]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="camera-screen-lines" />
                    </div>
                    <div className="camera-controls">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ────────────────────────────────────────────
            SERVICES (numbered list)
            ──────────────────────────────────────────── */}
        <section id="services" className="services-section">
          <div className="section-number-bg" aria-hidden="true">02</div>
          <div className="container">

            <div className="services-header js-reveal">
              <span className="section-tag">{t('sectionServices')}</span>
              <h2 className="section-headline">{t('servicesHeading')}</h2>
            </div>

            <ul className="services-list" role="list">
              {serviceKeys.map((service, index) => (
                <motion.li
                  key={service.titleKey}
                  className="service-item"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.55, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <div className="service-row">
                    <span className="service-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="service-main">
                      <h3 className="service-name">{t(service.titleKey)}</h3>
                      <AnimatePresence>
                        {hoveredService === index && (
                          <motion.div
                            className="service-desc-wrap"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: 'easeOut' }}
                          >
                            <p className="service-desc">{t(service.descKey)}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="service-icon-wrap">
                      <service.icon size={22} />
                    </div>
                  </div>
                  <motion.div
                    className="service-accent-line"
                    animate={{ scaleX: hoveredService === index ? 1 : 0 }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </motion.li>
              ))}
            </ul>

          </div>
        </section>

        {/* ────────────────────────────────────────────
            WORK / PORTFOLIO
            ──────────────────────────────────────────── */}
        <section id="work" className="work-section">
          <div className="section-number-bg" aria-hidden="true">03</div>
          <div className="container">

            <div className="work-header js-reveal">
              <span className="section-tag">{t('sectionWork')}</span>
              <h2 className="section-headline">{t('workHeading')}</h2>

              <div className="work-ui-strip">
                <motion.span
                  className="work-rec-dot"
                  animate={reduceMotion || isMobile ? { opacity: 1 } : { opacity: [1, 0.3, 1] }}
                  transition={
                    reduceMotion || isMobile
                      ? { duration: 0 }
                      : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                />
                <span className="work-rec-label">REC</span>
                <div className="work-strip-icons">
                  <Camera size={14} />
                  <Clapperboard size={14} />
                  <Film size={14} />
                </div>
                <div className="work-film-track" />
              </div>
            </div>

            {/* Desktop: Cinema Room */}
            <motion.div
              className="cinema-room js-reveal desktop-only"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="cinema-room-topbar">
                {[
                  { delay: 0.2, label: t('cinemaRoom') },
                  { delay: 0.3, label: t('imax'), className: 'imax' },
                  { delay: 0.4, label: t('dolbyAtmos') },
                ].map(({ delay, label, className }) => (
                  <motion.span
                    key={label}
                    className={`cinema-pill ${className ?? ''}`}
                    initial={{ opacity: 0, y: -8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay }}
                    viewport={{ once: true }}
                  >
                    {label}
                  </motion.span>
                ))}
              </div>

              <div className="cinema-room-screen">
                <div className="cinema-film-grain" aria-hidden="true" />

                <motion.div
                  className="cinema-room-glow"
                  animate={
                    reduceMotion || isMobile
                      ? { opacity: 0.4 }
                      : { opacity: [0.3, 0.55, 0.3], scale: [1, 1.04, 1] }
                  }
                  transition={
                    reduceMotion || isMobile
                      ? { duration: 0 }
                      : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                  }
                />

                <div className="cinema-light-beams" aria-hidden="true">
                  {[...Array(isMobile || reduceMotion ? 0 : 3)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="light-beam"
                      style={{ left: `${30 + i * 20}%`, rotate: -20 + i * 20 }}
                      animate={{ opacity: [0.05, 0.25, 0.05], x: [-15, 15, -15] }}
                      transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                    />
                  ))}
                </div>

                <div className="cinema-projector-flicker" aria-hidden="true" />

                <div className="cinema-room-stage">
                  <div className="cinema-room-grid">
                    {/* Service cards */}
                    {serviceKeys.map((service, index) => (
                      <motion.article
                        key={service.titleKey}
                        className="cinema-card"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.09 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}
                      >
                        <motion.div
                          className="cinema-card-icon"
                          whileHover={{ rotate: 8, scale: 1.12 }}
                          transition={{ type: 'spring', stiffness: 320 }}
                        >
                          <service.icon size={15} />
                        </motion.div>
                        <h3>{t(service.titleKey)}</h3>
                        <p>{t(service.descKey)}</p>
                      </motion.article>
                    ))}

                    {/* Featured work */}
                    {featuredWorkKeys.map((item, index) => (
                      <motion.article
                        key={item.titleKey}
                        className="cinema-card featured"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (serviceKeys.length + index) * 0.09 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}
                      >
                        <motion.span
                          className="cinema-card-kicker"
                          animate={reduceMotion || isMobile ? { opacity: 1 } : { opacity: [0.6, 1, 0.6] }}
                          transition={
                            reduceMotion || isMobile
                              ? { duration: 0 }
                              : { duration: 2.2, repeat: Infinity }
                          }
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
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          data-cursor="VIEW"
                        >
                          <span>{t('viewOnInstagram')}</span>
                          <ExternalLink size={13} />
                        </motion.a>
                      </motion.article>
                    ))}
                  </div>
                </div>

                {/* Ambient seat lights */}
                <div className="cinema-ambient-lights" aria-hidden="true">
                  {[...Array(isMobile || reduceMotion ? 0 : 8)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="cinema-light"
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.22 }}
                    />
                  ))}
                </div>
              </div>

              <div className="cinema-seats" aria-hidden="true">
                {[...Array(20)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="cinema-seat"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Mobile: services + featured showcase */}
            <div className="mobile-services-showcase">
              <div className="mobile-services-header">
                <span className="mobile-services-label">{t('whatIDo')}</span>
                <h3 className="mobile-services-title">{t('sectionServices')}</h3>
              </div>
              <div className="mobile-services-grid">
                {serviceKeys.map((service, i) => (
                  <motion.div
                    key={service.titleKey}
                    className="mobile-service-card"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    whileTap={{ scale: 0.97 }}
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
                <span className="mobile-services-label">{t('featuredLabel')}</span>
                <h3 className="mobile-services-title">{t('sectionWork')}</h3>
              </div>
              <div className="mobile-featured-grid">
                {featuredWorkKeys.map((item, i) => (
                  <motion.div
                    key={item.titleKey}
                    className="mobile-featured-card"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.12 }}
                    viewport={{ once: true }}
                    whileTap={{ scale: 0.97 }}
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
                      <span>{t('viewOnInstagram')}</span>
                      <ExternalLink size={13} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Trusted by / client logos ────────────── */}
            <div className="clients-section">
              <div className="clients-header js-reveal">
                <h3>{t('trustedBy')}</h3>
                <p>{t('clientsSubtext')}</p>
              </div>

              <motion.div
                className="trusted-display-monitor js-reveal"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="trusted-monitor-topbar">
                  <div className="trusted-monitor-dot" />
                  <span className="trusted-monitor-label">{t('trustedByBadge')}</span>
                  <span className="trusted-monitor-count">{t('brandsCount')}</span>
                </div>

                <div className="trusted-display-screen">
                  <div className="trusted-display-overlay" aria-hidden="true">
                    <div className="trusted-grid-lines">
                      <div className="grid-v left" /><div className="grid-v center" /><div className="grid-v right" />
                      <div className="grid-h top"  /><div className="grid-h middle" /><div className="grid-h bottom" />
                    </div>
                    <div className="trusted-corners">
                      <span className="corner-tl" /><span className="corner-tr" />
                      <span className="corner-bl" /><span className="corner-br" />
                    </div>
                    <div className="trusted-rec-indicator">
                      <span className="rec-dot" /><span className="rec-text">REC</span>
                    </div>
                    <div className="trusted-focus-info">
                      <span>F2.8</span><span>ISO 800</span><span>1/120</span>
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
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                          data-cursor="VIEW"
                        >
                          {brokenLogos[client.name] ? (
                            <span className="trusted-logo-fallback">{client.name}</span>
                          ) : (
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="trusted-logo-display-img"
                              loading="lazy"
                              decoding="async"
                              width={80}
                              height={50}
                              onError={() =>
                                setBrokenLogos((prev) => ({ ...prev, [client.name]: true }))
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
                    <span>MENU</span><span>DISP</span><span>PEAK</span>
                  </div>
                  <div className="trusted-brand-badge">SONY</div>
                </div>
              </motion.div>

              {/* Partner viewfinder modal */}
              <AnimatePresence>
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
                      initial={{ scale: 0.82, opacity: 0, y: 24 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.82, opacity: 0, y: 24 }}
                      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="camera-body-top">
                        <div className="camera-mic-holes">
                          {[...Array(6)].map((_, i) => <span key={i} className="mic-hole" />)}
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
                                <div className="vf-line h top" /><div className="vf-line h bottom" />
                                <div className="vf-line v left" /><div className="vf-line v right" />
                              </div>
                              <div className="camera-vf-hud">
                                <span className="vf-hud-item vf-rec"><span className="vf-rec-dot" />REC</span>
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
                        <p className="camera-info-meta">{t('trustedPartner')}</p>
                      </div>

                      <button
                        type="button"
                        className="camera-monitor-close"
                        onClick={() => setSelectedPartner(null)}
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── AI chat preview ─────────────────────── */}
              <div className="ai-chat-preview js-reveal">
                <div className="ai-chat-preview-top">
                  <div className="ai-preview-header">
                    <div className="ai-preview-avatar">
                      <span className="ai-avatar-pulse" />
                      AI
                    </div>
                    <div>
                      <p className="ai-preview-title">{t('aiAssistantTitle')}</p>
                      <p className="ai-preview-status">
                        <span className="ai-status-dot" />
                        {t('onlineNow')}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mini-booking-btn"
                    onClick={() => setChatOpen(true)}
                  >
                    {t('openChat')}
                  </button>
                </div>

                <div className="ai-chat-preview-body">
                  <div className="ai-preview-messages" ref={aiPreviewMessagesRef}>
                    {chatMessages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        className={`ai-message ${msg.type}`}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', damping: 26, stiffness: 380 }}
                      >
                        <TypewriterText text={msg.text} delay={idx === 0 ? 300 : 100} />
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        className="ai-typing-indicator"
                        initial={{ opacity: 0, y: 8 }}
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
                    aria-label="Open AI chat"
                  >
                    {userInput}
                    <span className={`input-cursor ${showInputCursor ? 'visible' : ''}`}>|</span>
                    {!userInput && (
                      <span className="input-placeholder">{t('clickToChat')}</span>
                    )}
                  </button>
                </div>
              </div>

              {/* ── Mini booking card ────────────────────── */}
              <div className="mini-booking-card js-reveal" style={{ marginTop: '20px' }}>
                <p className="mini-booking-kicker">{t('availableBookings')}</p>
                <h4>{t('bookMeHeading')}</h4>
                <p className="mini-booking-copy">
                  {t('bookMeCopy')}
                </p>
                <a
                  href="https://cal.com/danielleebuckley"
                  target="_blank"
                  rel="noreferrer"
                  className="mini-booking-btn"
                  data-cursor="BOOK"
                >
                  {t('bookMeOnCal')}
                </a>
              </div>
            </div>

            {/* ── Duneworks section ────────────────────── */}
            <motion.div
              className="duneworks-section js-reveal"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
                    whileTap={{ scale: 0.97 }}
                    data-cursor="VISIT"
                  >
                    <Globe size={16} />
                    <span>{t('visitWebsite')}</span>
                    <ExternalLink size={13} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        <PhotoGallery />

        {/* ────────────────────────────────────────────
            CONTACT
            ──────────────────────────────────────────── */}
        <section id="contact" className="contact-section">
          <div className="section-number-bg" aria-hidden="true">05</div>
          <div className="container">

            <div className="contact-header js-reveal">
              <span className="section-tag">{t('sectionContact')}</span>
              <h2 className="section-headline">{t('getInTouchHeading')}</h2>
            </div>

            {/* Social links */}
            <motion.div
              className="social-links-row js-reveal"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              viewport={{ once: true }}
            >
              {[
                {
                  href: 'https://cal.com/danielleebuckley',
                  cls: 'booking-btn',
                  icon: <CalendarDays size={26} />,
                  label: t('bookACall'),
                  handle: 'cal.com/danielleebuckley',
                  external: true,
                },
                {
                  href: 'https://instagram.com/Buckley.lens',
                  cls: 'instagram-btn',
                  icon: <Instagram size={26} />,
                  label: t('followInstagram'),
                  handle: '@Buckley.lens',
                  external: true,
                },
                {
                  href: 'https://youtube.com/@Volraiden',
                  cls: 'youtube-btn',
                  icon: <Youtube size={26} />,
                  label: t('subscribeYouTube'),
                  handle: '@Volraiden',
                  external: true,
                },
                {
                  href: 'mailto:Danielleebuckley@gmail.com',
                  cls: 'email-btn',
                  icon: <Mail size={26} />,
                  label: t('sendEmail'),
                  handle: 'Danielleebuckley@gmail.com',
                  external: false,
                },
              ].map(({ href, cls, icon, label, handle, external }) => (
                <motion.a
                  key={href}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className={`social-btn ${cls}`}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {icon}
                  <div className="social-btn-text">
                    <span className="social-label">{label}</span>
                    <span className="social-handle">{handle}</span>
                  </div>
                  <ExternalLink size={15} className="social-arrow" />
                </motion.a>
              ))}
            </motion.div>

            {/* Contact form */}
            <motion.div
              className="contact-form-container js-reveal"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
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
                      placeholder={t('namePlaceholder')}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t('yourEmail')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t('emailPlaceholder')}
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
                  whileTap={{ scale: 0.97 }}
                >
                  <Send size={16} />
                  <span>{t('sendMessage')}</span>
                </motion.button>

                <p className="form-note">{t('formNote')}</p>
              </form>
            </motion.div>

          </div>
        </section>

      </main>

      {/* ══════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════ */}
      <footer className="site-footer">
        <div className="footer-inner container">

          <motion.div
            className="footer-statement js-reveal"
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <span className="footer-eyebrow">{t('footerEyebrow')}</span>
            <h2 className="footer-headline">
              {t('footerHeadline').toUpperCase()}
            </h2>
            <a
              href="mailto:Danielleebuckley@gmail.com"
              className="footer-email-link"
              data-cursor="EMAIL"
            >
              Danielleebuckley@gmail.com
            </a>
          </motion.div>

          <div className="footer-bottom">
            <div className="footer-brand">
              <img
                src="/images/logos/duneworks.png"
                alt="Duneworks"
                className="footer-logo"
              />
              <span className="footer-copy">© 2026 Duneworks</span>
            </div>

            <nav className="footer-nav" aria-label="Footer">
              <a href="#about">{t('navAbout')}</a>
              <a href="#work">{t('navWork')}</a>
              <a href="#gallery">{t('navGallery')}</a>
              <a href="#contact">{t('navContact')}</a>
            </nav>

            <div className="footer-social">
              <a
                href="https://instagram.com/Buckley.lens"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://youtube.com/@Volraiden"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="YouTube"
              >
                <Youtube size={17} />
              </a>
              <a
                href="mailto:Danielleebuckley@gmail.com"
                className="footer-social-link"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
