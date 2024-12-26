export type Profile = {
  id: string;
  username: string;
  role: 'viewer' | 'podcaster';
  tokens: number;
  created_at: string;
  updated_at: string;
};

export type Content = {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  type: 'youtube' | 'audio';
  youtube_url: string | null;
  youtube_thumbnail: string | null;
  category: string;
  created_at: string;
  updated_at: string;
};

export type Challenge = {
  id: string;
  content_id: string;
  title: string;
  description: string;
  token_reward: number;
  created_at: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  content_id: string;
  challenge_id: string | null;
  completed: boolean;
  tokens_earned: number;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  content_id: string;
  user_id: string;
  message: string;
  votes: number;
  created_at: string;
};