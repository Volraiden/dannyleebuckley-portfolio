import { motion } from 'framer-motion';
import { Instagram, Youtube, ExternalLink, Play } from 'lucide-react';

const portfolioItems = [
  {
    type: 'instagram',
    title: 'Photography Portfolio',
    handle: '@Buckley.lens',
    description: 'Motorsport, automotive, and cinematic photography from around the world.',
    link: 'https://instagram.com/Buckley.lens',
    icon: Instagram,
    color: 'from-purple-500 via-pink-500 to-orange-500',
    stats: 'Daily Updates',
  },
  {
    type: 'youtube',
    title: 'Video Content',
    handle: '@Volraiden',
    description: 'Cinematic edits, race highlights, and behind-the-scenes content.',
    link: 'https://youtube.com/@Volraiden',
    icon: Youtube,
    color: 'from-red-600 to-red-700',
    stats: 'Subscribe Now',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-display text-sm font-medium uppercase tracking-widest text-accent">
            Portfolio
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            View My Work
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted">
            Explore my latest photography and videography across Instagram and YouTube. 
            From motorsport action to cinematic storytelling.
          </p>
        </motion.div>

        {/* Portfolio Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl bg-card transition-all duration-300 hover:shadow-2xl"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />
              
              {/* Content */}
              <div className="relative p-8 sm:p-10">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
                    <item.icon className="h-7 w-7 text-accent" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>

                {/* Title & Handle */}
                <div className="mt-8">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className={`mt-2 bg-gradient-to-r ${item.color} bg-clip-text font-display text-lg font-medium text-transparent`}>
                    {item.handle}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-4 text-muted leading-relaxed">
                  {item.description}
                </p>

                {/* Stats/Footer */}
                <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                  <span className="text-sm text-muted">{item.stats}</span>
                  <div className="flex items-center gap-2 text-sm font-medium text-accent transition-transform duration-300 group-hover:translate-x-1">
                    <span>Visit</span>
                    <Play className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl bg-card p-8 text-center"
        >
          <h3 className="font-display text-xl font-semibold text-foreground">
            Available for Projects
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Currently accepting bookings for motorsport events, commercial shoots, 
            and creative collaborations. Based in Uzbekistan, available worldwide.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
