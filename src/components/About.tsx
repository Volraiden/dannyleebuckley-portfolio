import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Camera, Video, Code, MapPin, Globe } from 'lucide-react';

const stats = [
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Events Covered' },
  { value: 100, suffix: 'K+', label: 'Photos Captured' },
  { value: 6, suffix: '', label: 'Countries Worked' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-accent sm:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                About Me
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                Capturing Speed,
                <br />
                <span className="text-accent">Creating Stories</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 space-y-6 text-muted"
            >
              <p className="text-lg leading-relaxed">
                Born in Australia, I've always had a passion for visual storytelling. 
                My journey took me to Dubai, where I immersed myself in the high-octane 
                world of motorsport photography, capturing the raw energy of FIA-sanctioned 
                events across the Middle East and Asia.
              </p>
              <p className="leading-relaxed">
                Today, I'm based in Uzbekistan, leading Duneworks Studios, Duneworks 
                Productions, and the Dune Network. My work spans photography, 
                videography, cinematography, and development - bringing creative visions 
                to life through multiple lenses.
              </p>
              <p className="leading-relaxed">
                From the pit lanes of Formula 1 to the endurance challenges of 24H 
                series, I've had the privilege of documenting motorsport at its finest, 
                working alongside world-class teams and capturing moments that define 
                racing history.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <Camera className="h-4 w-4 text-accent" />
                <span className="text-sm text-foreground">Photography</span>
              </div>
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <Video className="h-4 w-4 text-accent" />
                <span className="text-sm text-foreground">Videography</span>
              </div>
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <Code className="h-4 w-4 text-accent" />
                <span className="text-sm text-foreground">Development</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats & Journey */}
          <div ref={containerRef} className="space-y-12">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-105"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Journey Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-card p-6"
            >
              <h3 className="mb-6 font-display text-lg font-semibold text-foreground">
                Journey Timeline
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <Globe className="h-5 w-5 text-accent" />
                    </div>
                    <div className="mt-2 h-full w-px bg-border" />
                  </div>
                  <div className="pb-6">
                    <span className="text-sm font-medium text-accent">Australia</span>
                    <p className="text-sm text-muted">Where it all began - developing a passion for visual arts</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div className="mt-2 h-full w-px bg-border" />
                  </div>
                  <div className="pb-6">
                    <span className="text-sm font-medium text-accent">Dubai</span>
                    <p className="text-sm text-muted">Motorsport photography specialization - FIA events, Formula series</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <Camera className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-accent">Uzbekistan</span>
                    <p className="text-sm text-muted">Current base - CEO of Duneworks empire, expanding creative horizons</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
