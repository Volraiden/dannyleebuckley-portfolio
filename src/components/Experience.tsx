import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Award } from 'lucide-react';

const experiences = [
  {
    icon: Trophy,
    title: 'FIA Formula 1',
    description: 'Official photographer at FIA Formula 1 events, capturing the pinnacle of motorsport racing.',
    highlight: 'Race Week Documentation',
  },
  {
    icon: Award,
    title: 'Formula 3 & Formula 4',
    description: 'Documented emerging talent in junior formula series across Asian circuits.',
    highlight: 'Driver Portraits',
  },
  {
    icon: Calendar,
    title: 'Asian LeMans Series',
    description: 'Endurance racing photography, capturing the drama of multi-class racing.',
    highlight: '24-Hour Events',
  },
  {
    icon: Users,
    title: '24H Endurance Series',
    description: 'Comprehensive coverage of endurance racing events in the Middle East.',
    highlight: 'Team Documentation',
  },
];

const motorsportStats = [
  { number: '6+', label: 'Formula 1 Events' },
  { number: '20+', label: 'Asian LeMans Races' },
  { number: '15+', label: '24H Endurance Events' },
  { number: '500+', label: 'Drivers Photographed' },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-card py-24 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-display text-sm font-medium uppercase tracking-widest text-accent">
            Motorsport Experience
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Capturing the World's
            <span className="text-accent"> Fastest Moments</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted">
            From the pit lanes of Formula 1 to the endurance challenges of 24H series, 
            I've documented motorsport at its most intense.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {motorsportStats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-xl p-4 text-center"
            >
              <div className="font-display text-2xl font-bold text-accent sm:text-3xl">
                {stat.number}
              </div>
              <div className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Experience Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              </div>

              <div className="relative">
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <exp.icon className="h-6 w-6 text-accent" />
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {exp.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlight Badge */}
                <div className="mt-4 inline-flex items-center rounded-full bg-accent/10 px-3 py-1">
                  <span className="text-xs font-medium text-accent">
                    {exp.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motorsport Gallery Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted">
            View the full motorsport portfolio on{' '}
            <a
              href="https://instagram.com/Buckley.lens"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-animation font-medium text-accent transition-colors hover:text-foreground"
            >
              Instagram @Buckley.lens
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
