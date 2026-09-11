import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'rose' | 'default';
}

export const Badge = ({ children, variant = 'violet' }: BadgeProps) => {
  const colors = {
    violet: 'border-[#8B5CF6]/50 text-[#8B5CF6] bg-[#8B5CF6]/10',
    rose: 'border-[#EC4899]/50 text-[#EC4899] bg-[#EC4899]/10',
    default: 'border-[#27272A] text-[#A1A1AA] bg-[#18181B]',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-widest uppercase ${colors[variant]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </motion.span>
  );
};
