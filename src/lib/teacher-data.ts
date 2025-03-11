
/**
 * This file provides mock data for teacher views including student assignments,
 * class information, and statistics for visualizations.
 * 
 * Features:
 * - Realistic student data for assignments
 * - Various assignment statuses (not started, in progress, submitted)
 * - Detailed metrics on student work (time spent, word count, activity)
 * - Sample comments and feedback
 * 
 * Updates:
 * - Added proper type definitions for exports
 * - Fixed property name mismatches (startedDate → startTime, etc.)
 * - Added missing function implementations
 * - Added comments field to StudentAssignment interface
 * - Implemented getClassesForTeacher and getStudentAssignments functions
 * - Fixed field naming for consistency (copyPasteInstances → copyPasteCount)
 */
export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string; 
}

export interface StudentAssignment {
  id: string;
  studentId: string;
  studentName: string;  // Added studentName field
  assignmentId: string;
  status: "not_started" | "in_progress" | "submitted" | "graded";
  startTime: string | null;  // Changed from startedDate
  submissionTime: string | null;  // Changed from submittedDate
  timeSpent: number; // minutes
  wordCount: number;
  copyPasteCount: number;  // Changed from copyPasteInstances
  citationCount: number;
  grade?: string;
  content?: string;
  lastActive?: string | null;
  comments: Comment[];  // Added comments array
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
  studentAssignmentId: string;
  teacherId: string;
  teacherName: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}

// Sample students
const students: Student[] = [
  { id: "s1", name: "Emma Johnson", email: "emma.j@example.edu" },
  { id: "s2", name: "Aiden Smith", email: "aiden.s@example.edu" },
  { id: "s3", name: "Olivia Chen", email: "olivia.c@example.edu" },
  { id: "s4", name: "Noah Rodriguez", email: "noah.r@example.edu" },
  { id: "s5", name: "Sophia Williams", email: "sophia.w@example.edu" },
  { id: "s6", name: "Lucas Brown", email: "lucas.b@example.edu" },
  { id: "s7", name: "Isabella Garcia", email: "isabella.g@example.edu" },
  { id: "s8", name: "Jackson Lee", email: "jackson.l@example.edu" },
  { id: "s9", name: "Mia Wilson", email: "mia.w@example.edu" },
  { id: "s10", name: "Ethan Davis", email: "ethan.d@example.edu" },
  { id: "s11", name: "Abigail Martinez", email: "abigail.m@example.edu" },
  { id: "s12", name: "James Taylor", email: "james.t@example.edu" },
  { id: "s13", name: "Charlotte Thomas", email: "charlotte.t@example.edu" },
  { id: "s14", name: "Benjamin Patel", email: "benjamin.p@example.edu" },
  { id: "s15", name: "Amelia Kim", email: "amelia.k@example.edu" },
];

