import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionWrapper = ({ children, id, className = '' }: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', mass: 0.5, stiffness: 120, damping: 14 }}
      className={className}
      aria-label={id}
    >
      {children}
    </motion.section>
  );
};
