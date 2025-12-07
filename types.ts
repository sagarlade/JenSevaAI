export enum Sector {
  AGRICULTURE = 'Agriculture',
  EDUCATION = 'Education',
  HEALTH = 'Health',
  HOUSING = 'Housing',
  WOMEN_CHILD = 'Women & Child',
  SOCIAL_WELFARE = 'Social Welfare'
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  sector: Sector;
  eligibility: string[];
  benefits: string;
  link: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  matchedSchemes?: string[]; // Array of Scheme IDs
}

export interface GeminiResponse {
  reply: string;
  schemeIds: string[];
}

export type LanguageCode = 'en' | 'hi' | 'mr' | 'kn' | 'bn' | 'te' | 'ta' | 'gu';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
}