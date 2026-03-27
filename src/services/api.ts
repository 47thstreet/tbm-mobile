import {
  Campaign,
  Persona,
  ScheduledPost,
  MetricCard,
  Notification,
} from '../types';

const API_BASE = 'http://localhost:3042/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export interface DashboardData {
  metrics: MetricCard[];
  campaigns: Campaign[];
}

export interface PlatformStat {
  name: string;
  icon: string;
  color: string;
  followers: string;
  engagement: string;
  reach: string;
  posts: number;
  growth: number;
}

export interface TopContent {
  title: string;
  platform: string;
  views: string;
  engagement: string;
  color: string;
}

export interface AnalyticsData {
  platformStats: PlatformStat[];
  topContent: TopContent[];
}

export interface CalendarPost {
  day: number;
  persona: string;
  platform: string;
  color: string;
  time: string;
  title: string;
}

export interface Broadcast {
  id: string;
  name: string;
  subscribers: number;
  lastSent: string;
  status: 'active' | 'scheduled' | 'draft';
}

export interface ScheduledMessage {
  id: string;
  list: string;
  content: string;
  scheduledAt: string;
  status: 'pending' | 'sent' | 'failed';
}

export interface WhatsAppData {
  broadcasts: Broadcast[];
  scheduled: ScheduledMessage[];
  recentActivity: {
    action: string;
    list: string;
    time: string;
    delivered: number;
    read: number;
  }[];
}

export interface ContentScore {
  id: string;
  content: string;
  persona: string;
  platform: string;
  score: number;
  suggestions: string[];
}

export interface QuickPostPersona {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const api = {
  dashboard: {
    get: () => request<DashboardData>('/dashboard'),
  },

  campaigns: {
    list: () => request<Campaign[]>('/campaigns'),
    detail: (id: string) => request<Campaign>(`/campaigns/${encodeURIComponent(id)}`),
    create: (data: Omit<Campaign, 'id'>) =>
      request<Campaign>('/campaigns', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<Campaign>) =>
      request<Campaign>(`/campaigns/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  personas: {
    list: () => request<Persona[]>('/personas'),
    create: (data: Omit<Persona, 'id'>) =>
      request<Persona>('/personas', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<{ success: boolean }>(`/personas/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }),
  },

  posts: {
    schedule: (data: Omit<ScheduledPost, 'id' | 'status'>) =>
      request<ScheduledPost>('/posts/schedule', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    scheduled: () => request<ScheduledPost[]>('/posts/scheduled'),
    cancel: (id: string) =>
      request<{ success: boolean }>(`/posts/${encodeURIComponent(id)}/cancel`, {
        method: 'POST',
      }),
  },

  calendar: {
    posts: (year: number, month: number) =>
      request<CalendarPost[]>(`/calendar/posts?year=${year}&month=${month}`),
  },

  analytics: {
    get: (range: string) =>
      request<AnalyticsData>(`/analytics?range=${encodeURIComponent(range)}`),
  },

  whatsapp: {
    data: () => request<WhatsAppData>('/whatsapp'),
    triggerBroadcast: (id: string) =>
      request<{ success: boolean }>(`/whatsapp/broadcasts/${encodeURIComponent(id)}/send`, {
        method: 'POST',
      }),
    createBroadcast: (data: Omit<Broadcast, 'id' | 'subscribers' | 'lastSent'>) =>
      request<Broadcast>('/whatsapp/broadcasts', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  notifications: {
    list: () => request<Notification[]>('/notifications'),
    markRead: (id: string) =>
      request<{ success: boolean }>(`/notifications/${encodeURIComponent(id)}/read`, {
        method: 'POST',
      }),
    markAllRead: () =>
      request<{ success: boolean }>('/notifications/read-all', {
        method: 'POST',
      }),
  },

  ai: {
    generateCaption: (data: { prompt: string; persona: string; platform: string }) =>
      request<{ caption: string; hashtags: string[] }>('/ai/caption', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    scoreContent: (data: { content: string; persona: string; platform: string }) =>
      request<ContentScore>('/ai/score', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  batch: {
    schedule: (data: { posts: Omit<ScheduledPost, 'id' | 'status'>[] }) =>
      request<{ scheduled: number; posts: ScheduledPost[] }>('/posts/batch-schedule', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  quickPost: {
    personas: () => request<QuickPostPersona[]>('/quick-post/personas'),
    platforms: () => request<Platform[]>('/quick-post/platforms'),
    publish: (data: { content: string; personaId: string; platformIds: string[] }) =>
      request<{ success: boolean; postIds: string[] }>('/quick-post/publish', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};
