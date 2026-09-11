import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { VideoPlayer } from '../videos/VideoPlayer';
import { VIDEOS_DATA, SITE_CONFIG, SOCIAL_LINKS } from '../../data/siteData';
import type { VideoItem } from '../../types';

const spring = { type: 'spring' as const, mass: 0.5, stiffness: 120, damping: 14 };

const youtubeSocial = SOCIAL_LINKS.find((s) => s.name.toLowerCase() === 'youtube');

export const VideoHubSection = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(VIDEOS_DATA[0]);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  if (VIDEOS_DATA.length === 0) return null;

  return (
    <section
      id="video-hub"
      ref={ref}
      className="py-24 px-4"
      style={{ backgroundColor: SITE_CONFIG.theme.bgColor }}
      aria-label="Video Hub"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mb-4"
        >
          <Badge variant="violet">Video Hub</Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring, delay: 0.1 }}
          className="mb-12 text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#FAFAFA]"
        >
          Content Archive
        </motion.h2>

        {/* Channel banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring, delay: 0.12 }}
          className="mb-8 rounded-xl overflow-hidden border border-[#27272A] relative"
        >
          <img
            src="/images/yt-banner.jpg"
            alt={`${SITE_CONFIG.name} channel banner`}
            className="w-full h-32 sm:h-44 object-cover"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090B]/70 to-transparent flex items-end p-4 gap-3">
            <img
              src="/images/yt-profile.jpg"
              alt={`${SITE_CONFIG.name} channel profile`}
              className="w-10 h-10 rounded-full border-2"
              style={{ borderColor: SITE_CONFIG.theme.primaryColor }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div>
              <p className="text-sm font-bold text-[#FAFAFA]">{SITE_CONFIG.name.toUpperCase()}</p>
              {youtubeSocial && (
                <a
                  href={youtubeSocial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:underline"
                  style={{ color: SITE_CONFIG.theme.primaryColor }}
                >
                  {youtubeSocial.url.replace('https://youtube.com/', '')}
                </a>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured player */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...spring, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={spring}
              >
                <VideoPlayer video={activeVideo} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Playlist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...spring, delay: 0.2 }}
            className="flex flex-col gap-3"
            role="list"
            aria-label="Video playlist"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA] mb-1">Playlist</p>
            {VIDEOS_DATA.map((video, i) => (
              <motion.button
                key={video.id}
                role="listitem"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...spring, delay: 0.2 + i * 0.07 }}
                whileHover={{ x: 4 }}
                onClick={() => setActiveVideo(video)}
                className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ${
                  activeVideo.id === video.id
                    ? 'bg-opacity-10 border-opacity-50'
                    : 'bg-[#18181B] border-[#27272A] hover:border-opacity-30'
                }`}
                style={activeVideo.id === video.id ? {
                  backgroundColor: `${SITE_CONFIG.theme.primaryColor}1A`,
                  borderColor:     `${SITE_CONFIG.theme.primaryColor}80`,
                } : {}}
                aria-pressed={activeVideo.id === video.id}
                aria-label={`Play: ${video.title}`}
              >
                <div className="relative shrink-0 w-16 h-12 rounded overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={`Thumbnail: ${video.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {activeVideo.id === video.id && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: `${SITE_CONFIG.theme.primaryColor}80` }}
                    >
                      <span className="text-white text-xs font-bold">▶</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#FAFAFA] font-medium line-clamp-2 mb-1">{video.title}</p>
                  <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                    {video.views   && <span className="flex items-center gap-1"><Eye size={10} />{video.views}</span>}
                    {video.duration && <span>{video.duration}</span>}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