// Generate an array of student assignments based on an assignment ID
const generateStudentAssignments = (assignmentId: string): StudentAssignment[] => {
  switch(assignmentId) {
    case "1": // Essay on American Literature
      return [
        {
          id: "sa1-1",
          studentId: "s1",
          studentName: "Emma Johnson",
          assignmentId: "1",
          status: "submitted",
          startTime: "2023-11-03T10:15:00Z",
          submissionTime: "2023-11-10T16:30:00Z",
          timeSpent: 105,
          wordCount: 925,
          copyPasteCount: 2,
          citationCount: 3,
          grade: "A-",
          lastActive: "2023-11-10T16:30:00Z",
          content: "American literature is characterized by the exploration of themes such as individualism, freedom, and the American Dream...",
          comments: [
            {
              id: "c1",
              studentAssignmentId: "sa1-1",
              teacherId: "t1",
              teacherName: "Dr. Smith",
              text: "Good analysis of Fitzgerald's critique of the American Dream. Consider expanding on the symbolism of the green light.",
              timestamp: "2023-11-11T10:15:00Z",
              resolved: false
            }
          ]
        },
        {
          id: "sa1-2",
          studentId: "s2",
          studentName: "Aiden Smith",
          assignmentId: "1",
          status: "in_progress",
          startTime: "2023-11-04T09:20:00Z",
          submissionTime: null,
          timeSpent: 80,
          wordCount: 650,
          copyPasteCount: 1,
          citationCount: 1,
          lastActive: "2023-11-09T14:15:00Z",
          content: "The evolution of American literature reflects the nation's development, from colonial writings to contemporary works...",
          comments: []
        },
        {
          id: "sa1-3",
          studentId: "s3",
          studentName: "Olivia Chen",
          assignmentId: "1",
          status: "submitted",
          startTime: "2023-11-02T13:45:00Z",
          submissionTime: "2023-11-08T11:30:00Z",
          timeSpent: 115,
          wordCount: 980,
          copyPasteCount: 0,
          citationCount: 4,
          grade: "A",
          lastActive: "2023-11-08T11:30:00Z",
          content: "From the transcendentalist writings of Emerson and Thoreau to the modernist works of Hemingway and Fitzgerald...",
          comments: []
        },
        {
          id: "sa1-4",
          studentId: "s4",
          studentName: "Noah Rodriguez",
          assignmentId: "1",
          status: "not_started",
          startTime: null,
          submissionTime: null,
          timeSpent: 0,
          wordCount: 0,
          copyPasteCount: 0,
          citationCount: 0,
          lastActive: null,
          content: "",
          comments: []
        },
        {
          id: "sa1-5",
          studentId: "s5",
          studentName: "Sophia Williams",
          assignmentId: "1",
          status: "in_progress",
          startTime: "2023-11-06T10:10:00Z",
          submissionTime: null,
          timeSpent: 75,
          wordCount: 610,
          copyPasteCount: 3,
          citationCount: 2,
          lastActive: "2023-11-10T09:45:00Z",
          content: "The Great Gatsby by F. Scott Fitzgerald exemplifies the Jazz Age and critiques the hollow pursuit of wealth...",
          comments: []
        },
        {
          id: "sa1-6",
          studentId: "s6",
          studentName: "Lucas Brown",
          assignmentId: "1",
          status: "submitted",
          startTime: "2023-11-03T08:30:00Z",
          submissionTime: "2023-11-09T15:20:00Z",
          timeSpent: 95,
          wordCount: 870,
          copyPasteCount: 1,
          citationCount: 3,
          grade: "B+",
          lastActive: "2023-11-09T15:20:00Z",
          content: "The diversity of American literature can be traced through regional influences, from Southern Gothic to New England transcendentalism...",
          comments: []
        },
        // Add more sample students to match the assignment's totalStudents count
      ];
      
    case "2": // Physics Problem Set
      return [
        {
          id: "sa2-1",
          studentId: "s7",
          studentName: "Isabella Garcia",
          assignmentId: "2",
          status: "submitted",
          startTime: "2023-11-08T11:30:00Z",
          submissionTime: "2023-11-12T14:45:00Z",
          timeSpent: 130,
          wordCount: 720,
          copyPasteCount: 0,
          citationCount: 2,
          grade: "A",
          lastActive: "2023-11-12T14:45:00Z",
          content: "Problem 1: Using Newton's second law, F = ma, we can determine that the force is constant at 12N...",
          comments: [
            {
              id: "c2",
              studentAssignmentId: "sa2-1",
              teacherId: "t2",
              teacherName: "Prof. Johnson",
              text: "Excellent work on problem 1. Your force calculation is correct and well-explained.",
              timestamp: "2023-11-13T09:30:00Z",
              resolved: true
            }
          ]
        },
        {
          id: "sa2-2",
          studentId: "s8",
          studentName: "Jackson Lee",
          assignmentId: "2",
          status: "in_progress",
          startTime: "2023-11-09T09:15:00Z",
          submissionTime: null,
          timeSpent: 85,
          wordCount: 480,
          copyPasteCount: 1,
          citationCount: 1,
          lastActive: "2023-11-11T16:20:00Z",
          content: "For the orbital motion problem, we need to use the formula for gravitational force and equate it to the centripetal force...",
          comments: []
        },
        {
          id: "sa2-3",
          studentId: "s9",
          studentName: "Mia Wilson",
          assignmentId: "2",
          status: "not_started",
          startTime: null,
          submissionTime: null,
          timeSpent: 0,
          wordCount: 0,
          copyPasteCount: 0,
          citationCount: 0,
          lastActive: null,
          content: "",
          comments: []
        },
        {
          id: "sa2-4",
          studentId: "s10",
          studentName: "Ethan Davis",
          assignmentId: "2",
          status: "in_progress",
          startTime: "2023-11-10T13:40:00Z",
          submissionTime: null,
          timeSpent: 60,
          wordCount: 350,
          copyPasteCount: 0,
          citationCount: 0,
          lastActive: "2023-11-12T10:15:00Z",
          content: "The relationship between acceleration and position can be derived by taking the second derivative of the position function...",
          comments: []
        },
        {
          id: "sa2-5",
          studentId: "s11",
          studentName: "Abigail Martinez",
          assignmentId: "2",
          status: "submitted",
          startTime: "2023-11-08T14:20:00Z",
          submissionTime: "2023-11-13T11:10:00Z",
          timeSpent: 125,
          wordCount: 680,
          copyPasteCount: 1,
          citationCount: 3,
          grade: "B+",
          lastActive: "2023-11-13T11:10:00Z",
          content: "For circular motion problems, we need to use the formula F = mv²/r which represents the centripetal force...",
          comments: []
        },
        // Add more sample students to match the assignment's totalStudents count
      ];
      
    case "3": // History Research Paper
      return [
        {
          id: "sa3-1",
          studentId: "s12",
          studentName: "James Taylor",
          assignmentId: "3",
          status: "in_progress",
          startTime: "2023-11-05T10:30:00Z",
          submissionTime: null,
          timeSpent: 160,
          wordCount: 950,
          copyPasteCount: 2,
          citationCount: 4,
          lastActive: "2023-11-12T15:40:00Z",
          content: "The causes of World War I were complex and interconnected, including militarism, alliances, imperialism, and nationalism...",
          comments: []
        },
        {
          id: "sa3-2",
          studentId: "s13",
          studentName: "Charlotte Thomas",
          assignmentId: "3",
          status: "not_started",
          startTime: null,
          submissionTime: null,
          timeSpent: 0,
          wordCount: 0,
          copyPasteCount: 0,
          citationCount: 0,
          lastActive: null,
          content: "",
          comments: []
        },
        {
          id: "sa3-3",
          studentId: "s14",
          studentName: "Benjamin Patel",
          assignmentId: "3",
          status: "in_progress",
          startTime: "2023-11-07T14:15:00Z",
          submissionTime: null,
          timeSpent: 140,
          wordCount: 870,
          copyPasteCount: 3,
          citationCount: 5,
          lastActive: "2023-11-11T16:30:00Z",
          content: "The historical significance of the Treaty of Versailles cannot be overstated, as it laid the groundwork for future conflicts...",
          comments: []
        },
        {
          id: "sa3-4",
          studentId: "s15",
          studentName: "Amelia Kim",
          assignmentId: "3",
          status: "submitted",
          startTime: "2023-11-04T09:45:00Z",
          submissionTime: "2023-11-12T13:20:00Z",
          timeSpent: 195,
          wordCount: 1450,
          copyPasteCount: 1,
          citationCount: 8,
          grade: "A-",
          lastActive: "2023-11-12T13:20:00Z",
          content: "This paper examines the social and economic impacts of the Industrial Revolution across different regions of Europe...",
          comments: []
        },
        {
          id: "sa3-5",
          studentId: "s1",
          studentName: "Emma Johnson",
          assignmentId: "3",
          status: "in_progress",
          startTime: "2023-11-06T11:10:00Z",
          submissionTime: null,
          timeSpent: 130,
          wordCount: 780,
          copyPasteCount: 2,
          citationCount: 3,
          lastActive: "2023-11-10T14:25:00Z",
          content: "The Cold War period represented a fundamental shift in global politics, with two superpowers competing for influence...",
          comments: []
        },
        // Add more sample students to match the assignment's totalStudents count
      ];
      
    case "4": // Computer Networks Essay
      return [
        {
          id: "sa4-1",
          studentId: "s2",
          studentName: "Aiden Smith",
          assignmentId: "4",
          status: "submitted",
          startTime: "2023-09-25T09:15:00Z",
          submissionTime: "2023-10-03T14:30:00Z",
          timeSpent: 175,
          wordCount: 1580,
          copyPasteCount: 1,
          citationCount: 6,
          grade: "A",
          lastActive: "2023-10-03T14:30:00Z",
          content: "The evolution of computer networks from ARPANET to modern internet architecture demonstrates significant advances in technology...",
          comments: []
        },
        {
          id: "sa4-2",
          studentId: "s3",
          studentName: "Olivia Chen",
          assignmentId: "4",
          status: "submitted",
          startTime: "2023-09-26T10:20:00Z",
          submissionTime: "2023-10-04T15:45:00Z",
          timeSpent: 190,
          wordCount: 1720,
          copyPasteCount: 0,
          citationCount: 7,
          grade: "A+",
          lastActive: "2023-10-04T15:45:00Z",
          content: "Network protocols like TCP/IP form the backbone of internet communication, providing reliable data transmission across diverse networks...",
          comments: []
        },
        {
          id: "sa4-3",
          studentId: "s4",
          studentName: "Noah Rodriguez",
          assignmentId: "4",
          status: "submitted",
          startTime: "2023-09-24T13:40:00Z",
          submissionTime: "2023-10-02T11:25:00Z",
          timeSpent: 165,
          wordCount: 1490,
          copyPasteCount: 2,
          citationCount: 5,
          grade: "B+",
          lastActive: "2023-10-02T11:25:00Z",
          content: "The OSI model provides a conceptual framework for understanding network communication through seven distinct layers...",
          comments: []
        },
        // Add more sample students to match the assignment's totalStudents count
      ];
      
    case "5": // Literary Criticism Review
      return [
        {
          id: "sa5-1",
          studentId: "s5",
          studentName: "Sophia Williams",
          assignmentId: "5",
          status: "submitted",
          startTime: "2023-10-12T10:30:00Z",
          submissionTime: "2023-10-22T15:40:00Z",
          timeSpent: 180,
          wordCount: 1250,
          copyPasteCount: 1,
          citationCount: 6,
          grade: "A-",
          lastActive: "2023-10-22T15:40:00Z",
          content: "Feminist literary criticism examines texts through the lens of gender dynamics and power relationships...",
          comments: []
        },
        {
          id: "sa5-2",
          studentId: "s6",
          studentName: "Lucas Brown",
          assignmentId: "5",
          status: "submitted",
          startTime: "2023-10-13T09:15:00Z",
          submissionTime: "2023-10-21T14:20:00Z",
          timeSpent: 165,
          wordCount: 1180,
          copyPasteCount: 0,
          citationCount: 5,
          grade: "A",
          lastActive: "2023-10-21T14:20:00Z",
          content: "Formalist criticism focuses on the intrinsic elements of a text, examining structure, style, and literary devices...",
          comments: []
        },
        {
          id: "sa5-3",
          studentId: "s7",
          studentName: "Isabella Garcia",
          assignmentId: "5",
          status: "submitted",
          startTime: "2023-10-14T11:45:00Z",
          submissionTime: "2023-10-23T16:30:00Z",
          timeSpent: 175,
          wordCount: 1210,
          copyPasteCount: 1,
          citationCount: 4,
          grade: "B+",
          lastActive: "2023-10-23T16:30:00Z",
          content: "Postcolonial criticism analyzes literature through the lens of power dynamics between colonizers and the colonized...",
          comments: []
        },
        // Add more sample students to match the assignment's totalStudents count
      ];
      
    default:
      return [];
  }
};

