import { UserRole, UserProfile, Persona, TeamMemberSummary } from './types'

export const MOCK_CURRENT_USER: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: '',
  role: UserRole.EMPLOYEE,
  title: '',
  department: '',
  managerName: '',
  experienceYears: 0,
  avatar: '',
  personaId: '',
  skills: [],
  certifications: [],
  learningPaths: [],
  reviews: []
}

export const PERSONAS: Persona[] = []
export const MOCK_TEAM_MEMBERS: TeamMemberSummary[] = []
