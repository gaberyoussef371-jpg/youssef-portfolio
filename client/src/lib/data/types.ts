export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  imageUrl: string;
  client?: string;
  category?: string;
  results?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  brandName?: string;
  projectType?: string;
  budget?: string;
  details?: string;
  createdAt: string;
  read: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type BackendProvider = "local" | "supabase" | "firebase";
