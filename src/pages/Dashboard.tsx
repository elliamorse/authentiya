
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import StudentDashboard from "../components/student/StudentDashboard";
import TeacherDashboardWrapper from "../components/teacher/TeacherDashboardWrapper";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { profile, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to auth if not logged in
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {profile?.role === "student" ? (
        <StudentDashboard />
      ) : (
        <TeacherDashboardWrapper />
      )}
    </div>
  );
};

export default Dashboard;
