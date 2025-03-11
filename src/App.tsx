
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherAssignments from "./pages/teacher/TeacherAssignments";
import TeacherStudentView from "./pages/teacher/TeacherStudentView";
import StudentAssignments from "./pages/student/StudentAssignments";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/teacher" element={<TeacherClasses />} />
              <Route path="/teacher/class/:classId" element={<TeacherAssignments />} />
              <Route path="/teacher/assignment/:assignmentId" element={<TeacherAssignments />} />
              <Route path="/teacher/student/:studentId/assignment/:assignmentId" element={<TeacherStudentView />} />
              <Route path="/student/assignments" element={<StudentAssignments />} />
              <Route path="/assignments" element={<Navigate to="/dashboard" replace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
