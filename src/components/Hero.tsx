import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const roles = ['Photographer', 'Videographer', 'Cinematographer', 'Developer', 'Editor'];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('logos');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="/images/logos/duneworks.png"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Video Overlay */}
        <div className="video-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        {/* Duneworks Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="glass flex items-center gap-3 rounded-full px-6 py-3">
            <img
              src="/images/logos/duneworks.png"
              alt="Duneworks"
              className="h-8 w-auto"
            />
            <span className="text-sm font-medium text-muted">CEO of Duneworks</span>
          </div>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-center text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          DANIEL LEE
          <br />
          <span className="text-accent">BUCKLEY</span>
        </motion.h1>

        {/* Animated Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 h-12 overflow-hidden"
        >
          <motion.div
            key={currentRole}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl font-medium text-muted sm:text-3xl"
          >
            {roles[currentRole]}
          </motion.div>
        </motion.div>

        {/* Location Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <span className="text-sm text-muted">Based in Uzbekistan</span>
          <span className="hidden h-1 w-1 rounded-full bg-accent sm:block" />
          <span className="text-sm text-muted">From Australia</span>
          <span className="hidden h-1 w-1 rounded-full bg-accent sm:block" />
          <span className="text-sm text-muted">Motorsport Specialist</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToNext}
        className="scroll-indicator absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted">Explore</span>
          <ChevronDown className="h-6 w-6 text-accent" />
        </div>
      </motion.button>
    </section>
  );
}
