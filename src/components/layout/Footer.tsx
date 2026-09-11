import { motion } from 'framer-motion';
import { Instagram, Music2, Youtube, Twitter, Camera, Mail, Github, Twitch } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '../../data/siteData';

const ICON_MAP: Record<string, React.ElementType> = {
  instagram: Instagram,
  music:     Music2,
  youtube:   Youtube,
  twitter:   Twitter,
  camera:    Camera,
  mail:      Mail,
  github:    Github,
  twitch:    Twitch,
};

const [firstName] = SITE_CONFIG.name.split(' ');
const currentYear = new Date().getFullYear();

export const Footer = () => (
  <footer
    className="border-t border-[#27272A] py-12 px-4"
    style={{ backgroundColor: SITE_CONFIG.theme.bgColor }}
    role="contentinfo"
  >
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col items-center gap-6">
        <p className="text-2xl font-black tracking-widest text-[#FAFAFA] uppercase">
          <span style={{ color: SITE_CONFIG.theme.primaryColor }}>{firstName}</span>{' '}
          {SITE_CONFIG.name.split(' ').slice(1).join(' ')}
        </p>

        {SOCIAL_LINKS.length > 0 && (
          <nav aria-label="Social media links">
            <ul className="flex flex-wrap justify-center gap-4" role="list">
              {SOCIAL_LINKS.map((s) => {
                const Icon = ICON_MAP[s.icon] ?? Mail;
                return (
                  <li key={s.name}>
                    <motion.a
                      href={s.url}
                      target={s.url.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={`Visit ${SITE_CONFIG.name} on ${s.name}`}
                      whileHover={{ scale: 1.2 }}
                      className="flex items-center justify-center w-10 h-10 rounded-full border border-[#27272A] bg-[#18181B] text-[#A1A1AA] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2"
                      style={{ '--tw-ring-color': SITE_CONFIG.theme.primaryColor } as React.CSSProperties}
                    >
                      <Icon size={18} />
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      <div className="border-t border-[#27272A] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
        <p className="text-sm text-[#A1A1AA]">© {currentYear} {SITE_CONFIG.name}. All Rights Reserved.</p>
        <a href="https://z88.tech" target="_blank" rel="noopener noreferrer">
          <p className="text-sm text-[#A1A1AA]">
            Powered by{' '}
            <span style={{ color: SITE_CONFIG.theme.primaryColor }}>z88 Technologies</span>
          </p>
        </a>
      </div>
    </div>
  </footer>
);
