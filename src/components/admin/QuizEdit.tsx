
import { useParams } from 'react-router-dom';

export const QuizEdit = () => {
  const { quizId } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Quiz</h1>
      <p className="text-muted-foreground">
        Editing quiz ID: {quizId}
      </p>
      <p>This would contain the full quiz editor (similar to QuizBuilder but pre-populated with the quiz data).</p>
    </div>
  );
};
