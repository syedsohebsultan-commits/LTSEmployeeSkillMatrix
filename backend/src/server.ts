
import express from 'express';
import cors from 'cors'; // Import cors middleware
import { MOCK_CURRENT_USER, PERSONAS, MOCK_TEAM_MEMBERS } from './shared/mockData';
import { UserProfile, Persona, TeamMemberSummary, ClientFeedback } from './shared/types';
import { cosmosDbService } from './cosmosDbService';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
} // Explicitly define path to .env file

const PORT = process.env.PORT || 8080;
const USE_COSMOS_DB = process.env.USE_COSMOS_DB === '1';

// In-memory data store (using mutable mock data for demonstration)
let currentUser: UserProfile = { ...MOCK_CURRENT_USER };
let personas: Persona[] = [...PERSONAS];
let teamMembers: TeamMemberSummary[] = MOCK_TEAM_MEMBERS.map((member: TeamMemberSummary) => ({
  ...member,
  feedbacks: member.feedbacks ? [...member.feedbacks] : []
}));

// Initialize Cosmos DB if enabled
if (USE_COSMOS_DB) {
  cosmosDbService.init()
    .then(() => console.log('Cosmos DB service initialized successfully.'))
    .catch(error => {
      console.error('Failed to initialize Cosmos DB service. Falling back to in-memory data:', error);
      // Fallback to in-memory data if Cosmos DB initialization fails
      // This ensures the server can still start and serve data
      (USE_COSMOS_DB as any) = false; // Force switch to in-memory
    });
}

const app = express();

// Use CORS middleware for development flexibility
app.use(cors());

// Enable JSON body parsing for API requests
app.use(express.json());

// Serve static files from the 'public' directory
// In deployment, 'public' will contain the built React app
const buildPath = path.resolve(__dirname, 'dist'); 
app.use(express.static(buildPath));

// API Routes
app.get('/api/profile', async (req, res) => {
  try {
    const dataSource = USE_COSMOS_DB ? cosmosDbService : { getProfile: async () => currentUser };
    const profile = await dataSource.getProfile();
    res.json(profile);
  } catch (error: any) {
    console.error(`Error fetching profile: ${error.message}`);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

app.get('/api/personas', async (req, res) => {
  try {
    const dataSource = USE_COSMOS_DB ? cosmosDbService : { getPersonas: async () => personas };
    const fetchedPersonas = await dataSource.getPersonas();
    res.json(fetchedPersonas);
  } catch (error: any) {
    console.error(`Error fetching personas: ${error.message}`);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

app.get('/api/team', async (req, res) => {
  try {
    const dataSource = USE_COSMOS_DB ? cosmosDbService : { getTeam: async () => teamMembers };
    const fetchedTeam = await dataSource.getTeam();
    res.json(fetchedTeam);
  } catch (error: any) {
    console.error(`Error fetching team: ${error.message}`);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

app.post('/api/feedback/:memberId', async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const feedbackData = req.body;
    const dataSource = USE_COSMOS_DB ? cosmosDbService : {
      registerFeedback: async (id: string, data: Partial<ClientFeedback>) => {
        const member = teamMembers.find(m => m.id === id);
        if (!member) throw new Error('Team member not found');
        const newFeedback: ClientFeedback = {
          id: `f${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          clientId: data.clientId || 'c-generated',
          clientName: data.clientName || 'Generated Client',
          content: data.content || 'No content provided',
          date: new Date().toISOString(),
          sentiment: data.sentiment || 'Neutral',
          status: 'Received',
          linkedSkillId: data.linkedSkillId,
        };
        if (!member.feedbacks) member.feedbacks = [];
        member.feedbacks.push(newFeedback);
        return newFeedback;
      }
    };
    const newFeedback = await dataSource.registerFeedback(memberId, feedbackData);
    res.status(201).json(newFeedback);
  } catch (error: any) {
    console.error(`Error registering feedback: ${error.message}`);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

app.post('/api/kudos/:memberId', async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const dataSource = USE_COSMOS_DB ? cosmosDbService : {
      awardKudos: async (id: string) => {
        const member = teamMembers.find(m => m.id === id);
        if (!member) throw new Error('Team member not found');
        member.kudosCount = (member.kudosCount || 0) + 1;
        return { success: true, newCount: member.kudosCount };
      }
    };
    const result = await dataSource.awardKudos(memberId);
    res.json(result);
  } catch (error: any) {
    console.error(`Error awarding kudos: ${error.message}`);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

// SPA fallback: For any other GET request, serve the index.html
// This ensures client-side routing works for React.
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} (Data source: ${USE_COSMOS_DB ? 'Cosmos DB' : 'In-Memory'})`);
});
