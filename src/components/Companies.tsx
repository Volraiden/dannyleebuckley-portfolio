import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Film, Network, ArrowUpRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const companies = [
  {
    name: 'Duneworks Studios',
    tagline: 'Creative Production',
    description: 'Full-service creative studio specializing in photography, videography, and post-production. Bringing visions to life with cinematic quality.',
    icon: Building2,
    services: ['Photography', 'Video Production', 'Post-Production', 'Color Grading'],
    gradient: 'from-orange-500 to-amber-500',
    color: '#f97316',
  },
  {
    name: 'Duneworks Productions',
    tagline: 'Film & Media',
    description: 'End-to-end production company handling everything from concept to delivery. Documentaries, commercials, and branded content.',
    icon: Film,
    services: ['Documentary', 'Commercials', 'Branded Content', 'Events'],
    gradient: 'from-blue-500 to-cyan-500',
    color: '#3b82f6',
  },
  {
    name: 'The Dune Network',
    tagline: 'Creative Collective',
    description: 'A network connecting creative professionals across Central Asia and beyond. Collaboration, resources, and creative opportunities.',
    icon: Network,
    services: ['Networking', 'Collaboration', 'Resources', 'Creative Hub'],
    gradient: 'from-purple-500 to-violet-500',
    color: '#8b5cf6',
  },
];

export default function Companies() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.companies-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.companies-header',
            start: 'top 85%',
          },
        }
      );

      // Cards 3D reveal
      gsap.fromTo(
        '.company-card',
        { y: 100, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.companies-grid',
            start: 'top 80%',
          },
        }
      );

      // Quote reveal
      gsap.fromTo(
        '.mission-quote',
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mission-quote',
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="companies"
      className="relative overflow-hidden bg-card py-24 sm:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />

      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-orange-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="companies-header mb-16 text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <img
                src="/images/logos/duneworks.png"
                alt="Duneworks"
                className="h-24 w-auto opacity-80"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -right-4 -top-4"
              >
                <Sparkles className="h-6 w-6 text-accent" />
              </motion.div>
            </div>
          </motion.div>

          <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent">
            CEO & Founder
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-white text-3d sm:text-5xl lg:text-6xl">
            The Duneworks Empire
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Leading three innovative companies that span creative production,
            film making, and professional networking across Central Asia.
          </p>
        </div>

        {/* Company Cards */}
        <div className="companies-grid grid gap-8 lg:grid-cols-3" style={{ perspective: '1000px' }}>
          {companies.map((company) => (
            <motion.div
              key={company.name}
              className="company-card group relative overflow-hidden rounded-3xl bg-background"
              whileHover={{ y: -10, rotateX: 5 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              data-cursor="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Top Gradient Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${company.gradient}`} />

              <div className="p-8">
                {/* Icon & Title */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${company.gradient} text-white shadow-lg`}
                    >
                      <company.icon className="h-7 w-7" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-white">
                        {company.name}
                      </h3>
                      <p className="text-sm" style={{ color: company.color }}>
                        {company.tagline}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-300 group-hover:text-white/60" />
                </div>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-white/50">
                  {company.description}
                </p>

                {/* Services */}
                <div className="flex flex-wrap gap-2">
                  {company.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/60 transition-all duration-300 hover:bg-white/10"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div
                className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                style={{ background: company.color }}
              />

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-3xl border border-white/5 transition-colors duration-500 group-hover:border-white/10" />
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mission-quote mt-16 rounded-3xl bg-background p-8 text-center sm:p-12">
          <blockquote className="mx-auto max-w-3xl">
            <p className="font-display text-2xl font-medium italic leading-relaxed text-white sm:text-3xl">
              "Building a creative ecosystem that empowers storytellers, connects
              professionals, and produces world-class content from the heart of Central Asia."
            </p>
            <footer className="mt-8 flex items-center justify-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-white/10">
                <img
                  src="/images/logos/duneworks.png"
                  alt="Daniel Lee Buckley"
                  className="h-full w-full object-contain p-2 opacity-60"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Daniel Lee Buckley</p>
                <p className="text-sm text-accent">Founder & CEO</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
