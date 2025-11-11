// Mock data for CRM demo
import { Client, Lead, Project, Interaction } from '../types';

export const DEMO_CLIENTS: Client[] = [
  {
    id: 1,
    name: "Acme Manufacturing Corp",
    contact_person: "John Smith",
    contact_title: "Operations Manager",
    email: "john.smith@acmemanufacturing.com",
    phone: "555-0123",
    phone_label: "work",
    secondary_phone: "555-0124",
    secondary_phone_label: "mobile",
    address: "123 Industrial Blvd",
    assigned_user_id: 2, // Sales Manager
    city: "Houston",
    state: "TX",
    zip: "77001",
    notes: "Large manufacturing client with multiple facilities. Key contact for all oil & gas containment projects.",
    created_at: "2024-01-15T08:30:00Z",
    type: "Oil & Gas",
    accounts: [
      {
        id: 1,
        client_id: 1,
        tenant_id: 1,
        account_number: "ACM-001",
        account_name: "Primary Operations Account",
        status: "Active",
        opened_on: "2024-01-20T10:00:00Z",
        notes: "Main account for ongoing projects"
      }
    ]
  },
  {
    id: 2,
    name: "Riverside Food Processing",
    contact_person: "Sarah Johnson",
    contact_title: "Facility Director",
    email: "sarah.johnson@riverside-food.com",
    phone: "555-0234",
    phone_label: "work",
    address: "456 River Road",
    city: "Austin",
    state: "TX",
    zip: "78701",
    notes: "Food processing plant requiring specialized containment solutions for FDA compliance.",
    created_at: "2024-02-10T14:20:00Z",
    type: "Food and Beverage",
    assigned_user_id: 4, // Support Specialist
    accounts: [
      {
        id: 2,
        client_id: 2,
        tenant_id: 1,
        account_number: "RFP-001",
        account_name: "Food Processing Account",
        status: "Active",
        opened_on: "2024-02-15T09:30:00Z"
      }
    ]
  },
  {
    id: 3,
    name: "Metro Bridge Authority",
    contact_person: "Mike Rodriguez",
    contact_title: "Chief Engineer",
    email: "mike.rodriguez@metrobridge.gov",
    phone: "555-0345",
    phone_label: "work",
    secondary_phone: "555-0346",
    secondary_phone_label: "mobile",
    address: "789 Government Plaza",
    city: "Dallas",
    state: "TX",
    zip: "75201",
    notes: "Municipal client handling bridge infrastructure projects across the metro area.",
    created_at: "2024-01-05T11:45:00Z",
    type: "Bridge",
    assigned_user_id: 1, // Admin User
    accounts: [
      {
        id: 3,
        client_id: 3,
        tenant_id: 1,
        account_number: "MBA-001",
        account_name: "Bridge Projects Account",
        status: "Active",
        opened_on: "2024-01-10T13:15:00Z"
      }
    ]
  },
  {
    id: 4,
    name: "Pipeline Solutions LLC",
    contact_person: "Jennifer Davis",
    contact_title: "Project Manager",
    email: "jennifer.davis@pipelinesolutions.com",
    phone: "555-0456",
    phone_label: "work",
    address: "321 Energy Drive",
    city: "San Antonio",
    state: "TX",
    zip: "78205",
    notes: "Specializes in pipeline containment and secondary containment systems.",
    created_at: "2024-03-01T16:10:00Z",
    type: "Pipe",
    assigned_user_id: 2, // Sales Manager
    accounts: []
  },
  {
    id: 5,
    name: "Texas Tank Storage",
    contact_person: "Robert Wilson",
    contact_title: "Operations Director",
    email: "robert.wilson@texastank.com",
    phone: "555-0567",
    phone_label: "work",
    address: "987 Storage Way",
    city: "Fort Worth",
    state: "TX",
    zip: "76102",
    notes: "Major tank storage facility requiring ongoing maintenance and foam solutions.",
    created_at: "2024-02-20T09:00:00Z",
    type: "Tanks",
    assigned_user_id: 3, // Project Manager
    accounts: [
      {
        id: 4,
        client_id: 5,
        tenant_id: 1,
        account_number: "TTS-001",
        account_name: "Storage Operations",
        status: "Active",
        opened_on: "2024-02-25T14:30:00Z"
      }
    ]
  }
];

