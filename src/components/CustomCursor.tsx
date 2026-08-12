import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot: instant
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 55, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 55, mass: 0.1 });

  // Ring: slightly delayed
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const attachInteractivity = () => {
      document.querySelectorAll<HTMLElement>('a, button, [role="button"], [data-cursor]').forEach((el) => {
        const label = el.dataset.cursor ?? '';
        const onIn = () => {
          setIsHover(true);
          setCursorLabel(label);
        };
        const onOut = () => {
          setIsHover(false);
          setCursorLabel('');
        };
        el.addEventListener('mouseenter', onIn);
        el.addEventListener('mouseleave', onOut);
      });
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    attachInteractivity();

    const observer = new MutationObserver(attachInteractivity);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      observer.disconnect();
    };
  }, [isTouch, mouseX, mouseY]);

  if (isTouch) return null;

  const hasLabel = !!cursorLabel && isHover;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="cur-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: isHover ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        className="cur-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hasLabel ? 3.2 : isHover ? 2 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        {hasLabel && (
          <motion.span
            className="cur-label"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18 }}
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
