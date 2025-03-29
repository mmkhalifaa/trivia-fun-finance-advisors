
import { Settings } from "lucide-react";

export const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">Configure admin preferences and user roles</p>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <Settings className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Settings & Configuration</h3>
        <p className="text-muted-foreground text-center max-w-md mt-2">
          This area will allow you to manage user roles, system preferences, and other administrative settings.
        </p>
      </div>
    </div>
  );
};