export const DEMO_LEADS: Lead[] = [
  {
    id: 1,
    name: "Coastal Refinery Group",
    contact_person: "Amanda Chen",
    contact_title: "Environmental Manager",
    email: "amanda.chen@coastalrefinery.com",
    phone: "555-0678",
    phone_label: "work",
    secondary_phone: "555-0679",
    secondary_phone_label: "mobile",
    address: "555 Coastal Highway",
    city: "Corpus Christi",
    assigned_user_id: 2, // Sales Manager
    state: "TX",
    zip: "78401",
    notes: "Large refinery interested in upgrading their secondary containment systems. Initial meeting went well.",
    created_at: "2024-03-15T10:30:00Z",
    assigned_to: 1,
    assigned_to_name: "Demo User",
    created_by_name: "Demo User",
    lead_status: "open",
    type: "Secondary Containment"
  },
  {
    id: 2,
    name: "Southwest Culvert Company",
    contact_person: "David Thompson",
    contact_title: "President",
    email: "david.thompson@swculvert.com",
    phone: "555-0789",
    phone_label: "work",
    address: "777 Construction Circle",
    city: "El Paso",
    state: "TX",
    zip: "79901",
    notes: "Culvert installation company looking for foam solutions for large infrastructure projects.",
    created_at: "2024-03-20T14:15:00Z",
    assigned_user_id: 3, // Project Manager
    assigned_to: 1,
    assigned_to_name: "Demo User",
    created_by_name: "Demo User",
    lead_status: "open",
    type: "Culvert"
  },
  {
    id: 3,
    name: "Green Valley Foods",
    contact_person: "Lisa Martinez",
    contact_title: "Maintenance Manager",
    email: "lisa.martinez@greenvalleyfoods.com",
    phone: "555-0890",
    phone_label: "work",
    address: "234 Valley Road",
    city: "Lubbock",
    state: "TX",
    zip: "79401",
    notes: "Food processing facility converted from lead after successful pilot project.",
    created_at: "2024-02-05T12:00:00Z",
    assigned_user_id: 2, // Sales Manager
    assigned_to: 1,
    assigned_to_name: "Demo User",
    created_by_name: "Demo User",
    lead_status: "converted",
    converted_on: "2024-03-01T09:30:00Z",
    type: "Food and Beverage"
  },
  {
    id: 4,
    name: "Industrial Equipment Rental",
    contact_person: "Mark Johnson",
    contact_title: "Fleet Manager",
    email: "mark.johnson@ierental.com",
    phone: "555-0901",
    phone_label: "work",
    address: "888 Rental Avenue",
    city: "Amarillo",
    state: "TX",
    zip: "79101",
    notes: "Equipment rental company interested in foam solutions for their tank cleaning services.",
    created_at: "2024-03-25T11:20:00Z",
    assigned_to: 1,
    assigned_to_name: "Demo User",
    created_by_name: "Demo User",
    lead_status: "open",
    type: "Rental"
  }
];