// Function to get all students by assignment
export const getStudentsByAssignment = (assignmentId: string): StudentAssignment[] => {
  return generateStudentAssignments(assignmentId);
};

// Function to get students for an assignment (alias for getStudentsByAssignment for consistency)
export const getStudentAssignments = (assignmentId: string): StudentAssignment[] => {
  return getStudentsByAssignment(assignmentId);
};

// Function to get a specific assignment by ID
export const getAssignmentById = (assignmentId: string): Assignment | undefined => {
  // Mock assignments
  const assignments = [
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
    {
      id: "4",
      title: "Computer Networks Essay",
      className: "Computer Science 301",
      dueDate: "2023-10-05", 
      totalStudents: 26,
      studentsStarted: 26,
      studentsSubmitted: 25,
      averageTimeSpent: 180, // in minutes
      averageWordCount: 1650,
      createdAt: "2023-09-20",
    },
    {
      id: "5",
      title: "Literary Criticism Review",
      className: "English 101",
      dueDate: "2023-10-25",
      totalStudents: 28,
      studentsStarted: 28,
      studentsSubmitted: 27,
      averageTimeSpent: 175, // in minutes
      averageWordCount: 1150,
      createdAt: "2023-10-10",
    }
  ];
  
  return assignments.find(a => a.id === assignmentId);
};

