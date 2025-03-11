
/**
 * types.ts
 * 
 * This file contains all type definitions and interfaces for the teacher dashboard.
 * These types define the structure of assignments, student assignments, classes,
 * and comments used throughout the application.
 */

export interface StudentAssignment {
  studentId: string;
  assignmentId: string;
  studentName: string;
  status: "not_started" | "in_progress" | "submitted";
  startTime: string | null;
  submissionTime: string | null;
  lastActive: string | null;
  timeSpent: number; // in minutes
  wordCount: number;
  copyPasteCount: number;
  citationCount: number;
  content: string | null;
  comments: Comment[];
}

export interface Assignment {
  id: string;
  title: string;
  className: string;
  dueDate: string;
  totalStudents: number;
  studentsStarted: number;
  studentsSubmitted: number;
  averageTimeSpent: number; // in minutes
  averageWordCount: number;
  createdAt: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  period: string;
  studentCount: number;
  activeAssignmentCount: number;
}

export interface Comment {
  id: string;
  studentId: string;
  assignmentId: string;
  teacherId: string;
  teacherName: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}
