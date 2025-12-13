// Mock Report Service for Demo - Returns spoofed data instead of making API calls

export interface PipelineData {
  status: string;
  count: number;
  percentage: number;
}

export interface LeadSourceData {
  source: string;
  count: number;
  conversion_rate: number;
}

export interface ConversionRateData {
  period: string;
  converted: number;
  total: number;
  rate: number;
}

export interface RevenueByClientData {
  client_name: string;
  total_revenue: number;
  project_count: number;
}

export interface UserActivityData {
  user_email: string;
  leads_created: number;
  clients_created: number;
  interactions_logged: number;
}

export interface FollowUpData {
  id: number;
  title: string;
  due_date: string;
  assigned_to: string;
  priority: string;
  entity_type: string;
  entity_name: string;
}

export interface ClientRetentionData {
  cohort: string;
  retained_clients: number;
  total_clients: number;
  retention_rate: number;
}

export interface ProjectPerformanceData {
  project_name: string;
  status: string;
  completion_percentage: number;
  days_remaining: number;
  budget_used: number;
}

export interface UpcomingTaskData {
  id: number;
  title: string;
  due_date: string;
  assigned_to: string;
  entity_type: string;
  entity_name: string;
}

export interface RevenueForecastData {
  month: string;
  projected_revenue: number;
  confidence: string;
}

export interface ReportFilters {
  start_date?: string;
  end_date?: string;
  user_id?: number;
  status?: string;
  limit?: number;
}

// Mock data generators
const mockPipelineData: PipelineData[] = [
  { status: "new", count: 24, percentage: 22.2 },
  { status: "contacted", count: 18, percentage: 16.7 },
  { status: "qualified", count: 31, percentage: 28.7 },
  { status: "converted", count: 28, percentage: 25.9 },
  { status: "lost", count: 7, percentage: 6.5 },
];

const mockLeadSourceData: LeadSourceData[] = [
  { source: "Website", count: 45, conversion_rate: 32.5 },
  { source: "Referral", count: 28, conversion_rate: 45.2 },
  { source: "Cold Call", count: 15, conversion_rate: 18.3 },
  { source: "Email Campaign", count: 22, conversion_rate: 28.7 },
  { source: "Social Media", count: 18, conversion_rate: 22.4 },
];

const mockConversionRateData: ConversionRateData[] = [
  { period: "Jan", converted: 12, total: 45, rate: 26.7 },
  { period: "Feb", converted: 15, total: 52, rate: 28.8 },
  { period: "Mar", converted: 18, total: 48, rate: 37.5 },
  { period: "Apr", converted: 14, total: 55, rate: 25.5 },
  { period: "May", converted: 22, total: 61, rate: 36.1 },
  { period: "Jun", converted: 19, total: 58, rate: 32.8 },
];

const mockRevenueByClientData: RevenueByClientData[] = [
  { client_name: "Acme Corporation", total_revenue: 125000, project_count: 5 },
  { client_name: "TechStart Inc", total_revenue: 98000, project_count: 3 },
  { client_name: "Global Solutions", total_revenue: 87500, project_count: 4 },
  { client_name: "Innovate LLC", total_revenue: 76000, project_count: 2 },
  { client_name: "Digital Ventures", total_revenue: 65000, project_count: 3 },
  { client_name: "Enterprise Co", total_revenue: 54000, project_count: 2 },
  { client_name: "Smart Systems", total_revenue: 48000, project_count: 3 },
  { client_name: "Future Tech", total_revenue: 42000, project_count: 2 },
  { client_name: "Cloud Nine", total_revenue: 38000, project_count: 1 },
  { client_name: "NextGen Labs", total_revenue: 32000, project_count: 2 },
];

const mockRevenueForecastData: RevenueForecastData[] = [
  { month: "Jul", projected_revenue: 145000, confidence: "high" },
  { month: "Aug", projected_revenue: 158000, confidence: "high" },
  { month: "Sep", projected_revenue: 162000, confidence: "medium" },
  { month: "Oct", projected_revenue: 175000, confidence: "medium" },
  { month: "Nov", projected_revenue: 188000, confidence: "low" },
  { month: "Dec", projected_revenue: 195000, confidence: "low" },
];

const mockUserActivityData: UserActivityData[] = [
  { user_email: "john@example.com", leads_created: 24, clients_created: 8, interactions_logged: 142 },
  { user_email: "sarah@example.com", leads_created: 31, clients_created: 12, interactions_logged: 178 },
  { user_email: "mike@example.com", leads_created: 18, clients_created: 6, interactions_logged: 95 },
  { user_email: "emma@example.com", leads_created: 22, clients_created: 9, interactions_logged: 124 },
];

const mockFollowUpData: FollowUpData[] = [
  {
    id: 1,
    title: "Follow up on proposal",
    due_date: "2025-12-20",
    assigned_to: "john@example.com",
    priority: "high",
    entity_type: "Lead",
    entity_name: "Acme Corp - Website Redesign"
  },
  {
    id: 2,
    title: "Schedule demo call",
    due_date: "2025-12-18",
    assigned_to: "sarah@example.com",
    priority: "medium",
    entity_type: "Lead",
    entity_name: "TechStart - CRM Implementation"
  },
  {
    id: 3,
    title: "Send contract for review",
    due_date: "2025-12-22",
    assigned_to: "mike@example.com",
    priority: "high",
    entity_type: "Client",
    entity_name: "Global Solutions"
  },
  {
    id: 4,
    title: "Quarterly business review",
    due_date: "2025-12-25",
    assigned_to: "emma@example.com",
    priority: "medium",
    entity_type: "Client",
    entity_name: "Innovate LLC"
  },
  {
    id: 5,
    title: "Product training session",
    due_date: "2025-12-28",
    assigned_to: "john@example.com",
    priority: "low",
    entity_type: "Client",
    entity_name: "Digital Ventures"
  },
];

class ReportService {
  // Simulate API delay for realistic feel
  private async delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getPipeline(_filters?: ReportFilters): Promise<PipelineData[]> {
    await this.delay();
    return mockPipelineData;
  }

  async getLeadSource(_filters?: ReportFilters): Promise<LeadSourceData[]> {
    await this.delay();
    return mockLeadSourceData;
  }

  async getConversionRate(_filters?: ReportFilters): Promise<ConversionRateData[]> {
    await this.delay();
    return mockConversionRateData;
  }

  async getRevenueByClient(filters?: ReportFilters): Promise<RevenueByClientData[]> {
    await this.delay();
    const limit = filters?.limit || mockRevenueByClientData.length;
    return mockRevenueByClientData.slice(0, limit);
  }

  async getUserActivity(_filters?: ReportFilters): Promise<UserActivityData[]> {
    await this.delay();
    return mockUserActivityData;
  }

  async getFollowUps(filters?: ReportFilters): Promise<FollowUpData[]> {
    await this.delay();
    const limit = filters?.limit || mockFollowUpData.length;
    return mockFollowUpData.slice(0, limit);
  }

  async getClientRetention(_filters?: ReportFilters): Promise<ClientRetentionData[]> {
    await this.delay();
    return [];
  }

  async getProjectPerformance(_filters?: ReportFilters): Promise<ProjectPerformanceData[]> {
    await this.delay();
    return [];
  }

  async getUpcomingTasks(_filters?: ReportFilters): Promise<UpcomingTaskData[]> {
    await this.delay();
    return [];
  }

  async getRevenueForecast(_filters?: ReportFilters): Promise<RevenueForecastData[]> {
    await this.delay();
    return mockRevenueForecastData;
  }
}

export const reportService = new ReportService();
