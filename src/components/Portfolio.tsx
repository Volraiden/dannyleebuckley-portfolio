import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Youtube, ExternalLink, ArrowUpRight, Film, Image as ImageIcon, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    type: 'instagram',
    title: 'Photography',
    subtitle: 'Portfolio',
    handle: '@Buckley.lens',
    description: 'Motorsport, automotive, and cinematic photography from circuits around the world.',
    link: 'https://instagram.com/Buckley.lens',
    icon: Instagram,
    gradient: 'from-purple-600 via-pink-500 to-orange-500',
    stats: ['500+ Posts', 'Daily Updates'],
    features: ['Motorsport Action', 'Driver Portraits', 'Behind the Scenes'],
    color: '#E4405F',
  },
  {
    type: 'youtube',
    title: 'Video',
    subtitle: 'Content',
    handle: '@Volraiden',
    description: 'Cinematic edits, race highlights, and behind-the-scenes content from the track.',
    link: 'https://youtube.com/@Volraiden',
    icon: Youtube,
    gradient: 'from-red-600 to-red-700',
    stats: ['4K Quality', 'Regular Uploads'],
    features: ['Race Highlights', 'Cinematic Edits', 'Vlogs'],
    color: '#FF0000',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.portfolio-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-header',
            start: 'top 85%',
          },
        }
      );

      // Cards reveal
      gsap.fromTo(
        '.portfolio-card',
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 80%',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        '.portfolio-cta',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.portfolio-cta',
            start: 'top 90%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-red-500/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="portfolio-header mb-16 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent">
            Portfolio
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-white text-3d sm:text-5xl lg:text-6xl">
            View My Work
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Explore my latest photography and videography across Instagram and YouTube.
            From motorsport action to cinematic storytelling.
          </p>
        </div>

        {/* Portfolio Cards */}
        <div className="portfolio-grid grid gap-8 md:grid-cols-2">
          {portfolioItems.map((item) => (
            <motion.a
              key={item.type}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card group relative overflow-hidden rounded-3xl bg-card"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              data-cursor="hover"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-10`}
              />

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl border border-white/5 transition-colors duration-500 group-hover:border-white/10" />

              <div className="relative p-8 sm:p-10">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 transition-colors duration-300 group-hover:bg-white/10"
                    >
                      <item.icon className="h-8 w-8" style={{ color: item.color }} />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        {item.title}
                      </h3>
                      <span className="text-sm text-white/50">{item.subtitle}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-accent group-hover:text-white"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </motion.div>
                </div>

                {/* Handle with gradient */}
                <div className={`mb-4 inline-block bg-gradient-to-r ${item.gradient} bg-clip-text text-xl font-bold text-transparent`}>
                  {item.handle}
                </div>

                {/* Description */}
                <p className="mb-8 text-white/50 leading-relaxed">
                  {item.description}
                </p>

                {/* Features */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {item.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-white/5 px-4 py-1.5 text-xs text-white/60 transition-colors duration-300 group-hover:bg-white/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex gap-4">
                    {item.stats.map((stat) => (
                      <div key={stat} className="flex items-center gap-2 text-xs text-white/40">
                        {stat.includes('Posts') || stat.includes('Quality') ? (
                          <ImageIcon className="h-3 w-3" />
                        ) : (
                          <Film className="h-3 w-3" />
                        )}
                        {stat}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-white/60 transition-all duration-300 group-hover:text-accent">
                    <span>Visit</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div
                className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
                style={{ background: item.color }}
              />
            </motion.a>
          ))}
        </div>

        {/* Availability CTA */}
        <div className="portfolio-cta mt-16 rounded-3xl bg-card p-8 text-center sm:p-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-400">Available for Projects</span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Let's Create Something Together
            </h3>
            <p className="mt-4 text-white/50">
              Currently accepting bookings for motorsport events, commercial shoots,
              and creative collaborations. Based in Uzbekistan, available worldwide.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glow-btn mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-white"
              data-cursor="hover"
            >
              <Eye className="h-5 w-5" />
              <span>Get in Touch</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
