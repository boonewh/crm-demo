import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

// Static demo data for trash page - no API calls needed
const DEMO_DELETED_CLIENTS = [
  {
    id: 99,
    name: "Deleted Company Example",
    contact_person: "Old Contact",
    email: "deleted@example.com",
    phone: "555-9999",
    deleted_at: "2024-03-01T10:00:00Z",
    type: "Oil & Gas"
  }
];

const DEMO_DELETED_LEADS = [
  {
    id: 99,
    name: "Deleted Lead Example", 
    contact_person: "Former Lead",
    email: "oldlead@example.com",
    phone: "555-8888",
    deleted_at: "2024-03-02T11:00:00Z",
    lead_status: "deleted"
  }
];

const DEMO_DELETED_PROJECTS = [
  {
    id: 99,
    project_name: "Cancelled Project Example",
    project_description: "This project was cancelled",
    project_status: "Cancelled",
    deleted_at: "2024-03-03T12:00:00Z",
    client_name: "Former Client"
  }
];

export default function TrashPage() {
  const [selectedTab, setSelectedTab] = useState<"clients" | "leads" | "projects">("clients");

  const handleDemoAction = (action: string, itemName: string) => {
    alert(`Demo Mode: ${action} of "${itemName}" simulated. In the real CRM, this would ${action.toLowerCase()} the item.`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Trash / Deleted Items</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
        <div className="flex items-center">
          <span className="text-yellow-800 text-sm">
            <strong>Demo Notice:</strong> This page shows what deleted items would look like. 
            All restore and delete operations are simulated in this demo.
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab("clients")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "clients"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Accounts ({DEMO_DELETED_CLIENTS.length})
          </button>
          <button
            onClick={() => setSelectedTab("leads")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "leads"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Leads ({DEMO_DELETED_LEADS.length})
          </button>
          <button
            onClick={() => setSelectedTab("projects")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "projects"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Projects ({DEMO_DELETED_PROJECTS.length})
          </button>
        </nav>
      </div>

      {/* Clients Tab */}
      {selectedTab === "clients" && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Deleted Accounts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deleted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {DEMO_DELETED_CLIENTS.map((client) => (
                  <tr key={client.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.contact_person}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(new Date(client.deleted_at), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button size="sm" onClick={() => handleDemoAction("Restore", client.name)}>
                        Restore
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDemoAction("Permanent Delete", client.name)}>
                        Delete Forever
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leads Tab */}
      {selectedTab === "leads" && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Deleted Leads</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deleted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {DEMO_DELETED_LEADS.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.contact_person}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(new Date(lead.deleted_at), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button size="sm" onClick={() => handleDemoAction("Restore", lead.name)}>
                        Restore
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDemoAction("Permanent Delete", lead.name)}>
                        Delete Forever
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {selectedTab === "projects" && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Deleted Projects</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deleted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {DEMO_DELETED_PROJECTS.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.project_name}</div>
                      <div className="text-sm text-gray-500">{project.project_description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.client_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(new Date(project.deleted_at), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button size="sm" onClick={() => handleDemoAction("Restore", project.project_name)}>
                        Restore
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDemoAction("Permanent Delete", project.project_name)}>
                        Delete Forever
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}