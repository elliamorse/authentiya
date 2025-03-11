
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
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  
  // Don't render anything until authentication is completed
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {profile?.role === "teacher" ? (
        <TeacherDashboardWrapper />
      ) : (
        <StudentDashboard />
      )}
    </div>
  );
};

export default Dashboard;
