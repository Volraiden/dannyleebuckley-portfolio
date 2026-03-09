import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'FIA', logo: '/images/logos/fia.png' },
  { name: 'Formula 1', logo: '/images/logos/fia.png' },
  { name: 'Asian LeMans', logo: '/images/logos/fia.png' },
  { name: '24H Series', logo: '/images/logos/fia.png' },
  { name: 'Duneworks', logo: '/images/logos/duneworks.png' },
  { name: 'FIA Formula', logo: '/images/logos/fia.png' },
];

export default function LogoMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to(track, {
        x: '-20%',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // 3D perspective tilt on hover
      const cards = section.querySelectorAll('.logo-card');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.1,
            rotateY: 10,
            z: 50,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotateY: 0,
            z: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Double the partners for seamless loop
  const allPartners = [...partners, ...partners, ...partners];

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="relative overflow-hidden bg-background py-16"
      style={{ perspective: '1000px' }}
    >
      {/* Section Label */}
      <div className="mb-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">
          Trusted Partners
        </span>
      </div>

      {/* Marquee Container */}
      <div
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

        {/* Track */}
        <div
          ref={trackRef}
          className="marquee-track flex items-center gap-16"
          style={{ width: 'fit-content' }}
        >
          {allPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="logo-card glass group flex h-24 w-48 flex-shrink-0 items-center justify-center rounded-xl px-6 transition-all"
              style={{ transformStyle: 'preserve-3d' }}
              data-cursor="hover"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 w-auto opacity-50 transition-all duration-500 group-hover:opacity-100"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/0 transition-all duration-300 group-hover:text-white/60">
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
    </section>
  );
}
