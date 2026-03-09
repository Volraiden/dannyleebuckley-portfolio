import { motion } from 'framer-motion';
import { Building2, Film, Network, ArrowUpRight } from 'lucide-react';

const companies = [
  {
    name: 'Duneworks Studios',
    tagline: 'Creative Production House',
    description: 'Full-service creative studio specializing in photography, videography, and post-production. Bringing visions to life with cinematic quality.',
    icon: Building2,
    services: ['Photography', 'Video Production', 'Post-Production', 'Color Grading'],
    color: 'from-orange-500 to-amber-600',
  },
  {
    name: 'Duneworks Productions',
    tagline: 'Film & Media Production',
    description: 'End-to-end production company handling everything from concept to delivery. Documentaries, commercials, and branded content.',
    icon: Film,
    services: ['Documentary', 'Commercials', 'Branded Content', 'Event Coverage'],
    color: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'The Dune Network',
    tagline: 'Creative Collective',
    description: 'A network connecting creative professionals across Central Asia and beyond. Collaboration, resources, and creative opportunities.',
    icon: Network,
    services: ['Networking', 'Collaboration', 'Resources', 'Creative Hub'],
    color: 'from-purple-500 to-violet-600',
  },
];

export default function Companies() {
  return (
    <section id="companies" className="relative bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex justify-center">
            <img
              src="/images/logos/duneworks.png"
              alt="Duneworks"
              className="h-20 w-auto"
            />
          </div>
          <span className="font-display text-sm font-medium uppercase tracking-widest text-accent">
            CEO & Founder
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            The Duneworks Empire
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted">
            Leading three innovative companies that span creative production, 
            film making, and professional networking across Central Asia.
          </p>
        </motion.div>

        {/* Company Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-background transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Top Gradient Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${company.color}`} />
              
              <div className="p-8">
                {/* Icon & Title */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${company.color} text-white`}>
                      <company.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {company.name}
                      </h3>
                      <p className="text-sm text-accent">{company.tagline}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-accent" />
                </div>

                {/* Description */}
                <p className="mt-6 text-muted leading-relaxed">
                  {company.description}
                </p>

                {/* Services */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {company.services.map((service, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-accent/5 px-3 py-1 text-xs font-medium text-accent"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${company.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl bg-background p-8 text-center sm:p-12"
        >
          <blockquote className="mx-auto max-w-3xl">
            <p className="font-display text-xl font-medium italic text-foreground sm:text-2xl">
              "Building a creative ecosystem that empowers storytellers, connects 
              professionals, and produces world-class content from the heart of Central Asia."
            </p>
            <footer className="mt-6">
              <p className="font-medium text-accent">Daniel Lee Buckley</p>
              <p className="text-sm text-muted">Founder & CEO</p>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
