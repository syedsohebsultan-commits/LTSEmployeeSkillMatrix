import {
  Skill,
  UserProfile,
  Persona,
  TeamMemberSummary,
  ClientFeedback,
  Certification,
  LearningPath,
  Review,
  UserRole,
  SkillLevel,
  Sentiment,
  FeedbackStatus
} from '../types/types'

export const MOCK_CURRENT_USER: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: UserRole.EMPLOYEE,
  title: 'Software Engineer',
  department: 'Engineering',
  managerName: 'Jane Smith',
  experienceYears: 3,
  avatar: '',
  personaId: '',
  skills: [],
  certifications: [],
  learningPaths: [],
  reviews: []
}

export const PERSONAS: Persona[] = []
export const MOCK_TEAM_MEMBERS: TeamMemberSummary[] = []
