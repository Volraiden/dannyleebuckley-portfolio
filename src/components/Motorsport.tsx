import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const CHAPTERS = [
  {
    id: 'f1',
    titleKey: 'motorsportF1Title',
    copyKey: 'motorsportF1Copy',
    image: '/images/motorsport-f1.png',
    alt: 'Formula 1 car photographed by Daniel Lee Buckley',
    mediaClass: '',
  },
  {
    id: 'fia',
    titleKey: 'motorsportFiaTitle',
    copyKey: 'motorsportFiaCopy',
    image: '/images/motorsport-fia.png',
    alt: 'Daniel Lee Buckley with a guest at an FIA-related event',
    mediaClass: 'motorsport-card-media--faces',
  },
  {
    id: 'lemans',
    titleKey: 'motorsportLeMansTitle',
    copyKey: 'motorsportLeMansCopy',
    image: '/images/hero-car.png',
    alt: 'Prototype endurance car in the pit lane — Daniel Lee Buckley',
    mediaClass: '',
  },
  {
    id: '24h',
    titleKey: 'motorsport24hTitle',
    copyKey: 'motorsport24hCopy',
    image: '/images/gallery/90.png',
    alt: 'Night pit stop at 24 Hours of Dubai — Daniel Lee Buckley',
    mediaClass: '',
  },
] as const;

export function Motorsport() {
  const { t } = useLanguage();

  return (
    <section id="motorsport" className="motorsport-section">
      <div className="section-number-bg" aria-hidden="true">
        02
      </div>
      <div className="container">
        <div className="motorsport-header js-reveal">
          <span className="section-tag">{t('sectionMotorsport')}</span>
          <h2 className="section-headline">{t('motorsportHeading')}</h2>
          <p className="motorsport-lead">{t('motorsportLead')}</p>
          <p className="motorsport-note">{t('motorsportNote')}</p>
        </div>

        <div className="motorsport-grid">
          {CHAPTERS.map((chapter, i) => (
            <motion.article
              key={chapter.id}
              className="motorsport-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`motorsport-card-media ${chapter.mediaClass}`.trim()}>
                <img
                  src={chapter.image}
                  alt={chapter.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="motorsport-card-body">
                <span className="motorsport-card-index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t(chapter.titleKey)}</h3>
                <p>{t(chapter.copyKey)}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
