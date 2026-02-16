export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  EMPLOYEE = 'Employee'
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Sentiment = 'Positive' | 'Neutral' | 'Critical';
export type FeedbackStatus = 'Received' | 'In-Review' | 'Action-Plan-Created' | 'Resolved';

export interface ClientFeedback {
  id: string;
  clientId: string;
  clientName: string;
  content: string;
  date: string;
  sentiment: Sentiment;
  status: FeedbackStatus;
  linkedSkillId?: string;
}

// Continue copying all type declarations identical to frontend version
export interface Skill { … }
export interface Certification { … }
export interface LearningPath { … }
export interface Review { … }
export interface Persona { … }
export interface UserProfile { … }
export interface TeamMemberSummary { … }
