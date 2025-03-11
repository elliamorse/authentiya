
/**
 * Dashboard.tsx
 * 
 * This is the main dashboard page that serves as a wrapper component to render
 * the appropriate dashboard based on the user's role (teacher or student).
 * It handles authentication checks and redirects unauthorized users.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import StudentDashboard from "../components/student/StudentDashboard";
import TeacherDashboardWrapper from "../components/teacher/TeacherDashboardWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";

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
        <Spinner size="lg" />
        <p className="text-lg mt-4">Loading your dashboard...</p>
      </div>
    );
  }
  
  // Don't render anything until authentication is completed
  if (!isAuthenticated || !profile) {
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
