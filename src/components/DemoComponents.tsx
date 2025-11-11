import { AlertTriangle } from "lucide-react";

// This is a demo-only build, always show demo banner
export function DemoBanner() {
  return (
    <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2">
      <div className="flex items-center justify-center text-yellow-800">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">
          🚀 Demo Mode: You're viewing a read-only demonstration of All Seasons Foam CRM. 
          Data is simulated and changes won't be saved.
        </span>
      </div>
    </div>
  );
}

export function DemoNotice({ action }: { action: string }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 my-4">
      <div className="flex items-center">
        <AlertTriangle className="h-4 w-4 text-blue-600 mr-2" />
        <span className="text-sm text-blue-800">
          <strong>Demo Notice:</strong> {action} is simulated in this demo. 
          In the full application, this would {action.toLowerCase()} real data.
        </span>
      </div>
    </div>
  );
}

// Always demo mode in this build
export const IS_DEMO_MODE = true;