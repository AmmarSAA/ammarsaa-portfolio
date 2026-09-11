import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useTextRotator } from '../../hooks/useTextRotator';
import { smoothScrollTo } from '../../utils';
import { SITE_CONFIG } from '../../data/siteData';

const spring = { type: 'spring' as const, mass: 0.5, stiffness: 120, damping: 14 };

// Profile image: first image named "profile" in /images/, fallback to placeholder
const PROFILE_IMAGE = '/images/profile.jpg';

export const HeroSection = () => {
  const rotatingTexts = [
    SITE_CONFIG.tagline,
    `${SITE_CONFIG.name} — ${SITE_CONFIG.niche.charAt(0).toUpperCase() + SITE_CONFIG.niche.slice(1)} Creator`,
    `Follow the journey on social media`,
  ];
  const currentText = useTextRotator(rotatingTexts);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ backgroundColor: SITE_CONFIG.theme.bgColor }}
      aria-label="Hero section"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-[120px]"
          style={{ backgroundColor: `${SITE_CONFIG.theme.primaryColor}1A` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full blur-[100px]"
          style={{ backgroundColor: `${SITE_CONFIG.theme.accentColor}1A` }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.1 }}>
              <Badge>{SITE_CONFIG.niche.charAt(0).toUpperCase() + SITE_CONFIG.niche.slice(1)} Creator</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-[#FAFAFA] leading-none"
            >
              {SITE_CONFIG.name.split(' ')[0]}&apos;s <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${SITE_CONFIG.theme.primaryColor}, ${SITE_CONFIG.theme.accentColor})`,
                }}
              >
                World
              </span>
            </motion.h1>

            {/* Animated rotator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="h-8 overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentText}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={spring}
                  className="text-base text-[#A1A1AA] font-medium"
                >
                  {currentText}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.45 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Button onClick={() => smoothScrollTo('portfolio')}>
                Explore Gallery <ArrowRight size={16} />
              </Button>
              <Button variant="secondary" onClick={() => smoothScrollTo('video-hub')}>
                <Play size={16} /> Watch Videos
              </Button>
            </motion.div>
          </div>

          {/* Right column — profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={spring}
              className="relative rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${SITE_CONFIG.theme.primaryColor}4D`, boxShadow: `0 0 60px ${SITE_CONFIG.theme.primaryColor}40` }}
            >
              <img
                src={PROFILE_IMAGE}
                alt={`${SITE_CONFIG.name} — ${SITE_CONFIG.niche} creator`}
                className="w-full aspect-[3/4] object-cover"
                loading="eager"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: SITE_CONFIG.theme.primaryColor }}>
                  {SITE_CONFIG.name}
                </p>
                <p className="text-sm text-[#A1A1AA]">{SITE_CONFIG.tagline}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
