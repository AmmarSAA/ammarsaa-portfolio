import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { GlowCard } from '../ui/GlowCard';
import { CollabForm } from '../forms/CollabForm';
import { NewsletterCard } from '../forms/NewsletterCard';
import { SITE_CONFIG } from '../../data/siteData';

const spring = { type: 'spring' as const, mass: 0.5, stiffness: 120, damping: 14 };

interface CollaborationSectionProps {
  onFormSuccess: () => void;
  contactType: 'collab' | 'newsletter' | 'both' | 'none';
}

export const CollaborationSection = ({ onFormSuccess, contactType }: CollaborationSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const showCollab     = contactType === 'collab'     || contactType === 'both';
  const showNewsletter = contactType === 'newsletter' || contactType === 'both';

  return (
    <section
      id="collabs"
      ref={ref}
      className="py-24 px-4"
      style={{ backgroundColor: SITE_CONFIG.theme.bgColor }}
      aria-label="Collaboration and contact"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mb-4"
        >
          <Badge variant="rose">Let&apos;s Work Together</Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring, delay: 0.1 }}
          className="mb-12 text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#FAFAFA]"
        >
          {contactType === 'newsletter' ? 'Stay in the Loop' : 'Start a Collaboration'}
        </motion.h2>

        <div className={`grid gap-8 ${showCollab && showNewsletter ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>
          {showCollab && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ ...spring, delay: 0.15 }}
            >
              <GlowCard glowColor="violet" className="p-8 h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#FAFAFA] mb-2">Inquiry Form</h3>
                  <p className="text-sm text-[#A1A1AA]">
                    Brand partnerships, commissions, event bookings, content collabs.
                  </p>
                </div>
                <CollabForm onSuccess={onFormSuccess} />
              </GlowCard>
            </motion.div>
          )}

          {showNewsletter && (
            <motion.div
              initial={{ opacity: 0, x: showCollab ? 30 : 0, y: showCollab ? 0 : 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ ...spring, delay: 0.2 }}
            >
              <NewsletterCard />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
