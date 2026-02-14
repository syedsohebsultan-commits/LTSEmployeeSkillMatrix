
import { UserRole, UserProfile, Persona, TeamMemberSummary, ClientFeedback } from './types';

export const PERSONAS: Persona[] = [
  {
    id: 'p1',
    title: 'Software Engineer I',
    level: 1,
    responsibilities: [
      'Implement features based on specs',
      'Write unit tests',
      'Participate in code reviews'
    ],
    requiredSkills: [
      { skillId: 's1', minLevel: 2 },
      { skillId: 's2', minLevel: 2 },
      { skillId: 's3', minLevel: 1 }
    ]
  },
  {
    id: 'p2',
    title: 'Software Engineer II',
    level: 2,
    responsibilities: [
      'Design modular components',
      'Mentor junior engineers',
      'Manage CI/CD pipelines'
    ],
    requiredSkills: [
      { skillId: 's1', minLevel: 4 },
      { skillId: 's2', minLevel: 3 },
      { skillId: 's3', minLevel: 3 }
    ]
  }
];

export const MOCK_FEEDBACKS: ClientFeedback[] = [
  {
    id: 'f1',
    clientId: 'c1',
    clientName: 'Global Corp',
    content: 'Excellent delivery on the dashboard project. Very responsive to change requests.',
    date: '2024-02-15',
    sentiment: 'Positive',
    status: 'Resolved'
  },
  {
    id: 'f2',
    clientId: 'c2',
    clientName: 'TechVanguard',
    content: 'Found some regressions in the latest release. Communication could have been more proactive.',
    date: '2024-03-01',
    sentiment: 'Critical',
    status: 'Action-Plan-Created',
    linkedSkillId: 's3'
  }
];

export const MOCK_CURRENT_USER: UserProfile = {
  id: 'u123',
  name: 'Alex Rivera',
  email: 'a.rivera@enterprise.com',
  role: UserRole.MANAGER,
  title: 'Engineering Manager',
  department: 'Engineering',
  managerName: 'Sarah Jenkins',
  managerId: 'u456',
  experienceYears: 8.5,
  avatar: 'https://picsum.photos/seed/alex/200',
  personaId: 'p2',
  skills: [
    { id: 's1', name: 'React', category: 'Frontend', currentLevel: 4, targetLevel: 5, description: 'Component architecture and state management.' },
    { id: 's2', name: 'Node.js', category: 'Backend', currentLevel: 4, targetLevel: 5, description: 'Server-side runtime and API development.' },
    { id: 's3', name: 'Cloud Ops', category: 'DevOps', currentLevel: 3, targetLevel: 4, description: 'AWS, Azure and container orchestration.' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Solutions Architect', issuer: 'Amazon', status: 'Completed', issueDate: '2023-05-15', requiredForLevel: 'Manager' },
  ],
  learningPaths: [
    { id: 'l1', title: 'Strategic Leadership', provider: 'Harvard', duration: '20h', status: 'In Progress', relevance: 'Management' }
  ],
  reviews: [
    { id: 'r1', date: '2023-12-01', type: 'Annual', status: 'Completed', score: 4.8 }
  ]
};

export const MOCK_TEAM_MEMBERS: TeamMemberSummary[] = [
  { id: 'tm1', name: 'Jordan Smith', title: 'SE I', skillAvg: 3.2, certCount: 2, readinessScore: 75, kudosCount: 12, feedbacks: MOCK_FEEDBACKS },
  { id: 'tm2', name: 'Riley Wong', title: 'Intern', skillAvg: 2.1, certCount: 0, readinessScore: 40, kudosCount: 2, feedbacks: [] },
  { id: 'tm3', name: 'Taylor Case', title: 'SE II', skillAvg: 4.5, certCount: 5, readinessScore: 92, kudosCount: 28, feedbacks: [MOCK_FEEDBACKS[0]] },
  { id: 'tm4', name: 'Morgan Lee', title: 'SE I', skillAvg: 2.8, certCount: 1, readinessScore: 60, kudosCount: 5, feedbacks: [MOCK_FEEDBACKS[1]] },
];