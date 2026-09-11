import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { smoothScrollTo } from '../../utils';
import { Button } from '../ui/Button';
import { SITE_CONFIG } from '../../data/siteData';

const buildNavLinks = () => {
  const links = [{ label: 'Home', id: 'home' }];
  if (SITE_CONFIG.sections.about)     links.push({ label: 'About',     id: 'about'     });
  if (SITE_CONFIG.sections.portfolio) links.push({ label: 'Portfolio',  id: 'portfolio' });
  if (SITE_CONFIG.sections.videos)    links.push({ label: 'Videos',     id: 'video-hub' });
  if (SITE_CONFIG.sections.contact !== 'none') links.push({ label: 'Contact', id: 'collabs' });
  return links;
};

const NAV_LINKS = buildNavLinks();
const [firstName] = SITE_CONFIG.name.split(' ');

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (id: string) => { smoothScrollTo(id); setMenuOpen(false); };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/60 border-b border-[#27272A]' : 'bg-transparent'}`}
      role="banner"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <motion.button
          onClick={() => handleNav('home')}
          className="text-xl font-black tracking-widest text-[#FAFAFA] uppercase focus-visible:outline-none focus-visible:ring-2 rounded"
          style={{ '--tw-ring-color': SITE_CONFIG.theme.primaryColor } as React.CSSProperties}
          whileHover={{ scale: 1.03 }}
          aria-label={`${SITE_CONFIG.name} - Go to home`}
        >
          <span style={{ color: SITE_CONFIG.theme.primaryColor }}>{firstName}</span>{' '}
          {SITE_CONFIG.name.split(' ').slice(1).join(' ')}
        </motion.button>

        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors focus-visible:outline-none rounded"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {SITE_CONFIG.sections.contact !== 'none' && (
          <div className="hidden md:block">
            <Button onClick={() => handleNav('collabs')}>
              {SITE_CONFIG.sections.contact === 'newsletter' ? 'Subscribe' : 'Inquire Now'}
            </Button>
          </div>
        )}

        <button
          className="md:hidden text-[#FAFAFA] p-2 focus-visible:outline-none rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', mass: 0.5, stiffness: 120, damping: 14 }}
            className="fixed inset-0 top-[65px] z-40 bg-[#09090B]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, type: 'spring', mass: 0.5, stiffness: 120, damping: 14 }}
                onClick={() => handleNav(link.id)}
                className="text-2xl font-bold text-[#FAFAFA] transition-colors"
                style={{ ['--hover-color' as string]: SITE_CONFIG.theme.primaryColor }}
              >
                {link.label}
              </motion.button>
            ))}
            {SITE_CONFIG.sections.contact !== 'none' && (
              <Button onClick={() => handleNav('collabs')}>
                {SITE_CONFIG.sections.contact === 'newsletter' ? 'Subscribe' : 'Inquire Now'}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
