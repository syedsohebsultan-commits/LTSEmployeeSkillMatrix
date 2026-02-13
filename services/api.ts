

// Corrected import path for UserProfile, TeamMemberSummary, ClientFeedback, Persona
import { UserProfile, TeamMemberSummary, ClientFeedback, Persona } from './shared/types';
// Corrected import path for MOCK_CURRENT_USER, PERSONAS, MOCK_TEAM_MEMBERS
import { MOCK_CURRENT_USER, PERSONAS, MOCK_TEAM_MEMBERS } from './shared/mockData';

const BASE_URL = 'http://localhost:3001/api'; // URL of the Node.js backend

// Check the environment variable to determine the data source
const USE_COSMOS_DB = import.meta.env.VITE_USE_COSMOS_DB === '1';

/**
 * LocalStorageService: Implements the talentApi interface using browser's localStorage.
 */
const localStorageService = (() => {
  const STORAGE_KEYS = {
    USER_PROFILE: 'talentPortal_userProfile',
    PERSONAS: 'talentPortal_personas',
    TEAM_MEMBERS: 'talentPortal_teamMembers',
  };

  const _initStorage = () => {
    if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(MOCK_CURRENT_USER));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PERSONAS)) {
      localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(PERSONAS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TEAM_MEMBERS)) {
      localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(MOCK_TEAM_MEMBERS));
    }
  };

  // Initialize storage on module load
  _initStorage();

  const _getData = <T>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const _setData = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  return {
    async getProfile(): Promise<UserProfile> {
      return Promise.resolve(_getData<UserProfile>(STORAGE_KEYS.USER_PROFILE)!);
    },

    async getPersonas(): Promise<Persona[]> {
      return Promise.resolve(_getData<Persona[]>(STORAGE_KEYS.PERSONAS)!);
    },

    async getTeam(): Promise<TeamMemberSummary[]> {
      return Promise.resolve(_getData<TeamMemberSummary[]>(STORAGE_KEYS.TEAM_MEMBERS)!);
    },

    async registerFeedback(memberId: string, feedback: Partial<ClientFeedback>): Promise<ClientFeedback> {
      const team = _getData<TeamMemberSummary[]>(STORAGE_KEYS.TEAM_MEMBERS) || [];
      const member = team.find(m => m.id === memberId);

      if (!member) {
        throw new Error('Team member not found in local storage.');
      }

      const newFeedback: ClientFeedback = {
        id: `f${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        clientId: feedback.clientId || 'c-generated',
        clientName: feedback.clientName || 'Generated Client',
        content: feedback.content || 'No content provided',
        date: new Date().toISOString(),
        sentiment: feedback.sentiment || 'Neutral',
        status: 'Received',
        linkedSkillId: feedback.linkedSkillId,
      };

      if (!member.feedbacks) {
        member.feedbacks = [];
      }
      member.feedbacks.push(newFeedback);
      _setData(STORAGE_KEYS.TEAM_MEMBERS, team);
      return Promise.resolve(newFeedback);
    },

    async awardKudos(memberId: string): Promise<{ success: boolean; newCount: number }> {
      const team = _getData<TeamMemberSummary[]>(STORAGE_KEYS.TEAM_MEMBERS) || [];
      const member = team.find(m => m.id === memberId);

      if (!member) {
        throw new Error('Team member not found in local storage.');
      }

      member.kudosCount = (member.kudosCount || 0) + 1;
      _setData(STORAGE_KEYS.TEAM_MEMBERS, team);
      return Promise.resolve({ success: true, newCount: member.kudosCount });
    }
  };
})();

/**
 * NodeJsApiService: Implements the talentApi interface using HTTP requests to the Node.js backend.
 */
const nodeJsApiService = {
  async getProfile(): Promise<UserProfile> {
    const response = await fetch(`${BASE_URL}/profile`);
    if (!response.ok) {
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }
    return response.json();
  },

  async getPersonas(): Promise<Persona[]> {
    const response = await fetch(`${BASE_URL}/personas`);
    if (!response.ok) {
      throw new Error(`Error fetching personas: ${response.statusText}`);
    }
    return response.json();
  },

  async getTeam(): Promise<TeamMemberSummary[]> {
    const response = await fetch(`${BASE_URL}/team`);
    if (!response.ok) {
      throw new Error(`Error fetching team: ${response.statusText}`);
    }
    return response.json();
  },

  async registerFeedback(memberId: string, feedback: Partial<ClientFeedback>): Promise<ClientFeedback> {
    const response = await fetch(`${BASE_URL}/feedback/${memberId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });
    if (!response.ok) {
      throw new Error(`Error registering feedback: ${response.statusText}`);
    }
    return response.json();
  },

  async awardKudos(memberId: string): Promise<{ success: boolean; newCount: number }> {
    const response = await fetch(`${BASE_URL}/kudos/${memberId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error awarding kudos: ${response.statusText}`);
    }
    return response.json();
  }
};

// Export the appropriate API service based on the environment variable
export const talentApi = USE_COSMOS_DB ? nodeJsApiService : localStorageService;

// Configuration for Cosmos DB (not used directly in frontend, but could be passed to backend)
export const COSMOS_CONFIG = {
    endpoint: import.meta.env.VITE_COSMOS_DB_ENDPOINT || '',
    key: import.meta.env.VITE_COSMOS_DB_KEY || '',
    databaseId: import.meta.env.VITE_COSMOS_DB_DATABASE_ID || '',
    containerId: import.meta.env.VITE_COSMOS_DB_CONTAINER_ID || ''
};