import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ChevronDown, Play, Pause } from 'lucide-react';

const roles = ['Photographer', 'Videographer', 'Cinematographer', 'Developer', 'CEO'];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }

    // GSAP Text Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Title character animation
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        tl.fromTo(
          titleChars,
          { y: 100, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 1 },
          0.5
        );
      }

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.2
      );

      // Floating animation for badge
      gsap.to('.hero-badge', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Parallax on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(titleRef.current, {
          x: xPos,
          y: yPos,
          duration: 0.8,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('marquee');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      id="hero"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover scale-110"
          poster="/images/logos/duneworks.png"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlay */}
        <div className="cinematic-overlay absolute inset-0" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(5,5,5,0.4) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        {/* CEO Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-badge mb-8"
        >
          <div className="glass flex items-center gap-3 rounded-full px-6 py-3">
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-green-500" />
            </div>
            <span className="text-sm font-medium tracking-wide text-white/80">
              CEO of Duneworks
            </span>
          </div>
        </motion.div>

        {/* Main Title with 3D effect */}
        <h1
          ref={titleRef}
          className="font-display text-center text-6xl font-black tracking-tight text-white text-3d-hero sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ perspective: '1000px' }}
        >
          <span className="block">{splitText('DANIEL LEE')}</span>
          <span className="block text-accent text-3d-accent">
            {splitText('BUCKLEY')}
          </span>
        </h1>

        {/* Animated Role */}
        <div ref={subtitleRef} className="mt-8 h-16 overflow-hidden">
          <motion.div
            key={currentRole}
            initial={{ y: 50, opacity: 0, rotateX: -45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -50, opacity: 0, rotateX: 45 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="gradient-text-accent font-display text-3xl font-bold sm:text-4xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {roles[currentRole]}
          </motion.div>
        </div>

        {/* Location Tags with stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {['Uzbekistan', 'From Australia', 'Motorsport Specialist'].map(
            (tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
                className="text-sm tracking-widest text-white/60 uppercase"
              >
                {tag}
              </motion.span>
            )
          )}
        </motion.div>
      </div>

      {/* Video Controls */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={toggleVideo}
        className="absolute bottom-32 right-8 z-20 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-white" />
        ) : (
          <Play className="h-5 w-5 text-white" />
        )}
      </motion.button>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        onClick={scrollToNext}
        className="scroll-indicator absolute bottom-8 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
        data-cursor="hover"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">
            Scroll
          </span>
          <ChevronDown className="h-6 w-6 text-accent" />
        </div>
      </motion.button>

      {/* Side gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
}