// Function to get assignments for a specific class
export const getAssignmentsForClass = (classId: string | undefined): Assignment[] => {
  if (!classId) return [];
  
  // Mock class assignments
  const classAssignments: Record<string, Assignment[]> = {
    "c1": [
      {
        id: "1",
        title: "Essay on American Literature",
        className: "English 101",
        dueDate: "2023-11-15",
        totalStudents: 28,
        studentsStarted: 22,
        studentsSubmitted: 16,
        averageTimeSpent: 95,
        averageWordCount: 850,
        createdAt: "2023-11-01",
      },
      {
        id: "5",
        title: "Literary Criticism Review",
        className: "English 101",
        dueDate: "2023-10-25",
        totalStudents: 28,
        studentsStarted: 28,
        studentsSubmitted: 27,
        averageTimeSpent: 175,
        averageWordCount: 1150,
        createdAt: "2023-10-10",
      },
      {
        id: "6",
        title: "Poetry Analysis",
        className: "English 101",
        dueDate: "2023-12-05",
        totalStudents: 28,
        studentsStarted: 5,
        studentsSubmitted: 0,
        averageTimeSpent: 30,
        averageWordCount: 250,
        createdAt: "2023-11-20",
      }
    ],
    "c2": [
      {
        id: "2",
        title: "Physics Problem Set",
        className: "Physics 202",
        dueDate: "2023-11-18",
        totalStudents: 24,
        studentsStarted: 18,
        studentsSubmitted: 10,
        averageTimeSpent: 120,
        averageWordCount: 650,
        createdAt: "2023-11-05",
      },
      {
        id: "7",
        title: "Lab Report: Pendulum Motion",
        className: "Physics 202",
        dueDate: "2023-10-10",
        totalStudents: 24,
        studentsStarted: 24,
        studentsSubmitted: 23,
        averageTimeSpent: 195,
        averageWordCount: 1480,
        createdAt: "2023-09-25",
      }
    ],
    "c3": [
      {
        id: "3",
        title: "History Research Paper",
        className: "History 105",
        dueDate: "2023-11-20",
        totalStudents: 32,
        studentsStarted: 20,
        studentsSubmitted: 8,
        averageTimeSpent: 150,
        averageWordCount: 1200,
        createdAt: "2023-11-03",
      },
      {
        id: "8",
        title: "World War II Analysis",
        className: "History 105",
        dueDate: "2023-09-30",
        totalStudents: 32,
        studentsStarted: 32,
        studentsSubmitted: 31,
        averageTimeSpent: 240,
        averageWordCount: 1800,
        createdAt: "2023-09-15",
      }
    ],
    "c4": [
      {
        id: "4",
        title: "Computer Networks Essay",
        className: "Computer Science 301",
        dueDate: "2023-10-05", 
        totalStudents: 26,
        studentsStarted: 26,
        studentsSubmitted: 25,
        averageTimeSpent: 180,
        averageWordCount: 1650,
        createdAt: "2023-09-20",
      },
      {
        id: "9",
        title: "Algorithm Analysis",
        className: "Computer Science 301",
        dueDate: "2023-11-25",
        totalStudents: 26,
        studentsStarted: 18,
        studentsSubmitted: 6,
        averageTimeSpent: 110,
        averageWordCount: 780,
        createdAt: "2023-11-04",
      }
    ]
  };
  
  return classAssignments[classId as keyof typeof classAssignments] || [];
};