export const DEMO_PROJECTS: Project[] = [
  {
    id: 1,
    project_name: "Acme Manufacturing Secondary Containment Upgrade",
    project_description: "Complete overhaul of secondary containment systems across three facilities including foam installation and testing.",
    project_status: "In Progress",
    project_start: "2024-02-01T00:00:00Z",
    project_end: "2024-06-30T00:00:00Z",
    project_worth: 485000,
    client_id: 1,
    client_name: "Acme Manufacturing Corp",
    type: "Secondary Containment",
    assigned_user_id: 3 // Project Manager
  },
  {
    id: 2,
    project_name: "Riverside Food Processing FDA Compliance",
    project_description: "Installation of food-grade containment systems to meet new FDA requirements.",
    project_status: "Planning",
    project_start: "2024-04-15T00:00:00Z",
    project_end: "2024-08-15T00:00:00Z",
    project_worth: 275000,
    client_id: 2,
    client_name: "Riverside Food Processing",
    type: "Food and Beverage",
    assigned_user_id: 4 // Support Specialist
  },
  {
    id: 3,
    project_name: "Metro Bridge Highway 35 Expansion",
    project_description: "Foam solutions for new bridge construction on Highway 35 expansion project.",
    project_status: "Completed",
    project_start: "2023-09-01T00:00:00Z",
    project_end: "2024-01-31T00:00:00Z",
    project_worth: 650000,
    client_id: 3,
    client_name: "Metro Bridge Authority",
    type: "Bridge",
    assigned_user_id: 1 // Admin User
  },
  {
    id: 4,
    project_name: "Texas Tank Storage Maintenance Contract",
    project_description: "Annual maintenance contract for foam system inspection and replacement.",
    project_status: "In Progress",
    project_start: "2024-01-01T00:00:00Z",
    project_end: "2024-12-31T00:00:00Z",
    project_worth: 125000,
    client_id: 5,
    client_name: "Texas Tank Storage",
    type: "Tanks",
    assigned_user_id: 3 // Project Manager
  },
  {
    id: 5,
    project_name: "Coastal Refinery Pilot Program",
    project_description: "Pilot installation for potential full-scale secondary containment upgrade.",
    project_status: "Planning",
    project_start: "2024-04-01T00:00:00Z",
    project_end: "2024-05-30T00:00:00Z",
    project_worth: 75000,
    lead_id: 1,
    lead_name: "Coastal Refinery Group",
    type: "Secondary Containment",
    assigned_user_id: 2 // Sales Manager
  }
];

