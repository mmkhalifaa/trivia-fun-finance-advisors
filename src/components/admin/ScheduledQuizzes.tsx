
import { CalendarClock } from "lucide-react";

export const ScheduledQuizzes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Scheduled Quizzes</h1>
        <p className="text-muted-foreground">Manage your scheduled quizzes</p>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <CalendarClock className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Scheduled Quizzes Management</h3>
        <p className="text-muted-foreground text-center max-w-md mt-2">
          This area will allow you to view and manage all scheduled quizzes in a calendar view.
        </p>
      </div>
    </div>
  );
};
