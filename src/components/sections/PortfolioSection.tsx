import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { PortfolioCard } from '../portfolio/PortfolioCard';
import { Lightbox } from '../portfolio/Lightbox';
import { PORTFOLIO_ITEMS, CATEGORIES, SITE_CONFIG } from '../../data/siteData';
import type { CosplayItem } from '../../types';

const spring = { type: 'spring' as const, mass: 0.5, stiffness: 120, damping: 14 };

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<CosplayItem | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = useMemo(
    () => activeCategory === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((i) => i.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <section
        id="portfolio"
        ref={ref}
        className="py-24 px-4"
        style={{ backgroundColor: SITE_CONFIG.theme.bgColor }}
        aria-label="Portfolio gallery"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={spring}
            className="mb-4"
          >
            <Badge variant="violet">Creative Work</Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.1 }}
            className="mb-12 text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#FAFAFA]"
          >
            Portfolio Gallery
          </motion.h2>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.15 }}
            className="mb-10"
            role="group"
            aria-label="Filter portfolio by category"
          >
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ ...spring, delay: 0.15 + i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                    activeCategory === cat
                      ? 'text-white'
                      : 'bg-[#18181B] border border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA]'
                  }`}
                  style={activeCategory === cat ? {
                    backgroundColor: SITE_CONFIG.theme.primaryColor,
                    boxShadow: `0 0 20px ${SITE_CONFIG.theme.primaryColor}66`,
                  } : {}}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: i * 0.08 }}
                >
                  <PortfolioCard item={item} onClick={() => setSelectedItem(item)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[#A1A1AA] py-12"
            >
              No items in this category yet.
            </motion.p>
          )}
        </div>
      </section>

      <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
};