export const DEMO_INTERACTIONS: Interaction[] = [
  {
    id: 1,
    contact_date: "2024-03-28T14:30:00Z",
    summary: "Project Status Update Call",
    outcome: "Positive",
    notes: "Discussed progress on secondary containment upgrade. Client is very satisfied with work quality. Scheduled next milestone review for April 15th.",
    follow_up: "2024-04-15T10:00:00Z",
    client_id: 1,
    client_name: "Acme Manufacturing Corp",
    contact_person: "John Smith",
    email: "john.smith@acmemanufacturing.com",
    phone: "555-0123",
    phone_label: "work",
    followup_status: "pending"
  },
  {
    id: 2,
    contact_date: "2024-03-27T11:15:00Z",
    summary: "Site Visit - FDA Compliance Review",
    outcome: "Action Required",
    notes: "Completed site assessment for FDA compliance project. Identified additional requirements for cleanroom-grade foam. Need to revise proposal.",
    follow_up: "2024-04-02T09:00:00Z",
    client_id: 2,
    client_name: "Riverside Food Processing",
    contact_person: "Sarah Johnson",
    email: "sarah.johnson@riverside-food.com",
    phone: "555-0234",
    phone_label: "work",
    followup_status: "pending"
  },
  {
    id: 3,
    contact_date: "2024-03-26T16:00:00Z",
    summary: "Initial Discovery Call",
    outcome: "Qualified",
    notes: "Very promising lead. Large refinery with significant secondary containment needs. Budget confirmed at $2M+ for full upgrade. Sending detailed proposal.",
    follow_up: "2024-04-05T14:00:00Z",
    lead_id: 1,
    lead_name: "Coastal Refinery Group",
    contact_person: "Amanda Chen",
    email: "amanda.chen@coastalrefinery.com",
    phone: "555-0678",
    phone_label: "work",
    followup_status: "pending"
  },
  {
    id: 4,
    contact_date: "2024-03-25T13:45:00Z",
    summary: "Project Completion Review",
    outcome: "Positive",
    notes: "Final walkthrough of Highway 35 bridge project. Client extremely satisfied with results. Discussed potential for future projects on Highway 183.",
    follow_up: null,
    client_id: 3,
    client_name: "Metro Bridge Authority",
    contact_person: "Mike Rodriguez",
    email: "mike.rodriguez@metrobridge.gov",
    phone: "555-0345",
    phone_label: "work",
    followup_status: "completed"
  },
  {
    id: 5,
    contact_date: "2024-03-22T10:30:00Z",
    summary: "Quarterly Maintenance Check",
    outcome: "Positive",
    notes: "Completed quarterly inspection of foam systems. All systems operating within specifications. Recommended minor adjustments to pressure settings.",
    follow_up: "2024-06-22T10:30:00Z",
    client_id: 5,
    client_name: "Texas Tank Storage",
    contact_person: "Robert Wilson",
    email: "robert.wilson@texastank.com",
    phone: "555-0567",
    phone_label: "work",
    followup_status: "pending"
  },
  {
    id: 6,
    contact_date: "2024-03-20T15:20:00Z",
    summary: "Proposal Presentation",
    outcome: "Positive",
    notes: "Presented culvert foam solution proposal. Client impressed with case studies and technical approach. Waiting for board approval - decision expected by month-end.",
    follow_up: "2024-04-03T11:00:00Z",
    lead_id: 2,
    lead_name: "Southwest Culvert Company",
    contact_person: "David Thompson",
    email: "david.thompson@swculvert.com",
    phone: "555-0789",
    phone_label: "work",
    followup_status: "pending"
  },
  {
    id: 7,
    contact_date: "2024-03-18T09:00:00Z",
    summary: "Equipment Rental Partnership Discussion",
    outcome: "Qualified",
    notes: "Discussed potential partnership for foam solutions in tank cleaning services. Good fit for our rental-grade products. Scheduling technical demo.",
    follow_up: "2024-04-01T14:00:00Z",
    lead_id: 4,
    lead_name: "Industrial Equipment Rental",
    contact_person: "Mark Johnson",
    email: "mark.johnson@ierental.com",
    phone: "555-0901",
    phone_label: "work",
    followup_status: "pending"
  }
];

// Mock file data for storage/vault
export const DEMO_FILES = [
  {
    id: 1,
    name: "Acme_Manufacturing_Contract_2024.pdf",
    size: 2458392,
    uploadedBy: "Demo User",
    date: "2024-02-01T10:30:00Z",
    mimetype: "application/pdf"
  },
  {
    id: 2,
    name: "FDA_Compliance_Guidelines.pdf",
    size: 1847362,
    uploadedBy: "Demo User", 
    date: "2024-02-15T14:20:00Z",
    mimetype: "application/pdf"
  },
  {
    id: 3,
    name: "Bridge_Project_Photos.zip",
    size: 15728640,
    uploadedBy: "Demo User",
    date: "2024-01-30T11:45:00Z",
    mimetype: "application/zip"
  },
  {
    id: 4,
    name: "Technical_Specifications_v2.docx", 
    size: 892416,
    uploadedBy: "Demo User",
    date: "2024-03-10T09:15:00Z",
    mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  },
  {
    id: 5,
    name: "Safety_Compliance_Certificate.pdf",
    size: 445231,
    uploadedBy: "Demo User",
    date: "2024-03-01T16:30:00Z", 
    mimetype: "application/pdf"
  }
];

// Mock trash data (deleted items)
export const DEMO_TRASH_CLIENTS = [
  {
    id: 99,
    name: "Deleted Company Example",
    contact_person: "Old Contact",
    email: "deleted@example.com",
    phone: "555-9999",
    phone_label: "work",
    deleted_at: "2024-03-01T10:00:00Z",
    type: "Oil & Gas"
  }
];

