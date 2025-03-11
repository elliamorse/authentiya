/**
 * This file provides interfaces and mock data for the teacher dashboard functionality.
 * It contains data structures and helper functions for managing assignments, classes,
 * student submissions, and comments in the teacher view.
 * 
 * Key components:
 * - Data interfaces for assignments, students, and classes
 * - Mock data sets for development and demonstration
 * - Helper functions for filtering and retrieving specific data
 * - Utility functions for teacher-student interactions
 */
// Interfaces for teacher data
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

// Mock data for student assignments
export const mockStudentAssignments: StudentAssignment[] = [
  {
    studentId: "1",
    assignmentId: "1",
    studentName: "Emma Johnson",
    status: "submitted",
    startTime: "2023-11-02T14:30:00Z",
    submissionTime: "2023-11-10T16:45:00Z",
    lastActive: "2023-11-10T16:45:00Z",
    timeSpent: 120,
    wordCount: 950,
    copyPasteCount: 3,
    citationCount: 5,
    content: "The evolution of American literature reflects the nation's history and cultural development. From the early colonial period to the modern era, American writers have explored themes of identity, freedom, individualism, and social justice...",
    comments: [
      {
        id: "c1",
        studentId: "1",
        assignmentId: "1",
        teacherId: "t1",
        teacherName: "Dr. Smith",
        text: "Excellent analysis of the historical context. Consider expanding on your comparison between Modernist and Postmodernist approaches.",
        timestamp: "2023-11-11T10:15:00Z",
        resolved: true
      }
    ]
  },
  {
    studentId: "2",
    assignmentId: "1",
    studentName: "James Wilson",
    status: "in_progress",
    startTime: "2023-11-05T09:20:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T15:30:00Z",
    timeSpent: 85,
    wordCount: 620,
    copyPasteCount: 1,
    citationCount: 2,
    content: "American literature has undergone significant transformations throughout history. Beginning with the transcendentalists like Emerson and Thoreau, who emphasized individualism and nature, to the realists like Mark Twain who depicted everyday life...",
    comments: []
  },
  {
    studentId: "3",
    assignmentId: "1",
    studentName: "Michael Chen",
    status: "not_started",
    startTime: null,
    submissionTime: null,
    lastActive: null,
    timeSpent: 0,
    wordCount: 0,
    copyPasteCount: 0,
    citationCount: 0,
    content: null,
    comments: []
  },
  {
    studentId: "4",
    assignmentId: "1",
    studentName: "Sophia Patel",
    status: "in_progress",
    startTime: "2023-11-10T11:45:00Z",
    submissionTime: null,
    lastActive: "2023-11-10T12:15:00Z",
    timeSpent: 30,
    wordCount: 250,
    copyPasteCount: 0,
    citationCount: 1,
    content: "The development of American literature is closely tied to the country's historical events and social movements. This essay will explore how writers like Fitzgerald, Hemingway, and Faulkner captured the disillusionment of the post-WWI era...",
    comments: []
  },
  {
    studentId: "5",
    assignmentId: "2",
    studentName: "Emma Johnson",
    status: "in_progress",
    startTime: "2023-11-08T10:00:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T09:15:00Z",
    timeSpent: 90,
    wordCount: 580,
    copyPasteCount: 0,
    citationCount: 3,
    content: "Newton's laws of motion form the foundation of classical mechanics. This problem set explores various applications of these laws in everyday scenarios...",
    comments: []
  }
];

// Mock assignment data
export const mockAssignments: Assignment[] = [
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

// Mock class data
export const mockClasses: ClassInfo[] = [
  {
    id: "1",
    name: "English 101",
    subject: "English",
    period: "First Period - MWF",
    studentCount: 28,
    activeAssignmentCount: 2
  },
  {
    id: "2",
    name: "Physics 202",
    subject: "Science",
    period: "Second Period - TTh",
    studentCount: 24,
    activeAssignmentCount: 1
  },
  {
    id: "3",
    name: "History 105",
    subject: "History",
    period: "Third Period - MWF",
    studentCount: 32,
    activeAssignmentCount: 3
  },
  {
    id: "4",
    name: "Math 301",
    subject: "Math",
    period: "Fourth Period - MTThF",
    studentCount: 22,
    activeAssignmentCount: 1
  }
];

// Helper function to get students by assignment
export function getStudentsByAssignment(assignmentId: string): StudentAssignment[] {
  return mockStudentAssignments.filter(s => s.assignmentId === assignmentId);
}

// Helper function to get assignments for a class
export function getAssignmentsForClass(classId: string): Assignment[] {
  return mockAssignments.filter(assignment => {
    const matchingClass = mockClasses.find(c => c.id === classId);
    return matchingClass && assignment.className === matchingClass.name;
  });
}

// Helper function to get a specific assignment by ID
export function getAssignmentById(assignmentId: string): Assignment | undefined {
  return mockAssignments.find(assignment => assignment.id === assignmentId);
}

// Helper function to get classes for the teacher
export function getClassesForTeacher(): ClassInfo[] {
  return mockClasses;
}

// Helper function to get student assignments for a specific assignment
export function getStudentAssignments(assignmentId: string): StudentAssignment[] {
  return mockStudentAssignments.filter(sa => sa.assignmentId === assignmentId);
}

// Helper function to get a specific student assignment
export function getStudentAssignment(studentId: string, assignmentId: string): StudentAssignment | undefined {
  return mockStudentAssignments.find(
    sa => sa.studentId === studentId && sa.assignmentId === assignmentId
  );
}

// Helper function to add a comment to a student assignment
export function addCommentToStudentAssignment(
  studentId: string,
  assignmentId: string,
  teacherId: string,
  teacherName: string,
  text: string
): Comment {
  const comment: Comment = {
    id: `c${Date.now()}`,
    studentId,
    assignmentId,
    teacherId,
    teacherName,
    text,
    timestamp: new Date().toISOString(),
    resolved: false
  };
  
  // In a real application, this would update the database
  // For now, we'll just return the new comment
  return comment;
}
