
/**
 * App.tsx
 * 
 * Main application component that sets up routing and global providers.
 * Updated to rename Dashboard routes to Editor for consistency.
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Editor from "./pages/Dashboard"; // File still named Dashboard.tsx but component is Editor
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherAssignments from "./pages/teacher/TeacherAssignments";
import TeacherStudentView from "./pages/teacher/TeacherStudentView";
import StudentAssignments from "./pages/student/StudentAssignments";
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
            <Route path="/editor" element={<Editor />} />
            <Route path="/teacher" element={<TeacherClasses />} />
            <Route path="/teacher/class/:classId" element={<TeacherAssignments />} />
            <Route path="/teacher/assignment/:assignmentId" element={<TeacherAssignments />} />
            <Route path="/teacher/student/:studentId/assignment/:assignmentId" element={<TeacherStudentView />} />
            <Route path="/student/assignments" element={<StudentAssignments />} />
            <Route path="/assignments" element={<Editor />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
