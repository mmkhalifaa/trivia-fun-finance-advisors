
import { BarChart2 } from "lucide-react";

export const QuizReports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quiz Reports</h1>
        <p className="text-muted-foreground">Analyze quiz performance and results</p>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <BarChart2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Quiz Analytics & Reports</h3>
        <p className="text-muted-foreground text-center max-w-md mt-2">
          This section will provide detailed analytics and performance metrics for all completed quizzes.
        </p>
      </div>
    </div>
  );
};
