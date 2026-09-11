import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
import type { ToastData } from '../../types';

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast = ({ toast, onClose }: ToastProps) => (
  <AnimatePresence>
    {toast && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', mass: 0.5, stiffness: 120, damping: 14 }}
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl border border-[#27272A] bg-[#18181B]/95 backdrop-blur-md p-4 shadow-2xl max-w-sm"
        role="alert"
        aria-live="polite"
      >
        {toast.type === 'success' ? (
          <CheckCircle className="shrink-0 text-[#8B5CF6]" size={20} />
        ) : (
          <XCircle className="shrink-0 text-[#EC4899]" size={20} />
        )}
        <p className="text-sm text-[#FAFAFA] flex-1">{toast.message}</p>
        <button
          onClick={onClose}
          className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);
