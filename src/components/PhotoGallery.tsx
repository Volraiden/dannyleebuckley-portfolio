import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GALLERY_COUNT = 134;
const ROW_COUNT = 3;

const GALLERY = Array.from({ length: GALLERY_COUNT }, (_, i) => ({
  src: `/images/gallery/${String(i + 1).padStart(2, '0')}.png`,
  alt: `Still ${String(i + 1).padStart(2, '0')}`,
  index: i,
}));

const ROWS = Array.from({ length: ROW_COUNT }, (_, row) =>
  GALLERY.filter((_, i) => i % ROW_COUNT === row)
);

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function markLoaded(img: HTMLImageElement | null) {
  if (!img) return;
  const reveal = () => img.classList.add('is-loaded');
  if (img.complete && img.naturalWidth > 0) {
    reveal();
    return;
  }
  img.addEventListener('load', reveal, { once: true });
}

export function PhotoGallery() {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const riversRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);

  const copies = useMemo(() => (reduceMotion ? [0] : [0, 1]), [reduceMotion]);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setActive((next + GALLERY_COUNT) % GALLERY_COUNT);
  }, []);

  const close = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    }
    setActive(null);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const node = lightboxRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
      return;
    }
    void node.requestFullscreen().catch(() => undefined);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = riversRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (active === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') goTo(active + 1, 1);
      if (e.key === 'ArrowLeft') goTo(active - 1, -1);
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };

    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));

    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    onFs();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFs);
    };
  }, [active, close, goTo, toggleFullscreen]);

  useEffect(() => {
    if (active === null) return;
    [active - 1, active + 1].forEach((i) => {
      const idx = (i + GALLERY_COUNT) % GALLERY_COUNT;
      const img = new Image();
      img.src = GALLERY[idx].src;
    });
  }, [active]);

  const onPointerDown = (e: React.PointerEvent) => {
    swipeStart.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStart.current === null || active === null) return;
    const delta = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) < 56) return;
    if (delta < 0) goTo(active + 1, 1);
    else goTo(active - 1, -1);
  };

  const openStill = (index: number) => {
    setDirection(0);
    setActive(index);
  };

  const playing = inView && active === null && !reduceMotion;

  const lightbox =
    typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {active !== null && (
              <motion.div
                ref={lightboxRef}
                className="gallery-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={t('sectionGallery')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) close();
                }}
              >
                <div className="gallery-lightbox-bar">
                  <span className="gallery-lightbox-count">
                    {pad(active + 1)}
                    <span> / {GALLERY_COUNT}</span>
                  </span>
                  <div className="gallery-lightbox-actions">
                    <button
                      type="button"
                      className="gallery-lb-btn"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? t('galleryExitFullscreen') : t('galleryFullscreen')}
                    >
                      {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </button>
                    <button
                      type="button"
                      className="gallery-lb-btn"
                      onClick={close}
                      aria-label={t('galleryClose')}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="gallery-lb-nav gallery-lb-prev"
                  onClick={() => goTo(active - 1, -1)}
                  aria-label={t('galleryPrev')}
                >
                  <ChevronLeft size={28} />
                </button>

                <div
                  className="gallery-lightbox-stage"
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                >
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                      key={active}
                      src={GALLERY[active].src}
                      alt={GALLERY[active].alt}
                      className="gallery-lightbox-img"
                      custom={direction}
                      initial={{ opacity: 0, x: direction >= 0 ? 48 : -48, scale: 0.985 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: direction >= 0 ? -48 : 48, scale: 0.985 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      draggable={false}
                    />
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  className="gallery-lb-nav gallery-lb-next"
                  onClick={() => goTo(active + 1, 1)}
                  aria-label={t('galleryNext')}
                >
                  <ChevronRight size={28} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-number-bg" aria-hidden="true">
        04
      </div>
      <div className="container">
        <div className="gallery-header js-reveal">
          <span className="section-tag">{t('sectionGallery')}</span>
          <h2 className="section-headline">{t('galleryHeading')}</h2>
          <div className="gallery-meta">
            <span className="gallery-meta-dot" />
            <span>{GALLERY_COUNT} FRAMES</span>
          </div>
        </div>
      </div>

      <div
        ref={riversRef}
        className={`gallery-rivers${playing ? ' is-playing' : ''}${reduceMotion ? ' is-static' : ''}`}
      >
        {ROWS.map((rowItems, row) => (
          <div
            key={row}
            className="gallery-river"
            data-dir={row % 2 === 0 ? 'ltr' : 'rtl'}
            style={{ '--gallery-dur': `${52 + row * 14}s` } as CSSProperties}
          >
            <div className="gallery-river-track">
              {copies.map((copy) =>
                rowItems.map((item, i) => (
                  <button
                    key={`${copy}-${item.index}`}
                    type="button"
                    className="gallery-river-tile"
                    data-cursor="VIEW"
                    onClick={() => openStill(item.index)}
                    aria-label={`${t('galleryView')} ${pad(item.index + 1)}`}
                  >
                    <img
                      ref={markLoaded}
                      src={item.src}
                      alt={item.alt}
                      loading={copy === 0 && i < 5 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                    />
                    <span className="gallery-tile-veil">
                      <span className="gallery-tile-index">{pad(item.index + 1)}</span>
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      {lightbox}
    </section>
  );
}
