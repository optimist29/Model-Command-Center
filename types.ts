
export interface NewsItem {
  headline: string;
  summary: string;
  source: string;
  url?: string;
}

export interface FeedbackItem {
  user: string;
  platform: 'Twitter' | 'Reddit' | 'Hacker News' | 'Unknown';
  content: string;
  sentiment: 'positive' | 'negative' | 'mixed' | 'neutral';
}

export interface TechnicalStats {
  arenaScore: string;
  reasoning: string;
  contextWindow: string;
  speed: string;
}

export interface DashboardData {
  hypeLevel: number; // 0-100
  themes: NewsItem[];
  feedback: FeedbackItem[];
  stats?: TechnicalStats;
  lastUpdated: string;
}

export interface SearchResponse {
  hypeLevel: number;
  themes: NewsItem[];
  feedback: FeedbackItem[];
  stats?: TechnicalStats;
}
