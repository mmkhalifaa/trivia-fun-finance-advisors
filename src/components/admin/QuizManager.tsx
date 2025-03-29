
import { Routes, Route } from 'react-router-dom';
import { QuizList } from './QuizList';
import { QuizBuilder } from './QuizBuilder';
import { QuizEdit } from './QuizEdit';

export const QuizManager = () => {
  return (
    <Routes>
      <Route index element={<QuizList />} />
      <Route path="create" element={<QuizBuilder />} />
      <Route path=":quizId" element={<QuizEdit />} />
    </Routes>
  );
};
