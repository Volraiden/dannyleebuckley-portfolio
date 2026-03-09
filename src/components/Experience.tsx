import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Calendar, Users, Award, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: Trophy,
    title: 'FIA Formula 1',
    description: 'Official photographer at FIA Formula 1 events, capturing the pinnacle of motorsport racing across multiple race weekends.',
    highlight: 'Race Week Documentation',
    stats: '6+ Events',
  },
  {
    icon: Award,
    title: 'Formula 3 & Formula 4',
    description: 'Documented emerging talent in junior formula series across Asian circuits, capturing the next generation of racing stars.',
    highlight: 'Driver Portraits',
    stats: '15+ Events',
  },
  {
    icon: Calendar,
    title: 'Asian LeMans Series',
    description: 'Endurance racing photography, capturing the drama of multi-class racing under changing light conditions.',
    highlight: '24-Hour Coverage',
    stats: '20+ Races',
  },
  {
    icon: Users,
    title: '24H Endurance Series',
    description: 'Comprehensive coverage of endurance racing events throughout the Middle East and Asia regions.',
    highlight: 'Team Stories',
    stats: '500+ Drivers',
  },
];

const motorsportStats = [
  { number: '6+', label: 'Formula 1 Events', suffix: 'F1' },
  { number: '20+', label: 'Asian LeMans Races', suffix: 'ALMS' },
  { number: '15+', label: '24H Endurance Events', suffix: '24H' },
  { number: '500+', label: 'Drivers Photographed', suffix: 'Drivers' },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.experience-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-header',
            start: 'top 85%',
          },
        }
      );

      // Stats row animation
      gsap.fromTo(
        '.stat-item',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-row',
            start: 'top 85%',
          },
        }
      );

      // Cards stagger reveal with 3D effect
      gsap.fromTo(
        '.experience-card',
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden bg-card py-24 sm:py-32"
      style={{ perspective: '1000px' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glowing Orb */}
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="experience-header mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block text-xs uppercase tracking-[0.3em] text-accent"
          >
            Motorsport Experience
          </motion.span>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold text-white text-3d sm:text-5xl lg:text-6xl">
            Capturing the World's
            <span className="text-accent text-3d-accent"> Fastest Moments</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            From the pit lanes of Formula 1 to the endurance challenges of 24H series,
            I've documented motorsport at its most intense.
          </p>
        </div>

        {/* Stats Row */}
        <div className="stats-row mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {motorsportStats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5, scale: 1.02 }}
              className="stat-item glass group relative overflow-hidden rounded-2xl p-6 text-center"
              data-cursor="hover"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="gradient-text-accent font-display text-3xl font-bold sm:text-4xl">
                  {stat.number}
                </div>
                <div className="mt-1 text-xs text-white/40 sm:text-sm">{stat.label}</div>
              </div>

              {/* Corner accent */}
              <div className="absolute right-2 top-2 text-[10px] font-bold text-accent/30">
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Cards Grid */}
        <div ref={cardsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp) => (
            <motion.div
              key={exp.title}
              className="experience-card card-3d group relative overflow-hidden rounded-3xl bg-background p-6"
              whileHover={{ y: -10 }}
              data-cursor="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon */}
              <div className="relative mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                  <exp.icon className="h-7 w-7 text-accent" />
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 h-14 w-14 rounded-2xl bg-accent/20 opacity-0 group-hover:animate-ping" />
              </div>

              {/* Content */}
              <h3 className="relative font-display text-lg font-semibold text-white transition-colors group-hover:text-accent">
                {exp.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/50">
                {exp.description}
              </p>

              {/* Stats Badge */}
              <div className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <span>{exp.stats}</span>
              </div>

              {/* Highlight */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-white/[0.02] p-3 text-center text-xs text-white/40 opacity-0 transition-all duration-300 group-hover:opacity-100">
                {exp.highlight}
              </div>

              {/* Corner Icon */}
              <div className="absolute right-4 top-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <ChevronRight className="h-5 w-5 text-accent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://instagram.com/Buckley.lens"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-accent/10 px-6 py-3 transition-all hover:bg-accent/20"
            data-cursor="hover"
          >
            <span className="text-sm text-white/70">View full portfolio on</span>
            <span className="font-medium text-accent underline-hover">Instagram @Buckley.lens</span>
            <ChevronRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
