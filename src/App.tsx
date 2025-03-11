
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import StudentAssignments from "./pages/student/StudentAssignments";
import TeacherAssignments from "./pages/teacher/TeacherAssignments";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherStudentView from "./pages/teacher/TeacherStudentView";
import NotFound from "./pages/NotFound";

import SubmissionView from "./components/student/SubmissionView";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/assignments" element={<StudentAssignments />} />
            <Route path="/student/submission/:docId" element={<SubmissionView />} />
            <Route path="/teacher/assignments" element={<TeacherAssignments />} />
            <Route path="/teacher/classes" element={<TeacherClasses />} />
            <Route path="/teacher/student/:studentId/assignment/:assignmentId" element={<TeacherStudentView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
