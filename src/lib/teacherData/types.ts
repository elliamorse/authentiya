
/**
 * types.ts
 * 
 * This file contains all type definitions and interfaces for the teacher dashboard.
 * These types define the structure of assignments, student assignments, classes,
 * and comments used throughout the application.
 * 
 * Created by: Authentiya Development Team
 * Created on: 2023-10-15
 * 
 * Revision History:
 * - 2023-12-10: Added comments interface by Authentiya Team
 * - 2024-06-22: Updated status type definition by Authentiya Team
 * - 2024-06-26: Added detailed field documentation by Authentiya Team
 * 
 * Preconditions:
 * - None
 * 
 * Postconditions:
 * - None
 * 
 * Error Conditions:
 * - None
 * 
 * Side Effects:
 * - None
 * 
 * Invariants:
 * - Type definitions must be kept in sync with database schema
 * 
 * Known Faults:
 * - None
 */

export interface StudentAssignment {
  studentId: string;                     // Unique identifier for the student
  assignmentId: string;                  // Unique identifier for the assignment
  studentName: string;                   // Display name of the student
  status: "not_started" | "in_progress" | "submitted";  // Current status of the assignment
  startTime: string | null;              // ISO timestamp when student started the assignment
  submissionTime: string | null;         // ISO timestamp when student submitted the assignment
  lastActive: string | null;             // ISO timestamp of student's last activity
  timeSpent: number;                     // Total time spent in minutes
  wordCount: number;                     // Total word count of student's work
  copyPasteCount: number;                // Number of copy-paste actions performed
  citationCount: number;                 // Number of citations added
  content: string | null;                // The student's actual work/text
  comments: Comment[];                   // Teacher comments on the assignment
}

export interface Assignment {
  id: string;                            // Unique identifier for the assignment
  title: string;                         // Title of the assignment
  className: string;                     // Name of the class the assignment belongs to
  dueDate: string;                       // ISO timestamp of when the assignment is due
  totalStudents: number;                 // Total number of students assigned
  studentsStarted: number;               // Number of students who have started
  studentsSubmitted: number;             // Number of students who have submitted
  averageTimeSpent: number;              // Average time spent in minutes
  averageWordCount: number;              // Average word count across submissions
  createdAt: string;                     // ISO timestamp when assignment was created
}

export interface ClassInfo {
  id: string;                            // Unique identifier for the class
  name: string;                          // Name of the class
  subject: string;                       // Subject area of the class
  period: string;                        // Class period (e.g., "1st", "2nd")
  studentCount: number;                  // Total number of students enrolled
  activeAssignmentCount: number;         // Number of active assignments
}

export interface Comment {
  id: string;                            // Unique identifier for the comment
  studentId: string;                     // Student the comment is for
  assignmentId: string;                  // Assignment the comment is for
  teacherId: string;                     // Teacher who made the comment
  teacherName: string;                   // Display name of the teacher
  text: string;                          // Content of the comment
  timestamp: string;                     // ISO timestamp when comment was created
  resolved: boolean;                     // Whether the comment has been resolved
}
