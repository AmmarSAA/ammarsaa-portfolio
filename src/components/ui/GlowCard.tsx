import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'violet' | 'rose';
}

export const GlowCard = ({ children, className = '', glowColor = 'violet' }: GlowCardProps) => {
  const glow = glowColor === 'violet'
    ? 'hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:border-[#8B5CF6]/50'
    : 'hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] hover:border-[#EC4899]/50';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', mass: 0.5, stiffness: 120, damping: 14 }}
      className={`rounded-xl border border-[#27272A] bg-[#18181B] transition-all duration-300 ${glow} ${className}`}
    >
      {children}
    </motion.div>
  );
};
