// DEMO-ONLY API - No backend connectivity
// This is a demo version that only uses mock data

import { MockApiService } from './mockApi';

// Helper function to properly type API responses for JSON parsing
export async function getJsonFromResponse(response: any): Promise<any> {
  return await (response as any).json();
}

// Demo-only API functions that route directly to mock services
export async function apiFetch(path: string, options?: RequestInit) {
  // Route all requests directly to mock API - no real backend calls
  const method = options?.method || 'GET';
  const url = new URL(path, 'http://localhost');
  const pathParts = url.pathname.split('/').filter(Boolean);
  
  console.log('Demo API routing:', { path, method, pathParts });
  
  try {
    // Route requests to appropriate mock API methods
    switch (true) {
      // Authentication
      case path === '/api/auth/login':
        if (method === 'POST') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.login(body.email, body.password);
        }
        break;
      
      case path === '/api/user':
        return await MockApiService.verifyToken();

      // Clients - specific client by ID FIRST
      case /^\/api\/clients\/\d+$/.test(path):
      case /^\/clients\/\d+$/.test(path):
        console.log("Client detail route matched! Path:", path);
        const clientId = parseInt(path.split('/').pop() || '0');
        if (method === 'GET') {
          return await MockApiService.getClient(clientId);
        } else if (method === 'PUT' || method === 'PATCH') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.updateClient(clientId, body);
        } else if (method === 'DELETE') {
          return await MockApiService.deleteClient(clientId);
        }
        break;

      // Clients - general list
      case path.startsWith('/api/clients') && pathParts.length === 2:
      case path.startsWith('/clients') && pathParts.length === 1:
        if (method === 'GET') {
          const params = Object.fromEntries(url.searchParams);
          return await MockApiService.getClients(params);
        } else if (method === 'POST') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.createClient(body);
        }
        break;
        break;

      // Leads - specific lead by ID FIRST
      case /^\/api\/leads\/\d+$/.test(path):
      case /^\/leads\/\d+$/.test(path):
        console.log("Lead detail route matched! Path:", path);
        const leadId = parseInt(path.split('/').pop() || '0');
        console.log("Extracted leadId:", leadId);
        if (method === 'GET') {
          console.log("Calling MockApiService.getLead with ID:", leadId);
          return await MockApiService.getLead(leadId);
        } else if (method === 'PUT' || method === 'PATCH') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.updateLead(leadId, body);
        } else if (method === 'DELETE') {
          return await MockApiService.deleteLead(leadId);
        }
        break;

      // Leads - general list
      case path.startsWith('/api/leads') && pathParts.length === 2:
      case path.startsWith('/leads') && pathParts.length === 1:
        if (method === 'GET') {
          const params = Object.fromEntries(url.searchParams);
          return await MockApiService.getLeads(params);
        } else if (method === 'POST') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.createLead(body);
        }
        break;

      // Projects
      case path.startsWith('/api/projects') && pathParts.length === 2:
      case path.startsWith('/projects') && pathParts.length === 1:
        if (method === 'GET') {
          const params = Object.fromEntries(url.searchParams);
          return await MockApiService.getProjects(params);
        } else if (method === 'POST') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.createProject(body);
        }
        break;
      
      case /^\/api\/projects\/\d+$/.test(path):
      case /^\/projects\/\d+$/.test(path):
        const projectId = parseInt(path.split('/').pop() || '0');
        if (method === 'GET') {
          return await MockApiService.getProject(projectId);
        } else if (method === 'PUT' || method === 'PATCH') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.updateProject(projectId, body);
        } else if (method === 'DELETE') {
          return await MockApiService.deleteProject(projectId);
        }
        break;

      // Projects by client/lead
      case /^\/projects\/by-client\/\d+$/.test(path):
      case /^\/api\/projects\/by-client\/\d+$/.test(path):
        const projectClientId = parseInt(path.split('/').pop() || '0');
        return await MockApiService.getProjectsByClient(projectClientId);
      
      case /^\/projects\/by-lead\/\d+$/.test(path):
      case /^\/api\/projects\/by-lead\/\d+$/.test(path):
        const projectLeadId = parseInt(path.split('/').pop() || '0');
        return await MockApiService.getProjectsByLead(projectLeadId);

      // Interactions
      case path.startsWith('/api/interactions') && pathParts.length === 2:
      case path.startsWith('/interactions') && (pathParts.length === 1 || pathParts.length === 2):
        if (method === 'GET') {
          const params = Object.fromEntries(url.searchParams);
          return await MockApiService.getInteractions(params);
        } else if (method === 'POST') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.createInteraction(body);
        }
        break;
      
      case /^\/api\/interactions\/\d+$/.test(path):
      case /^\/interactions\/\d+$/.test(path):
        const interactionId = parseInt(path.split('/').pop() || '0');
        if (method === 'GET') {
          return await MockApiService.getInteraction(interactionId);
        } else if (method === 'PUT' || method === 'PATCH') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.updateInteraction(interactionId, body);
        } else if (method === 'DELETE') {
          return await MockApiService.deleteInteraction(interactionId);
        }
        break;

      // Admin endpoints
      case path.startsWith('/clients/all') || path.startsWith('/api/clients/all'):
        if (method === 'GET') {
          const params = Object.fromEntries(url.searchParams);
          return await MockApiService.getClientsAll(params);
        }
        break;
      
      case path.startsWith('/leads/all') || path.startsWith('/api/leads/all'):
        if (method === 'GET') {
          const params = Object.fromEntries(url.searchParams);
          return await MockApiService.getLeadsAll(params);
        }
        break;
      
      case path.startsWith('/projects/all') || path.startsWith('/api/projects/all'):
        if (method === 'GET') {
          const params = Object.fromEntries(url.searchParams);
          return await MockApiService.getProjectsAll(params);
        }
        break;

      // Storage/Files
      case path === '/storage/list':
        return await MockApiService.getFiles();
      
      case path === '/storage/upload':
        return await MockApiService.uploadFiles([]);
      
      case /^\/storage\/delete\/\d+$/.test(path):
        const fileId = parseInt(path.split('/').pop() || '0');
        return await MockApiService.deleteFile(fileId);
      
      case /^\/storage\/download\/\d+$/.test(path):
        const downloadId = parseInt(path.split('/').pop() || '0');
        return await MockApiService.downloadFile(downloadId);

      // Dashboard
      case path === '/api/dashboard' || path === '/api/stats':
        return await MockApiService.getDashboardStats();
      
      case path === '/activity/recent' || path === '/api/activity/recent':
        return await MockApiService.getDashboardStats();
      
      // Contacts
      case path.startsWith('/api/contacts') && pathParts.length === 2:
      case path.startsWith('/contacts') && (pathParts.length === 1 || pathParts.length === 2):
        if (method === 'GET') {
          const params = Object.fromEntries(url.searchParams);
          return await MockApiService.getContacts(params);
        } else if (method === 'POST') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.createContact(body);
        }
        break;
      
      case /^\/api\/contacts\/\d+$/.test(path):
      case /^\/contacts\/\d+$/.test(path):
        const contactId = parseInt(path.split('/').pop() || '0');
        if (method === 'GET') {
          return await MockApiService.getContact(contactId);
        } else if (method === 'PUT' || method === 'PATCH') {
          const body = options?.body ? JSON.parse(options.body as string) : {};
          return await MockApiService.updateContact(contactId, body);
        } else if (method === 'DELETE') {
          return await MockApiService.deleteContact(contactId);
        }
        break;

      // Users
      case path.startsWith('/users') && (pathParts.length === 1 || pathParts.length === 2):
      case path.startsWith('/api/users') && pathParts.length === 2:
        if (method === 'GET') {
          return MockApiService.getUsers();
        } else if (method === 'POST') {
          const userData = JSON.parse(options?.body as string || '{}');
          return MockApiService.createUser(userData);
        } else if (method === 'PUT' || method === 'PATCH') {
          const userId = parseInt(pathParts[pathParts.length - 1]);
          const userData = JSON.parse(options?.body as string || '{}');
          return MockApiService.updateUser(userId, userData);
        } else if (method === 'DELETE') {
          const userId = parseInt(pathParts[pathParts.length - 1]);
          return MockApiService.deleteUser(userId);
        }
        break;

      // Specific user endpoints  
      case /^\/users\/\d+\/toggle-active$/.test(path):
        const toggleUserId = parseInt(path.split('/')[2]);
        if (method === 'PUT') {
          return MockApiService.toggleUserActive(toggleUserId);
        }
        break;
      
      case /^\/users\/\d+\/roles$/.test(path):
        const rolesUserId = parseInt(path.split('/')[2]);
        if (method === 'PUT') {
          const rolesData = JSON.parse(options?.body as string || '{}');
          return MockApiService.updateUserRoles(rolesUserId, rolesData);
        }
        break;

      // Preferences
      case path.startsWith('/preferences') || path.startsWith('/api/preferences'):
        if (method === 'GET') {
          return {
            ok: true,
            json: async () => ({
              pagination: {},
              display: { sidebar_collapsed: false, theme: 'light' }
            })
          };
        } else if (method === 'PUT') {
          // Handle both general preferences and pagination-specific preferences
          return {
            ok: true,
            json: async () => ({ message: "Demo mode: Preferences saved" })
          };
        }
        break;
      
      // Search
      case path.startsWith('/search') || path.startsWith('/api/search'):
        return {
          ok: true,
          json: async () => []
        };

      // Reports
      case path.startsWith('/api/reports'):
        const reportParams = Object.fromEntries(url.searchParams);
        return await MockApiService.getReports(reportParams);

      // Trash endpoints - no longer needed since TrashPage is now static
      // but keeping for backwards compatibility
      case path === '/clients/trash' || path === '/api/clients/trash':
      case path === '/leads/trash' || path === '/api/leads/trash':
      case path === '/projects/trash' || path === '/api/projects/trash':
      case /^\/clients\/\d+\/restore$/.test(path):
      case /^\/leads\/\d+\/restore$/.test(path):
      case /^\/projects\/\d+\/restore$/.test(path):
      case /^\/clients\/\d+\/purge$/.test(path):
      case /^\/leads\/\d+\/purge$/.test(path):
      case /^\/projects\/\d+\/purge$/.test(path):
        return {
          ok: true,
          json: async () => ({ message: "Demo mode: Trash operation simulated" })
        };

      default:
        // Return a generic success response for unhandled routes
        return {
          ok: true,
          json: async () => ({ message: `Demo mode: ${method} ${path} simulated` })
        };
    }
  } catch (error) {
    console.error('Demo API error:', error);
    return {
      ok: false,
      status: 500,
      json: async () => ({ error: 'Demo mode API error' })
    };
  }

  // Fallback
  return {
    ok: true,
    json: async () => ({ message: `Demo mode: ${method} ${path} simulated` })
  };
}

// Helper function for JSON parsing
export async function apiFetchJson(path: string, options?: RequestInit) {
  const res = await apiFetch(path, options);
  
  if (!res.ok) {
    const status = 'status' in res ? res.status : 500;
    throw new Error(`HTTP ${status}`);
  }

  if ('json' in res && res.json) {
    return await res.json();
  }
  
  throw new Error('Response does not contain JSON data');
}