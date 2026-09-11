import { motion } from 'framer-motion';
import { Eye, ExternalLink } from 'lucide-react';
import type { VideoItem } from '../../types';

interface VideoPlayerProps {
  video: VideoItem;
}

// Map video IDs to real YouTube URLs
const YT_LINKS: Record<string, string> = {
  v1: 'https://www.youtube.com/@Fai._.malik07',
  v2: 'https://www.youtube.com/@Fai._.malik07',
  v3: 'https://www.youtube.com/@Fai._.malik07',
  v4: 'https://www.youtube.com/@Fai._.malik07',
};

export const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const ytUrl = YT_LINKS[video.id] ?? 'https://www.youtube.com/@Fai._.malik07';

  return (
    <div className="rounded-xl overflow-hidden border border-[#27272A] bg-[#18181B]" role="region" aria-label={`Video: ${video.title}`}>
      {/* Thumbnail with click-to-open YouTube */}
      <a
        href={ytUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        aria-label={`Watch "${video.title}" on YouTube`}
      >
        <img
          src={video.thumbnailUrl}
          alt={`Thumbnail for ${video.title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#09090B]/50 group-hover:bg-[#09090B]/30 transition-colors" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', mass: 0.5, stiffness: 120, damping: 14 }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-[#8B5CF6] shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-1" aria-hidden="true">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </motion.div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-[#09090B]/80 text-xs text-[#FAFAFA] font-mono">
          {video.duration}
        </div>

        {/* YouTube label on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 px-2 py-1 rounded bg-red-600 text-xs text-white font-semibold">
          <ExternalLink size={10} /> YouTube
        </div>
      </a>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-[#FAFAFA] font-semibold text-base mb-2 line-clamp-2">{video.title}</h3>
        <div className="flex items-center gap-3 text-xs text-[#A1A1AA]">
          <span className="flex items-center gap-1"><Eye size={12} /> {video.views} views</span>
          <span className="px-2 py-0.5 rounded bg-[#27272A] text-[#A1A1AA]">{video.category}</span>
        </div>
      </div>
    </div>
  );
};
