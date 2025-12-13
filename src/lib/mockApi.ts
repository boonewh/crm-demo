// Mock API service for demo mode
import { 
  DEMO_CLIENTS, 
  DEMO_LEADS, 
  DEMO_PROJECTS, 
  DEMO_INTERACTIONS, 
  DEMO_FILES, 
  DEMO_USER,
  DEMO_USERS,
  DEMO_CONTACTS
} from '../data/mockData';
import { Client, Lead, Project, Interaction } from '../types';
import { FileInfo } from '../api/storage';

// Helper function to generate dynamic follow-up dates for demo purposes
function generateDynamicFollowUpDates(interactions: Interaction[]): Interaction[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Define the date ranges for different categories
  const dateRanges = [
    // Overdue dates (2-14 days ago)
    { days: -14, category: 'overdue' },
    { days: -7, category: 'overdue' },
    { days: -3, category: 'overdue' },
    { days: -1, category: 'overdue' },
    
    // Today
    { days: 0, category: 'today' },
    { days: 0, category: 'today' }, // Multiple items for today
    
    // Upcoming (1-7 days from now)
    { days: 1, category: 'upcoming' },
    { days: 2, category: 'upcoming' },
    { days: 3, category: 'upcoming' },
    { days: 5, category: 'upcoming' },
    { days: 7, category: 'upcoming' }
  ];
  
  return interactions.map((interaction) => {
    // Skip interactions that don't have follow-ups or are completed
    if (!interaction.follow_up || interaction.followup_status === 'completed') {
      return interaction;
    }
    
    // Use a deterministic approach based on interaction ID to ensure consistency
    const dateIndex = (interaction.id - 1) % dateRanges.length;
    const targetRange = dateRanges[dateIndex];
    
    // Calculate the new follow-up date
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + targetRange.days);
    
    // Add some time variation to make it more realistic
    const hour = 9 + (interaction.id % 8); // Hours between 9 AM and 5 PM
    const minute = (interaction.id * 15) % 60; // Minutes in 15-minute intervals
    newDate.setHours(hour, minute, 0, 0);
    
    return {
      ...interaction,
      follow_up: newDate.toISOString()
    };
  });
}