// Function to get a specific student assignment
export const getStudentAssignment = (studentId: string, assignmentId: string): StudentAssignment | undefined => {
  const assignments = getStudentsByAssignment(assignmentId);
  return assignments.find(a => a.studentId === studentId);
};

// Function to get student details by ID
export const getStudentById = (studentId: string): Student | undefined => {
  return students.find(s => s.id === studentId);
};

// Function to get comments for a student assignment
export const getCommentsForStudentAssignment = (studentAssignmentId: string): Comment[] => {
  // Mock comments
  const comments = [
    {
      id: "c1",
      studentAssignmentId: "sa1-1",
      teacherId: "t1",
      teacherName: "Dr. Smith",
      text: "Good analysis of Fitzgerald's critique of the American Dream. Consider expanding on the symbolism of the green light.",
      timestamp: "2023-11-11T10:15:00Z",
      resolved: false
    },
    {
      id: "c2",
      studentAssignmentId: "sa2-1",
      teacherId: "t2",
      teacherName: "Prof. Johnson",
      text: "Excellent work on problem 1. Your force calculation is correct and well-explained.",
      timestamp: "2023-11-13T09:30:00Z",
      resolved: true
    },
    {
      id: "c3",
      studentAssignmentId: "sa3-4",
      teacherId: "t3",
      teacherName: "Dr. Williams",
      text: "Your analysis of the Industrial Revolution's impact is thorough, but consider addressing the regional differences in more detail.",
      timestamp: "2023-11-13T14:20:00Z",
      resolved: false
    }
  ];
  
  return comments.filter(c => c.studentAssignmentId === studentAssignmentId);
};

