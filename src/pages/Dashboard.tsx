/**
 * Dashboard.tsx
 * 
 * This component renders the main dashboard page, providing an overview of the user's activities and statistics.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * 
 * Preconditions:
 * - None identified.
 * 
 * Acceptable Input:
 * - None directly, as this component does not accept props.
 * 
 * Postconditions:
 * - Renders the main dashboard page with an overview of activities and statistics.
 * 
 * Return Values:
 * - None directly, but renders a page element.
 */


import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import StudentDashboard from "../components/student/StudentDashboard";
import TeacherDashboardWrapper from "../components/teacher/TeacherDashboardWrapper";

const Dashboard = () => {
  // User state
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  
  // Mock authentication function for demo purposes
  useEffect(() => {
    // For demo, let's allow selection of role on first load
    if (!userRole) {
      const role = window.localStorage.getItem("authentiya-role") as "student" | "teacher" | null;
      if (role) {
        setUserRole(role);
        setUserEmail(window.localStorage.getItem("authentiya-email") || "user@example.com");
      } else {
        // If no role is set, ask user to select one for the demo
        showRoleSelection();
      }
    }
  }, []);
  
  const showRoleSelection = () => {
    const selectRole = window.confirm("For demo purposes, would you like to use the student view? Click OK for student, Cancel for teacher.");
    const role = selectRole ? "student" : "teacher";
    const email = role === "student" ? "student@example.com" : "teacher@example.com";
    
    setUserRole(role);
    setUserEmail(email);
    
    // Save to localStorage for future visits
    window.localStorage.setItem("authentiya-role", role);
    window.localStorage.setItem("authentiya-email", email);
  };
  
  const handleLogout = () => {
    const switchRoles = window.confirm("Would you like to switch roles? (OK for yes, Cancel for just logout)");
    
    if (switchRoles) {
      // Switch to the opposite role
      const newRole = userRole === "student" ? "teacher" : "student";
      const newEmail = newRole === "student" ? "student@example.com" : "teacher@example.com";
      
      setUserRole(newRole);
      setUserEmail(newEmail);
      window.localStorage.setItem("authentiya-role", newRole);
      window.localStorage.setItem("authentiya-email", newEmail);
      
      // Reset student-specific state if switching to student
      if (newRole === "student") {
        // Clear linked assignment when switching to student
        window.localStorage.removeItem("linkedAssignment");
      }
    } else {
      // Just logout
      window.localStorage.removeItem("authentiya-role");
      window.localStorage.removeItem("authentiya-email");
      window.localStorage.removeItem("linkedAssignment");
      
      // Redirect to home page
      window.location.href = "/";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header userEmail={userEmail || undefined} userRole={userRole} onLogout={handleLogout} />
      
      {userRole === "student" ? (
        <StudentDashboard 
          userEmail={userEmail} 
          onLogout={handleLogout} 
        />
      ) : (
        <TeacherDashboardWrapper 
          userEmail={userEmail} 
        />
      )}
    </div>
  );
};

export default Dashboard;
