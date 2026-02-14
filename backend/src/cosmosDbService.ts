
import { CosmosClient, Container, Database } from '@azure/cosmos';
import { UserProfile, Persona, TeamMemberSummary, ClientFeedback } from '@shared/types';
import { MOCK_CURRENT_USER, PERSONAS, MOCK_TEAM_MEMBERS } from '@shared/mockData';

export class CosmosDbService {
  private client: CosmosClient;
  private database: Database | undefined;
  private container: Container | undefined;
  private databaseId: string;
  private containerId: string;

  constructor() {
    const endpoint = process.env.COSMOS_DB_ENDPOINT;
    const key = process.env.COSMOS_DB_KEY;
    this.databaseId = process.env.COSMOS_DB_DATABASE_ID || 'talentdb';
    this.containerId = process.env.COSMOS_DB_CONTAINER_ID || 'profiles';

    if (!endpoint || !key) {
      console.warn("Cosmos DB endpoint or key not provided in environment variables. Cosmos DB functionality will be limited.");
      // Initialize client with dummy values to allow instantiation, but operations will fail.
      this.client = new CosmosClient({ endpoint: "https://dummy.documents.azure.com:443/", key: "dummy_key" });
      return;
    }

    this.client = new CosmosClient({ endpoint, key });
  }

  public async init() {
    console.log(`Cosmos DB: Ensuring database "${this.databaseId}" and container "${this.containerId}" exist.`);
    try {
      const { database } = await this.client.databases.createIfNotExists({ id: this.databaseId });
      this.database = database;
      const { container } = await this.database.containers.createIfNotExists({ id: this.containerId, partitionKey: { paths: ['/id'] } });
      this.container = container;

      // Optional: Seed initial data if container is empty
      // Ensure container is available before trying to read from it
      if (this.container) {
        const { resources: items } = await this.container.items.readAll().fetchAll();
        if (items.length === 0) {
          console.log('Cosmos DB: Seeding initial data...');
          await this.seedData();
          console.log('Cosmos DB: Data seeded.');
        } else {
            console.log(`Cosmos DB: Container "${this.containerId}" already contains data.`);
        }
      } else {
          console.warn('Cosmos DB: Container was not initialized during init() method.');
      }
    } catch (error) {
        console.error('Cosmos DB initialization failed:', error);
        throw new Error('Failed to connect to Cosmos DB. Check configuration and network.');
    }
  }

  private async seedData() {
    // Add check to ensure container is initialized before seeding
    if (!this.container) {
      throw new Error('Cosmos DB container not initialized for seeding.');
    }
    const entities = [
        { ...MOCK_CURRENT_USER, type: 'userProfile' }, // Add a type to distinguish entities
        ...PERSONAS.map((p: Persona) => ({ ...p, type: 'persona' })),
        ...MOCK_TEAM_MEMBERS.map((member: TeamMemberSummary) => ({ ...member, type: 'teamMember' }))
    ];

    for (const entity of entities) {
        try {
            await this.container.items.upsert(entity);
        } catch (error) {
            console.error(`Failed to upsert entity with ID ${entity.id}:`, error);
        }
    }
  }

  // --- API Methods ---

  async getProfile(): Promise<UserProfile> {
    // Add check to ensure container is initialized
    if (!this.container) {
      throw new Error('Cosmos DB container not initialized.');
    }
    // Explicitly assert this.container to Container to enable typed query calls
    const { resources } = await (this.container as Container).items
      .query<UserProfile>({
        query: "SELECT * FROM c WHERE c.id = @id AND c.type = 'userProfile'",
        parameters: [{ name: "@id", value: MOCK_CURRENT_USER.id }]
      })
      .fetchAll();
    
    if (resources.length === 0) {
      throw new Error('User profile not found in Cosmos DB.');
    }
    return resources[0];
  }

  async getPersonas(): Promise<Persona[]> {
    // Add check to ensure container is initialized
    if (!this.container) {
      throw new Error('Cosmos DB container not initialized.');
    }
    // Explicitly assert this.container to Container to enable typed query calls
    const { resources } = await (this.container as Container).items
      .query<Persona>({
        query: "SELECT * FROM c WHERE c.type = 'persona'"
      })
      .fetchAll();
    return resources;
  }

  async getTeam(): Promise<TeamMemberSummary[]> {
    // Add check to ensure container is initialized
    if (!this.container) {
      throw new Error('Cosmos DB container not initialized.');
    }
    // Explicitly assert this.container to Container to enable typed query calls
    const { resources } = await (this.container as Container).items
      .query<TeamMemberSummary>({
        query: "SELECT * FROM c WHERE c.type = 'teamMember'"
      })
      .fetchAll();
    return resources;
  }

  async registerFeedback(memberId: string, feedback: Partial<ClientFeedback>): Promise<ClientFeedback> {
    // Add check to ensure container is initialized
    if (!this.container) {
      throw new Error('Cosmos DB container not initialized.');
    }
    // Explicitly assert this.container to Container to enable typed item read calls
    const { resource: member } = await (this.container as Container).item(memberId, memberId).read<TeamMemberSummary>();
    if (!member) {
        throw new Error('Team member not found in Cosmos DB.');
    }

    const newFeedback: ClientFeedback = {
        id: `f${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        clientId: feedback.clientId || 'c-generated-cosmos',
        clientName: feedback.clientName || 'Generated Client (Cosmos)',
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

    await (this.container as Container).items.upsert(member);
    return newFeedback;
  }

  async awardKudos(memberId: string): Promise<{ success: boolean; newCount: number }> {
    // Add check to ensure container is initialized
    if (!this.container) {
      throw new Error('Cosmos DB container not initialized.');
    }
    // Explicitly assert this.container to Container to enable typed item read calls
    const { resource: member } = await (this.container as Container).item(memberId, memberId).read<TeamMemberSummary>();
    if (!member) {
        throw new Error('Team member not found in Cosmos DB.');
    }

    member.kudosCount = (member.kudosCount || 0) + 1;
    await (this.container as Container).items.upsert(member);
    return { success: true, newCount: member.kudosCount };
  }
}

export const cosmosDbService = new CosmosDbService();