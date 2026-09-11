// PortfolioItem matches SiteConfig.portfolioItems shape
export interface CosplayItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  tags: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  embedUrl?: string;
  views?: string;
  duration?: string;
  category: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  hoverColor: string;
}

export interface FormData {
  fullName: string;
  email: string;
  concept: string;
  message: string;
}

export interface ToastData {
  message: string;
  type: 'success' | 'error';
}
