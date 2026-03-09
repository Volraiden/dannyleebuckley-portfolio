import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Video, Code, MapPin, Globe, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Events Covered' },
  { value: 100, suffix: 'K+', label: 'Photos Captured' },
  { value: 6, suffix: '', label: 'Countries' },
];

const journey = [
  {
    location: 'Australia',
    description: 'Where it all began - developing a passion for visual arts',
    icon: Globe,
    year: 'Start',
  },
  {
    location: 'Dubai',
    description: 'Motorsport photography specialization - FIA events, Formula series',
    icon: MapPin,
    year: '2016',
  },
  {
    location: 'Uzbekistan',
    description: 'Current base - CEO of Duneworks empire, expanding creative horizons',
    icon: Camera,
    year: 'Now',
  },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span className="counter font-display text-5xl font-bold text-accent sm:text-6xl">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.utils.toArray<HTMLElement>('.reveal-item').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stats cards stagger
      gsap.fromTo(
        '.stat-card',
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        '.timeline-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
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
      id="about"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Story */}
          <div className="space-y-8">
            <div className="reveal-item">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent">
                About Me
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white text-3d sm:text-5xl lg:text-6xl">
                Capturing Speed,
                <br />
                <span className="text-accent text-3d-accent">Creating Stories</span>
              </h2>
            </div>

            <div className="reveal-item space-y-6 text-lg leading-relaxed text-white/60">
              <p>
                Born in Australia, I've always had a passion for visual storytelling.
                My journey took me to Dubai, where I immersed myself in the high-octane
                world of motorsport photography, capturing the raw energy of FIA-sanctioned
                events across the Middle East and Asia.
              </p>
              <p>
                Today, I'm based in Uzbekistan, leading Duneworks Studios, Duneworks
                Productions, and the Dune Network. My work spans photography,
                videography, cinematography, and development - bringing creative visions
                to life through multiple lenses.
              </p>
            </div>

            {/* Skills Tags */}
            <div className="reveal-item flex flex-wrap gap-3">
              {[
                { icon: Camera, label: 'Photography' },
                { icon: Video, label: 'Videography' },
                { icon: Code, label: 'Development' },
              ].map((skill) => (
                <motion.div
                  key={skill.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="glass group flex items-center gap-2 rounded-full px-5 py-2.5 transition-all hover:border-accent/30"
                  data-cursor="hover"
                >
                  <skill.icon className="h-4 w-4 text-accent transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium text-white/80">{skill.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#experience"
              whileHover={{ x: 5 }}
              className="reveal-item inline-flex items-center gap-2 text-accent underline-hover"
              data-cursor="hover"
            >
              <span className="font-medium">View My Experience</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>

          {/* Right Column - Stats & Timeline */}
          <div className="space-y-12">
            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="stat-card glass rounded-2xl p-6 text-center"
                  data-cursor="hover"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={isStatsInView}
                  />
                  <p className="mt-2 text-sm text-white/50">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Journey Timeline */}
            <div className="timeline-container relative rounded-3xl bg-card p-8">
              <h3 className="mb-8 font-display text-lg font-semibold text-white">
                Journey Timeline
              </h3>
              <div className="relative space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

                {journey.map((item, index) => (
                  <motion.div
                    key={item.location}
                    className="timeline-item relative flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <item.icon className="h-5 w-5 text-accent" />
                      <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '3s' }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{item.location}</span>
                        <span className="text-xs text-accent">{item.year}</span>
                      </div>
                      <p className="mt-1 text-sm text-white/50">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
