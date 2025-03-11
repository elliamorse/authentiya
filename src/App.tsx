
/**
 * This file is the main entry point for the React application, setting up routing,
 * global providers, and the application structure.
 * 
 * It includes routes for:
 * - Index/landing page
 * - Dashboard (student or teacher based on role)
 * - Teacher-specific pages (classes, assignments, student view)
 * - Student-specific pages (assignments, editor, view submitted assignments)
 * 
 * Also configures global providers:
 * - Query client for data fetching
 * - Theme provider for dark/light mode
 * - Toast notifications
 * - Tooltips
 * 
 * Updates:
 * - Fixed student routes for assignments, editor and view pages
 * - Added proper route parameter handling for assignment IDs
 * - Ensured submitted assignments navigate to read-only view component
 * - Enhanced routing structure for better navigation flow
 * - Improved documentation for routing structure
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherAssignments from "./pages/teacher/TeacherAssignments";
import TeacherStudentView from "./pages/teacher/TeacherStudentView";
import StudentAssignments from "./pages/student/StudentAssignments";
import ViewSubmittedAssignment from "./pages/student/ViewSubmittedAssignment";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Teacher routes */}
            <Route path="/teacher" element={<TeacherClasses />} />
            <Route path="/teacher/class/:classId" element={<TeacherAssignments />} />
            <Route path="/teacher/assignment/:assignmentId" element={<TeacherAssignments />} />
            <Route path="/teacher/student/:studentId/assignment/:assignmentId" element={<TeacherStudentView />} />
            
            {/* Student routes */}
            <Route path="/student/assignments" element={<StudentAssignments />} />
            <Route path="/student/editor" element={<Dashboard />} />  {/* Editor without assignment */}
            <Route path="/student/editor/:assignmentId" element={<Dashboard />} />  {/* Editor with specific assignment */}
            <Route path="/student/view" element={<ViewSubmittedAssignment />} /> {/* Read-only view for submitted assignments */}
            <Route path="/assignments" element={<StudentAssignments />} /> {/* Redirect to assignments page */}
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
