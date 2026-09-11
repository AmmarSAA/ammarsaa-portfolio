import { motion } from 'framer-motion';
import type { CosplayItem } from '../../types';
import { SITE_CONFIG } from '../../data/siteData';

interface PortfolioCardProps {
  item: CosplayItem;
  onClick: () => void;
}

const spring = { type: 'spring' as const, mass: 0.5, stiffness: 120, damping: 14 };

export const PortfolioCard = ({ item, onClick }: PortfolioCardProps) => (
  <motion.button
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={spring}
    whileHover={{ y: -6 }}
    onClick={onClick}
    className="group relative overflow-hidden rounded-xl border border-[#27272A] bg-[#18181B] transition-all duration-300 w-full text-left focus-visible:outline-none focus-visible:ring-2"
    style={{ '--tw-ring-color': SITE_CONFIG.theme.primaryColor } as React.CSSProperties}
    aria-label={`View ${item.title} portfolio details`}
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={item.imageUrl}
        alt={`${item.title} — ${item.category}`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

      {/* Reveal overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center backdrop-blur-sm"
        style={{ backgroundColor: `${SITE_CONFIG.theme.bgColor}CC` }}
      >
        <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: SITE_CONFIG.theme.accentColor }}>
          View Details
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: SITE_CONFIG.theme.primaryColor }}>
          {item.category}
        </p>
        <p className="text-sm text-[#FAFAFA] font-medium mb-2">{item.title}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-[#27272A] text-[#A1A1AA] border border-[#27272A]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.button>
);
