export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  EMPLOYEE = 'Employee'
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Sentiment = 'Positive' | 'Neutral' | 'Critical';
export type FeedbackStatus = 'Received' | 'In-Review' | 'Action-Plan-Created' | 'Resolved';

export interface Skill {
  id: string;
  name: string;
  category: string;
  currentLevel: SkillLevel;
  targetLevel: SkillLevel;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  status: 'Completed' | 'In-Progress' | 'Expired' | 'Not Started';
  expiryDate?: string;
  issueDate?: string;
  requiredForLevel: string;
}

export interface LearningPath {
  id: string;
  title: string;
  provider: string;
  duration: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  relevance: string;
}

export interface Review {
  id: string;
  date: string;
  type: 'Annual' | 'Quarterly' | 'Promotion';
  status: 'Draft' | 'Pending' | 'Completed';
  score?: number;
}

export interface Persona {
  id: string;
  title: string;
  level: number;
  responsibilities: string[];
  requiredSkills: { skillId: string; minLevel: SkillLevel }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  department: string;
  managerName: string;
  managerId?: string;
  experienceYears: number;
  avatar: string;
  personaId: string;
  skills: Skill[];
  certifications: Certification[];
  learningPaths: LearningPath[];
  reviews: Review[];
}

export interface ClientFeedback {
  id: string;
  clientId: string;
  clientName: string;
  projectName?: string;
  rating?: number;
  content: string;
  date: string;
  linkedSkillId?: string;
  sentiment?: Sentiment;
  status?: FeedbackStatus;
}

export interface TeamMemberSummary {
  id: string;
  name: string;
  title: string;
  skillAvg: number;
  certCount: number;
  readinessScore: number;
  kudosCount: number;
  feedbacks?: ClientFeedback[];
}
