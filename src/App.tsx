
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherAssignments from "./pages/teacher/TeacherAssignments";
import TeacherStudentView from "./pages/teacher/TeacherStudentView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher" element={<TeacherClasses />} />
          <Route path="/teacher/class/:classId" element={<TeacherAssignments />} />
          <Route path="/teacher/assignment/:assignmentId" element={<TeacherAssignments />} />
          <Route path="/teacher/student/:studentId/assignment/:assignmentId" element={<TeacherStudentView />} />
          <Route path="/assignments" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
