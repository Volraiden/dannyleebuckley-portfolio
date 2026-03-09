import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'FIA', logo: '/images/logos/fia.png' },
  { name: 'Formula 1', logo: '/images/logos/f1.png' },
  { name: 'Formula 3', logo: '/images/logos/f3.png' },
  { name: 'Formula 4', logo: '/images/logos/f4.png' },
  { name: 'Asian LeMans', logo: '/images/logos/asian-lemans.png' },
  { name: '24H Endurance', logo: '/images/logos/24h-endurance.png' },
];

export default function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Double the logos for seamless loop
  const doubledPartners = [...partners, ...partners];

  return (
    <section id="logos" className="relative overflow-hidden bg-background py-20">
      <div
        ref={containerRef}
        className="section-reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-muted">
            Capturing moments at the world's most prestigious motorsport events
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Fade */}
          <div className="carousel-fade-left pointer-events-none absolute left-0 top-0 z-10 h-full w-32" />
          
          {/* Right Fade */}
          <div className="carousel-fade-right pointer-events-none absolute right-0 top-0 z-10 h-full w-32" />

          {/* Scrolling Logos */}
          <div className="overflow-hidden">
            <div className="logo-carousel flex items-center gap-16 py-8">
              {doubledPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="group flex shrink-0 items-center justify-center"
                >
                  <div className="relative">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-16 w-auto object-contain opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 sm:h-20"
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted">
            Official photographer for FIA-sanctioned events across Asia and the Middle East
          </p>
        </motion.div>
      </div>
    </section>
  );
}
