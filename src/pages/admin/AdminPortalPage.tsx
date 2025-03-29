
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { QuizManager } from '@/components/admin/QuizManager';
import { ScheduledQuizzes } from '@/components/admin/ScheduledQuizzes';
import { QuizReports } from '@/components/admin/QuizReports';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { withAdminAuth } from '@/context/AuthContext';

const AdminPortalPage = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="quizzes/*" element={<QuizManager />} />
        <Route path="scheduled" element={<ScheduledQuizzes />} />
        <Route path="reports" element={<QuizReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

// Protect all admin pages with the admin auth check
export default withAdminAuth(AdminPortalPage);
