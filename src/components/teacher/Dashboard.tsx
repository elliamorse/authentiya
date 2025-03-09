
import React from "react";
import { getStudentsByAssignment } from "@/lib/teacher-data";
import { AssignmentOverview } from "./dashboard/AssignmentOverview";
import { AssignmentSelector } from "./dashboard/AssignmentSelector";
import { StatisticsCard } from "./dashboard/StatisticsCard";

// Mock data for assignments
const mockAssignments = [
  {
    id: "1",
    title: "Essay on American Literature",
    className: "English 101",
    dueDate: "2023-11-15",
    totalStudents: 28,
    studentsStarted: 22,
    studentsSubmitted: 16,
    averageTimeSpent: 95, // in minutes
    averageWordCount: 850,
    createdAt: "2023-11-01",
  },
  {
    id: "2",
    title: "Physics Problem Set",
    className: "Physics 202",
    dueDate: "2023-11-18",
    totalStudents: 24,
    studentsStarted: 18,
    studentsSubmitted: 10,
    averageTimeSpent: 120, // in minutes
    averageWordCount: 650,
    createdAt: "2023-11-05",
  },
  {
    id: "3",
    title: "History Research Paper",
    className: "History 105",
    dueDate: "2023-11-20",
    totalStudents: 32,
    studentsStarted: 20,
    studentsSubmitted: 8,
    averageTimeSpent: 150, // in minutes
    averageWordCount: 1200,
    createdAt: "2023-11-03",
  },
];

interface TeacherDashboardProps {
  selectedAssignmentId?: string;
  onAssignmentSelect: (assignmentId: string) => void;
}

export default function TeacherDashboard({ 
  selectedAssignmentId = "1",
  onAssignmentSelect 
}: TeacherDashboardProps) {
  const selectedAssignment = mockAssignments.find(a => a.id === selectedAssignmentId) || mockAssignments[0];
  
  // Get students for the selected assignment
  const students = getStudentsByAssignment(selectedAssignmentId);
  
  // Handler for viewing a student
  const handleViewStudent = (studentId: string) => {
    window.location.href = `/teacher/student/${studentId}?assignment=${selectedAssignmentId}`;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor student progress and assignment metrics
          </p>
        </div>
        
        <AssignmentSelector 
          assignments={mockAssignments}
          selectedAssignmentId={selectedAssignmentId}
          onAssignmentSelect={onAssignmentSelect}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <AssignmentOverview assignment={selectedAssignment} />
        <StatisticsCard 
          assignment={selectedAssignment} 
          students={students}
          onViewStudent={handleViewStudent}
        />
      </div>
    </div>
  );
}
