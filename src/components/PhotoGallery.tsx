import { startTransition, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  GALLERY,
  GALLERY_COUNT,
  GALLERY_FILTERS,
  padFrame,
  type GalleryCategory,
} from '../data/gallery';

const ROW_COUNT = 3;
const MOBILE_BATCH = 18;

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
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all');
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const [visibleCount, setVisibleCount] = useState(MOBILE_BATCH);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const riversRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? GALLERY
        : GALLERY.filter((item) => item.categories.includes(filter)),
    [filter]
  );

  const rows = useMemo(() => {
    const pool = filtered.length ? filtered : GALLERY;
    return Array.from({ length: ROW_COUNT }, (_, row) =>
      pool.filter((_, i) => i % ROW_COUNT === row)
    );
  }, [filtered]);

  const copies = useMemo(
    () => (reduceMotion || isMobile ? [0] : [0, 1]),
    [reduceMotion, isMobile]
  );

  const mobileTiles = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const goToIndex = useCallback(
    (nextIndex: number, dir: number) => {
      const list = filtered.length ? filtered : GALLERY;
      const pos = list.findIndex((item) => item.index === nextIndex);
      const fallback = list[0]?.index ?? 0;
      if (pos === -1) {
        setDirection(dir);
        setActive(fallback);
        return;
      }
      const wrapped = list[(pos + dir + list.length) % list.length];
      setDirection(dir);
      setActive(wrapped.index);
    },
    [filtered]
  );

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
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMq = window.matchMedia('(max-width: 768px)');
    const sync = () => {
      setReduceMotion(reduceMq.matches);
      setIsMobile(mobileMq.matches);
    };
    sync();
    reduceMq.addEventListener('change', sync);
    mobileMq.addEventListener('change', sync);
    return () => {
      reduceMq.removeEventListener('change', sync);
      mobileMq.removeEventListener('change', sync);
    };
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
      if (e.key === 'ArrowRight') goToIndex(active, 1);
      if (e.key === 'ArrowLeft') goToIndex(active, -1);
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
  }, [active, close, goToIndex, toggleFullscreen]);

  useEffect(() => {
    if (active === null) return;
    if (!filtered.some((item) => item.index === active)) {
      setActive(filtered[0]?.index ?? null);
      return;
    }
    const pos = filtered.findIndex((item) => item.index === active);
    [-1, 1].forEach((offset) => {
      const neighbor = filtered[(pos + offset + filtered.length) % filtered.length];
      if (!neighbor) return;
      const img = new Image();
      img.src = neighbor.src;
    });
  }, [active, filtered]);

  const onPointerDown = (e: React.PointerEvent) => {
    swipeStart.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStart.current === null || active === null) return;
    const delta = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) < 56) return;
    if (delta < 0) goToIndex(active, 1);
    else goToIndex(active, -1);
  };

  const openStill = (index: number) => {
    setDirection(0);
    setActive(index);
  };

  const playing = inView && active === null && !reduceMotion && !isMobile;
  const staticTracks = reduceMotion || isMobile;

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
                    {padFrame(active + 1)}
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
                  onClick={() => goToIndex(active, -1)}
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
                  onClick={() => goToIndex(active, 1)}
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
            <span>
              {filtered.length} / {GALLERY_COUNT} FRAMES
            </span>
          </div>
        </div>

        <div className="gallery-filters" role="tablist" aria-label={t('sectionGallery')}>
          {GALLERY_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              className={`gallery-filter${filter === item.id ? ' is-active' : ''}`}
              onClick={() => {
                startTransition(() => {
                  setFilter(item.id);
                  setVisibleCount(MOBILE_BATCH);
                });
              }}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {isMobile ? (
        <div className="gallery-masonry">
          {mobileTiles.map((item, i) => (
            <button
              key={item.src}
              type="button"
              className="gallery-masonry-tile"
              onClick={() => openStill(item.index)}
              aria-label={`${t('galleryView')} ${padFrame(item.index + 1)}`}
            >
              <img
                ref={markLoaded}
                src={item.src}
                alt={item.alt}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
              <span className="gallery-tile-veil">
                <span className="gallery-tile-index">{padFrame(item.index + 1)}</span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div
          ref={riversRef}
          className={`gallery-rivers${playing ? ' is-playing' : ''}${staticTracks ? ' is-static' : ''}`}
        >
          {rows.map((rowItems, row) => (
            <div
              key={`${filter}-${row}`}
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
                      aria-label={`${t('galleryView')} ${padFrame(item.index + 1)}`}
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
                        <span className="gallery-tile-index">{padFrame(item.index + 1)}</span>
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isMobile && visibleCount < filtered.length && (
        <div className="gallery-more">
          <button
            type="button"
            className="btn-ghost gallery-more-btn"
            onClick={() => setVisibleCount((n) => Math.min(n + MOBILE_BATCH, filtered.length))}
          >
            {t('galleryShowMore')}
            <span className="gallery-more-count">
              +{Math.min(MOBILE_BATCH, filtered.length - visibleCount)}
            </span>
          </button>
        </div>
      )}
      {lightbox}
    </section>
  );
}
