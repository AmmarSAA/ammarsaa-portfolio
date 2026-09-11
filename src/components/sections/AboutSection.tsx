import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlowCard } from '../ui/GlowCard';
import { Badge } from '../ui/Badge';
import { SITE_CONFIG, STATS_DATA, SOCIAL_LINKS } from '../../data/siteData';

const spring = { type: 'spring' as const, mass: 0.5, stiffness: 120, damping: 14 };

export const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4"
      style={{ backgroundColor: SITE_CONFIG.theme.bgColor }}
      aria-label={`About ${SITE_CONFIG.name}`}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mb-4"
        >
          <Badge variant="rose">The Story</Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...spring, delay: 0.1 }}
          >
            <h2 className="mb-6 text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#FAFAFA]">
              Meet{' '}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${SITE_CONFIG.theme.primaryColor}, ${SITE_CONFIG.theme.accentColor})`,
                }}
              >
                {SITE_CONFIG.name.split(' ')[0]}
              </span>
            </h2>
            <div className="space-y-4 text-[#A1A1AA] leading-relaxed">
              {SITE_CONFIG.bio.split('\n').filter(Boolean).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Social links */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors border border-[#27272A] rounded-full px-3 py-1"
                    aria-label={`${SITE_CONFIG.name} on ${link.name}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...spring, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {STATS_DATA.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...spring, delay: 0.2 + i * 0.08 }}
              >
                <GlowCard className="p-6 h-full">
                  <p className="text-3xl font-black mb-1" style={{ color: SITE_CONFIG.theme.primaryColor }}>
                    {stat.label}
                  </p>
                  <p className="text-sm text-[#A1A1AA] font-medium">{stat.value}</p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