// Simulate network delay for more realistic demo experience
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export class MockApiService {
  // Authentication
  static async login(_email: string, _password: string) {
    await delay();
    // Always succeed in demo mode - create a valid JWT-like token for demo
    const demoJwtPayload = btoa(JSON.stringify({
      sub: "demo@allseasonsfoam.com",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours from now
    }));
    const demoToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${demoJwtPayload}.demo-signature`;
    
    return {
      ok: true,
      json: async () => ({
        token: demoToken,
        user: DEMO_USER
      })
    };
  }

  static async verifyToken() {
    await delay();
    return {
      ok: true,
      json: async () => DEMO_USER
    };
  }

  // Clients
  static async getClients(params?: any) {
    await delay();
    let clients = [...DEMO_CLIENTS];
    
    // Simple filtering and sorting simulation
    if (params?.type && params.type !== 'None') {
      clients = clients.filter(c => c.type === params.type);
    }
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      clients = clients.filter(c => 
        c.name.toLowerCase().includes(search) ||
        c.contact_person?.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search)
      );
    }

    return {
      ok: true,
      json: async () => ({
        clients,
        total: clients.length,
        currentPage: params?.page || 1,
        totalPages: Math.ceil(clients.length / (params?.limit || 10))
      })
    };
  }

  static async getClient(id: number) {
    await delay();
    const client = DEMO_CLIENTS.find(c => c.id === id);
    if (!client) {
      return { ok: false, status: 404 };
    }
    return {
      ok: true,
      json: async () => client
    };
  }

  static async createClient(_clientData: Partial<Client>) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Client creation simulated",
        id: Math.max(...DEMO_CLIENTS.map(c => c.id)) + 1
      })
    };
  }

  static async updateClient(_id: number, _clientData: Partial<Client>) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Client update simulated"
      })
    };
  }

  static async deleteClient(_id: number) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Client deletion simulated"
      })
    };
  }

  static async getClientsAll(params?: any) {
    await delay();
    let clients = [...DEMO_CLIENTS];
    
    // Filter by user email if provided
    if (params?.user_email) {
      // In a real app, this would filter by assigned user
      // For demo, we'll just return all clients but show some variety
      clients = clients.filter((_, index) => {
        // Show different subsets for different users for demo variety
        const userHash = params.user_email.charCodeAt(0) % 3;
        return (index % 3) === userHash;
      });
    }

    // Handle pagination
    const page = parseInt(params?.page || '1');
    const perPage = parseInt(params?.per_page || '10');
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedClients = clients.slice(startIndex, endIndex);

    return {
      ok: true,
      json: async () => ({
        clients: paginatedClients,
        total: clients.length,
        page,
        per_page: perPage
      })
    };
  }

  // Leads
  static async getLeads(params?: any) {
    await delay();
    let leads = [...DEMO_LEADS];
    
    if (params?.status) {
      leads = leads.filter(l => l.lead_status === params.status);
    }
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      leads = leads.filter(l => 
        l.name.toLowerCase().includes(search) ||
        l.contact_person?.toLowerCase().includes(search) ||
        l.email.toLowerCase().includes(search)
      );
    }

    return {
      ok: true,
      json: async () => ({
        leads,
        total: leads.length
      })
    };
  }

  static async getLead(id: number) {
    console.log("MockApiService.getLead called with ID:", id);
    await delay();
    const lead = DEMO_LEADS.find(l => l.id === id);
    console.log("Found lead:", lead);
    if (!lead) {
      console.log("Lead not found, returning 404");
      return { ok: false, status: 404 };
    }
    console.log("Returning lead data:", lead);
    return {
      ok: true,
      json: async () => lead
    };
  }

  static async createLead(_leadData: Partial<Lead>) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Lead creation simulated",
        id: Math.max(...DEMO_LEADS.map(l => l.id)) + 1
      })
    };
  }

  static async updateLead(_id: number, _leadData: Partial<Lead>) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Lead update simulated"
      })
    };
  }

  static async deleteLead(_id: number) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Lead deletion simulated"
      })
    };
  }

  static async getLeadsAll(params?: any) {
    await delay();
    let leads = [...DEMO_LEADS];
    
    // Filter by user email if provided
    if (params?.user_email) {
      // In a real app, this would filter by assigned user
      // For demo, we'll just return all leads but show some variety
      leads = leads.filter((_, index) => {
        // Show different subsets for different users for demo variety
        const userHash = params.user_email.charCodeAt(0) % 3;
        return (index % 3) === userHash;
      });
    }

    // Handle pagination
    const page = parseInt(params?.page || '1');
    const perPage = parseInt(params?.per_page || '10');
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedLeads = leads.slice(startIndex, endIndex);

    return {
      ok: true,
      json: async () => ({
        leads: paginatedLeads,
        total: leads.length,
        page,
        per_page: perPage
      })
    };
  }

  // Projects
  static async getProjects(params?: any) {
    await delay();
    let projects = [...DEMO_PROJECTS];
    
    if (params?.status) {
      projects = projects.filter(p => p.project_status === params.status);
    }
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      projects = projects.filter(p => 
        p.project_name.toLowerCase().includes(search) ||
        p.client_name?.toLowerCase().includes(search) ||
        p.lead_name?.toLowerCase().includes(search)
      );
    }

    return {
      ok: true,
      json: async () => ({
        projects,
        total: projects.length
      })
    };
  }

  static async getProject(id: number) {
    await delay();
    const project = DEMO_PROJECTS.find(p => p.id === id);
    if (!project) {
      return { ok: false, status: 404 };
    }
    return {
      ok: true,
      json: async () => project
    };
  }

  static async createProject(_projectData: Partial<Project>) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Project creation simulated",
        id: Math.max(...DEMO_PROJECTS.map(p => p.id)) + 1
      })
    };
  }

  static async updateProject(_id: number, _projectData: Partial<Project>) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Project update simulated"
      })
    };
  }

  static async deleteProject(_id: number) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Project deletion simulated"
      })
    };
  }

  static async getProjectsAll(params?: any) {
    await delay();
    let projects = [...DEMO_PROJECTS];
    
    // Filter by user email if provided
    if (params?.user_email) {
      // In a real app, this would filter by assigned user
      // For demo, we'll just return all projects but show some variety
      projects = projects.filter((_, index) => {
        // Show different subsets for different users for demo variety
        const userHash = params.user_email.charCodeAt(0) % 3;
        return (index % 3) === userHash;
      });
    }

    // Handle pagination
    const page = parseInt(params?.page || '1');
    const perPage = parseInt(params?.per_page || '10');
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProjects = projects.slice(startIndex, endIndex);

    return {
      ok: true,
      json: async () => ({
        projects: paginatedProjects,
        total: projects.length,
        page,
        per_page: perPage
      })
    };
  }

  static async getProjectsByClient(clientId: number) {
    await delay();
    const projects = DEMO_PROJECTS.filter(p => p.client_id === clientId);
    return {
      ok: true,
      json: async () => projects
    };
  }

  static async getProjectsByLead(leadId: number) {
    await delay();
    const projects = DEMO_PROJECTS.filter(p => p.lead_id === leadId);
    return {
      ok: true,
      json: async () => projects
    };
  }

  // Interactions
  static async getInteractions(params?: any) {
    await delay();
    // Generate dynamic follow-up dates for demo purposes
    let interactions = generateDynamicFollowUpDates([...DEMO_INTERACTIONS]);
    
    if (params?.client_id) {
      interactions = interactions.filter(i => i.client_id === parseInt(params.client_id));
    }
    
    if (params?.lead_id) {
      interactions = interactions.filter(i => i.lead_id === parseInt(params.lead_id));
    }
    
    if (params?.project_id) {
      interactions = interactions.filter(i => i.project_id === parseInt(params.project_id));
    }

    return {
      ok: true,
      json: async () => ({
        interactions,
        total: interactions.length
      })
    };
  }

  static async getInteraction(id: number) {
    await delay();
    // Generate dynamic follow-up dates for demo purposes
    const interactions = generateDynamicFollowUpDates([...DEMO_INTERACTIONS]);
    const interaction = interactions.find(i => i.id === id);
    if (!interaction) {
      return { ok: false, status: 404 };
    }
    return {
      ok: true,
      json: async () => interaction
    };
  }

  static async createInteraction(_interactionData: Partial<Interaction>) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Interaction creation simulated",
        id: Math.max(...DEMO_INTERACTIONS.map(i => i.id)) + 1
      })
    };
  }

  static async updateInteraction(_id: number, _interactionData: Partial<Interaction>) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Interaction update simulated"
      })
    };
  }

  static async deleteInteraction(_id: number) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Interaction deletion simulated"
      })
    };
  }

  // Files/Storage
  static async getFiles(): Promise<{ ok: boolean; json: () => Promise<FileInfo[]> }> {
    await delay();
    return {
      ok: true,
      json: async () => [...DEMO_FILES]
    };
  }

  static async uploadFiles(files: File[]) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: `Demo mode: Upload of ${files.length} file(s) simulated`
      })
    };
  }

  static async deleteFile(_id: number) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: File deletion simulated"
      })
    };
  }

  static async downloadFile(_id: number) {
    await delay();
    return {
      ok: true,
      blob: async () => new Blob(['Demo file content'], { type: 'application/octet-stream' })
    };
  }

  // Dashboard/Analytics
  static async getDashboardStats() {
    await delay();
    return {
      ok: true,
      json: async () => ({
        totalClients: DEMO_CLIENTS.length,
        totalLeads: DEMO_LEADS.length,
        totalProjects: DEMO_PROJECTS.length,
        openLeads: DEMO_LEADS.filter(l => l.lead_status === 'open').length,
        activeProjects: DEMO_PROJECTS.filter(p => p.project_status === 'In Progress').length,
        totalProjectValue: DEMO_PROJECTS.reduce((sum, p) => sum + (p.project_worth || 0), 0),
        recentInteractions: DEMO_INTERACTIONS.slice(0, 5)
      })
    };
  }

  // Recent Activity - simulates entities the user has recently "touched"
  static async getRecentActivity() {
    await delay();
    
    // Generate recent touch times (last 7 days)
    const now = new Date();
    const generateRecentTime = (daysAgo: number, hoursOffset: number = 0) => {
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      date.setHours(date.getHours() - hoursOffset);
      return date.toISOString();
    };

    // Simulate recent touches across different entity types
    const recentActivity = [
      {
        entity_type: 'client',
        entity_id: 1,
        name: 'Acme Manufacturing',
        last_touched: generateRecentTime(0, 2), // 2 hours ago
        profile_link: '/clients/1'
      },
      {
        entity_type: 'lead',
        entity_id: 1,
        name: 'Coastal Environmental Services',
        last_touched: generateRecentTime(0, 4), // 4 hours ago
        profile_link: '/leads/1'
      },
      {
        entity_type: 'project',
        entity_id: 3,
        name: 'Bridge Foam Application',
        last_touched: generateRecentTime(0, 6), // 6 hours ago
        profile_link: '/projects/3'
      },
      {
        entity_type: 'client',
        entity_id: 3,
        name: 'Prime Food Processing',
        last_touched: generateRecentTime(1, 2), // Yesterday, 2 hours ago
        profile_link: '/clients/3'
      },
      {
        entity_type: 'lead',
        entity_id: 2,
        name: 'Southwest Culvert Systems',
        last_touched: generateRecentTime(1, 8), // Yesterday, 8 hours ago
        profile_link: '/leads/2'
      },
      {
        entity_type: 'project',
        entity_id: 1,
        name: 'Tank Foam Expansion',
        last_touched: generateRecentTime(2, 3), // 2 days ago, 3 hours ago
        profile_link: '/projects/1'
      },
      {
        entity_type: 'client',
        entity_id: 5,
        name: 'Texas Tank Storage',
        last_touched: generateRecentTime(2, 10), // 2 days ago, 10 hours ago
        profile_link: '/clients/5'
      },
      {
        entity_type: 'project',
        entity_id: 2,
        name: 'Pipe Insulation Project',
        last_touched: generateRecentTime(3, 5), // 3 days ago, 5 hours ago
        profile_link: '/projects/2'
      }
    ];

    // Sort by most recent first
    recentActivity.sort((a, b) => new Date(b.last_touched).getTime() - new Date(a.last_touched).getTime());

    return {
      ok: true,
      json: async () => recentActivity
    };
  }

  // Reports
  static async getReports(_params?: any) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Report generation simulated",
        data: {
          clientsByType: {
            "Oil & Gas": 1,
            "Food and Beverage": 1, 
            "Bridge": 1,
            "Pipe": 1,
            "Tanks": 1
          },
          projectsByStatus: {
            "Planning": 2,
            "In Progress": 2,
            "Completed": 1
          },
          leadsByStatus: {
            "open": 3,
            "converted": 1
          }
        }
      })
    };
  }

  // Users
  static async getUsers() {
    await delay();
    return {
      ok: true,
      json: async () => DEMO_USERS
    };
  }

  static async createUser(userData: any) {
    await delay();
    
    // Create a simulated user object for demo
    const newUser = {
      id: Math.floor(Math.random() * 1000) + 100, // Ensure unique ID
      email: userData.email || `demo-user-${Date.now()}@example.com`,
      roles: userData.roles || ['user'],
      created_at: new Date().toISOString(),
      is_active: true
    };

    return {
      ok: true,
      json: async () => newUser
    };
  }

  static async updateUser(id: number, _userData: any) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        id,
        message: "Demo mode: User update simulated"
      })
    };
  }

  static async deleteUser(_id: number) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: User deletion simulated"
      })
    };
  }

  static async toggleUserActive(id: number) {
    await delay();
    // For demo purposes, simulate toggling active status
    const currentUser = DEMO_USERS.find(u => u.id === id);
    const newActiveStatus = currentUser ? !currentUser.is_active : false;
    
    return {
      ok: true,
      json: async () => ({
        is_active: newActiveStatus,
        message: "Demo mode: User active status toggled"
      })
    };
  }

  static async updateUserRoles(_id: number, rolesData: any) {
    await delay();
    const newRoles = rolesData.roles || ['user'];

    return {
      ok: true,
      json: async () => ({
        roles: newRoles,
        message: "Demo mode: User roles updated"
      })
    };
  }

  // Contacts
  static async getContacts(params?: any) {
    await delay();
    let contacts = [...DEMO_CONTACTS];
    
    if (params?.client_id) {
      contacts = contacts.filter(c => c.client_id === parseInt(params.client_id));
    }
    
    if (params?.lead_id) {
      contacts = contacts.filter(c => c.lead_id === parseInt(params.lead_id));
    }

    return {
      ok: true,
      json: async () => contacts
    };
  }

  static async getContact(id: number) {
    await delay();
    const contact = DEMO_CONTACTS.find(c => c.id === id);
    if (!contact) {
      return { ok: false, status: 404 };
    }
    return {
      ok: true,
      json: async () => contact
    };
  }

  static async createContact(_contactData: any) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Contact creation simulated",
        id: Math.max(...DEMO_CONTACTS.map(c => c.id)) + 1
      })
    };
  }

  static async updateContact(_id: number, _contactData: any) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Contact update simulated"
      })
    };
  }

  static async deleteContact(_id: number) {
    await delay();
    return {
      ok: true,
      json: async () => ({
        message: "Demo mode: Contact deletion simulated"
      })
    };
  }

  // Trash endpoints removed - TrashPage is now static
}