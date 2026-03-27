export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  channels: string[];
  reach: number;
  engagement: number;
  startDate: string;
  endDate?: string;
}

export interface Persona {
  id: string;
  name: string;
  handle: string;
  platform: 'instagram' | 'tiktok' | 'facebook' | 'twitter' | 'whatsapp';
  avatar: string;
  followers: number;
  queueCount: number;
  color: string;
}

export interface ScheduledPost {
  id: string;
  personaId: string;
  platform: string;
  content: string;
  scheduledAt: string;
  status: 'scheduled' | 'published' | 'failed';
  mediaType?: 'image' | 'video' | 'text';
}

export interface MetricCard {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export interface Notification {
  id: string;
  type: 'campaign' | 'engagement' | 'alert' | 'whatsapp';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