export const DEMO_TRASH_LEADS = [
  {
    id: 99,
    name: "Deleted Lead Example", 
    contact_person: "Former Lead",
    email: "oldlead@example.com",
    phone: "555-8888",
    phone_label: "work",
    deleted_at: "2024-03-02T11:00:00Z",
    lead_status: "deleted"
  }
];

export const DEMO_TRASH_PROJECTS = [
  {
    id: 99,
    project_name: "Cancelled Project Example",
    project_description: "This project was cancelled",
    project_status: "Cancelled",
    deleted_at: "2024-03-03T12:00:00Z",
    client_name: "Former Client"
  }
];

// Demo user for authentication
export const DEMO_USER = {
  id: 1,
  email: "demo@allseasonsfoam.com",
  roles: ["admin", "user"]
};

// Comprehensive demo users for admin pages
export const DEMO_USERS = [
  {
    id: 1,
    email: "admin@allseasonsfoam.com",
    roles: ["admin", "user", "file_uploads"],
    created_at: "2024-01-01T08:00:00Z",
    is_active: true,
    name: "Admin User",
    first_name: "Admin",
    last_name: "User"
  },
  {
    id: 2,
    email: "sales@allseasonsfoam.com",
    roles: ["user", "sales"],
    created_at: "2024-01-15T09:30:00Z",
    is_active: true,
    name: "Sales Manager",
    first_name: "Sarah",
    last_name: "Johnson"
  },
  {
    id: 3,
    email: "project@allseasonsfoam.com",
    roles: ["user", "project_manager"],
    created_at: "2024-02-01T10:00:00Z",
    is_active: true,
    name: "Project Manager",
    first_name: "Mike",
    last_name: "Chen"
  },
  {
    id: 4,
    email: "support@allseasonsfoam.com",
    roles: ["user", "support"],
    created_at: "2024-02-15T11:00:00Z",
    is_active: true,
    name: "Support Specialist",
    first_name: "Lisa",
    last_name: "Martinez"
  },
  {
    id: 5,
    email: "inactive@allseasonsfoam.com",
    roles: ["user"],
    created_at: "2024-01-10T12:00:00Z",
    is_active: false,
    name: "Former Employee",
    first_name: "John",
    last_name: "Smith"
  }
];

// Demo contacts data
export const DEMO_CONTACTS = [
  {
    id: 1,
    first_name: "John",
    last_name: "Smith",
    title: "Operations Manager",
    email: "john.smith@acmemanufacturing.com",
    phone: "555-0123",
    phone_label: "work",
    secondary_phone: "555-0124",
    secondary_phone_label: "mobile",
    client_id: 1,
    notes: "Primary contact for all technical discussions."
  },
  {
    id: 2,
    first_name: "Sarah",
    last_name: "Johnson",
    title: "Facility Director",
    email: "sarah.johnson@riverside-food.com",
    phone: "555-0234",
    phone_label: "work",
    client_id: 2,
    notes: "Handles all FDA compliance matters."
  },
  {
    id: 3,
    first_name: "Mike",
    last_name: "Rodriguez",
    title: "Chief Engineer",
    email: "mike.rodriguez@metrobridge.gov",
    phone: "555-0345",
    phone_label: "work",
    secondary_phone: "555-0346",
    secondary_phone_label: "mobile",
    client_id: 3,
    notes: "Technical decision maker for all engineering projects."
  },
  {
    id: 4,
    first_name: "Amanda",
    last_name: "Chen",
    title: "Environmental Manager",
    email: "amanda.chen@coastalrefinery.com",
    phone: "555-0678",
    phone_label: "work",
    secondary_phone: "555-0679",
    secondary_phone_label: "mobile",
    lead_id: 1,
    notes: "Key contact for environmental compliance initiatives."
  },
  {
    id: 5,
    first_name: "David",
    last_name: "Thompson",
    title: "President",
    email: "david.thompson@swculvert.com",
    phone: "555-0789",
    phone_label: "work",
    lead_id: 2,
    notes: "Owner and final decision maker."
  }
];