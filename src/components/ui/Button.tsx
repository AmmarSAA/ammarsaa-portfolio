import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const base = 'relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]',
    secondary: 'border border-[#27272A] bg-[#18181B] text-[#FAFAFA] hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10',
    ghost: 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', mass: 0.5, stiffness: 120, damping: 14 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
};