// Function to add a comment to a student assignment
export const addCommentToStudentAssignment = (
  studentId: string,
  assignmentId: string,
  teacherId: string,
  teacherName: string,
  text: string
): Comment => {
  // In a real app, this would save to a database
  // For now, create a mock comment with a timestamp
  const newComment: Comment = {
    id: `c${Date.now()}`,
    studentAssignmentId: `sa-${studentId}-${assignmentId}`,
    teacherId,
    teacherName,
    text,
    timestamp: new Date().toISOString(),
    resolved: false
  };
  
  return newComment;
};

// Function to get all classes for a teacher
export const getClassesForTeacher = (): ClassInfo[] => {
  // Mock teacher classes
  return [
    {
      id: "c1",
      name: "English 101",
      subject: "English",
      period: "1st Period (8:00 - 9:30 AM)",
      studentCount: 28,
      activeAssignmentCount: 3
    },
    {
      id: "c2",
      name: "Physics 202",
      subject: "Science",
      period: "3rd Period (11:00 AM - 12:30 PM)",
      studentCount: 24,
      activeAssignmentCount: 2
    },
    {
      id: "c3",
      name: "History 105",
      subject: "History",
      period: "5th Period (2:00 - 3:30 PM)",
      studentCount: 32,
      activeAssignmentCount: 2
    },
    {
      id: "c4",
      name: "Computer Science 301",
      subject: "Math",
      period: "2nd Period (9:45 - 11:15 AM)",
      studentCount: 26,
      activeAssignmentCount: 2
    }
  ];
};
