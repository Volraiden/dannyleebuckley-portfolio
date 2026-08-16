import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.08 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.08 });
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 26, mass: 0.45 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 26, mass: 0.45 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const interactiveSelector =
      'a, button, [role="button"], [data-cursor], input, textarea, select, .service-item, .featured-card';

    const onOver = (e: Event) => {
      const target = (e.target as HTMLElement | null)?.closest?.(interactiveSelector) as
        | HTMLElement
        | null;
      if (!target) return;
      setIsHover(true);
      const raw = target.dataset.cursor ?? '';
      setCursorLabel(raw === 'hover' ? '' : raw);
    };

    const onOut = (e: Event) => {
      const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (related?.closest?.(interactiveSelector)) return;
      setIsHover(false);
      setCursorLabel('');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const hasLabel = !!cursorLabel && isHover;

  return (
    <>
      <motion.div
        className="cur-dot"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHover ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className={`cur-ring ${isHover ? 'is-hover' : ''} ${hasLabel ? 'has-label' : ''}`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hasLabel ? 1.12 : isHover ? 1.38 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {hasLabel && (
          <motion.span
            className="cur-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.14 }}
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
