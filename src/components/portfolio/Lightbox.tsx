import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { CosplayItem } from '../../types';
import { SITE_CONFIG } from '../../data/siteData';

interface LightboxProps {
  item: CosplayItem | null;
  onClose: () => void;
}

const spring = { type: 'spring' as const, mass: 0.5, stiffness: 120, damping: 14 };

export const Lightbox = ({ item, onClose }: LightboxProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (item) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-lg p-4"
          style={{ backgroundColor: `${SITE_CONFIG.theme.bgColor}F2` }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={spring}
            className="relative max-w-6xl w-full max-h-[90vh] overflow-auto rounded-2xl border border-[#27272A] shadow-2xl"
            style={{ backgroundColor: SITE_CONFIG.theme.bgColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full bg-[#18181B] p-2 text-[#FAFAFA] hover:bg-[#27272A] transition-colors focus-visible:outline-none focus-visible:ring-2"
              style={{ '--tw-ring-color': SITE_CONFIG.theme.primaryColor } as React.CSSProperties}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-[3/4] lg:aspect-auto">
                <img
                  src={item.imageUrl}
                  alt={`${item.title} — ${item.category}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }}
                />
              </div>

              {/* Details panel */}
              <div className="p-8 space-y-6 overflow-y-auto max-h-[90vh] lg:max-h-none">
                <div>
                  <p
                    className="text-xs font-semibold tracking-widest uppercase mb-1"
                    style={{ color: SITE_CONFIG.theme.primaryColor }}
                  >
                    {item.category}
                  </p>
                  <h2
                    id="lightbox-title"
                    className="text-4xl font-black text-[#FAFAFA] mb-2"
                  >
                    {item.title}
                  </h2>
                </div>

                <div>
                  <h3
                    className="text-sm font-bold uppercase tracking-wider mb-2"
                    style={{ color: SITE_CONFIG.theme.primaryColor }}
                  >
                    Overview
                  </h3>
                  <p className="text-[#A1A1AA] leading-relaxed">{item.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: `${SITE_CONFIG.theme.primaryColor}1A`,
                        color:           SITE_CONFIG.theme.primaryColor,
                        borderColor:     `${SITE_CONFIG.theme.primaryColor}33`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
