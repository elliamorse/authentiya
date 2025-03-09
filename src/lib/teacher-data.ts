
export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  period: string;
  subject: string;
  studentCount: number;
  activeAssignmentCount: number;
}

export interface AssignmentInfo {
  id: string;
  title: string;
  classId: string;
  className: string;
  dueDate: string;
  totalStudents: number;
  studentsStarted: number;
  studentsSubmitted: number;
  averageTimeSpent: number; // in minutes
  averageWordCount: number;
  createdAt: string;
  status: "active" | "past" | "draft";
}

export interface StudentAssignment {
  studentId: string;
  studentName: string;
  assignmentId: string;
  status: "not_started" | "in_progress" | "submitted";
  startTime: string | null;
  lastActive: string | null;
  timeSpent: number; // in minutes
  wordCount: number;
  copyPasteCount: number;
  citationCount: number;
  needsAttention: boolean;
  content: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  teacherId: string;
  teacherName: string;
  timestamp: string;
  text: string;
  resolved: boolean;
}

// Mock classes
export const mockClasses: ClassInfo[] = [
  {
    id: "c1",
    name: "English 101",
    period: "1st Period",
    subject: "English",
    studentCount: 28,
    activeAssignmentCount: 2
  },
  {
    id: "c2",
    name: "Physics 202",
    period: "3rd Period",
    subject: "Science",
    studentCount: 24,
    activeAssignmentCount: 1
  },
  {
    id: "c3",
    name: "History 105",
    period: "4th Period",
    subject: "History",
    studentCount: 32,
    activeAssignmentCount: 1
  },
  {
    id: "c4",
    name: "Advanced Composition",
    period: "6th Period",
    subject: "English",
    studentCount: 18,
    activeAssignmentCount: 3
  }
];

// Mock assignments
export const mockAssignments: AssignmentInfo[] = [
  {
    id: "a1",
    title: "Essay on American Literature",
    classId: "c1",
    className: "English 101",
    dueDate: "2023-11-15",
    totalStudents: 28,
    studentsStarted: 22,
    studentsSubmitted: 16,
    averageTimeSpent: 95, // in minutes
    averageWordCount: 850,
    createdAt: "2023-11-01",
    status: "active"
  },
  {
    id: "a2",
    title: "Physics Problem Set",
    classId: "c2",
    className: "Physics 202",
    dueDate: "2023-11-18",
    totalStudents: 24,
    studentsStarted: 18,
    studentsSubmitted: 10,
    averageTimeSpent: 120, // in minutes
    averageWordCount: 650,
    createdAt: "2023-11-05",
    status: "active"
  },
  {
    id: "a3",
    title: "History Research Paper",
    classId: "c3",
    className: "History 105",
    dueDate: "2023-11-20",
    totalStudents: 32,
    studentsStarted: 20,
    studentsSubmitted: 8,
    averageTimeSpent: 150, // in minutes
    averageWordCount: 1200,
    createdAt: "2023-11-03",
    status: "active"
  },
  {
    id: "a4",
    title: "Book Report: The Great Gatsby",
    classId: "c1",
    className: "English 101",
    dueDate: "2023-11-25",
    totalStudents: 28,
    studentsStarted: 15,
    studentsSubmitted: 5,
    averageTimeSpent: 70, // in minutes
    averageWordCount: 720,
    createdAt: "2023-11-08",
    status: "active"
  },
  {
    id: "a5",
    title: "Poetry Analysis",
    classId: "c4",
    className: "Advanced Composition",
    dueDate: "2023-11-22",
    totalStudents: 18,
    studentsStarted: 12,
    studentsSubmitted: 6,
    averageTimeSpent: 85, // in minutes
    averageWordCount: 670,
    createdAt: "2023-11-04",
    status: "active"
  },
  {
    id: "a6",
    title: "Creative Writing Exercise",
    classId: "c4",
    className: "Advanced Composition",
    dueDate: "2023-11-10",
    totalStudents: 18,
    studentsStarted: 18,
    studentsSubmitted: 18,
    averageTimeSpent: 65, // in minutes
    averageWordCount: 950,
    createdAt: "2023-11-01",
    status: "past"
  }
];

// Mock student assignments
export const mockStudentAssignments: StudentAssignment[] = [
  {
    studentId: "s1",
    studentName: "Alex Johnson",
    assignmentId: "a1",
    status: "in_progress",
    startTime: "2023-11-10T14:30:00",
    lastActive: "2023-11-11T10:45:00",
    timeSpent: 85,
    wordCount: 950,
    copyPasteCount: 3,
    citationCount: 2,
    needsAttention: false,
    content: "The American literary landscape has been shaped by diverse voices and perspectives throughout history. From the transcendentalist writings of Emerson and Thoreau to the realism of Mark Twain and the modernist experiments of Faulkner and Hemingway, American literature reflects the nation's evolving identity and values...",
    comments: [
      {
        id: "c1",
        teacherId: "t1",
        teacherName: "Dr. Smith",
        timestamp: "2023-11-10T16:45:00",
        text: "Great start, Alex! Your introduction provides a solid overview of American literary movements. Consider expanding on how these movements reflected the social and political climate of their times.",
        resolved: false
      }
    ]
  },
  {
    studentId: "s2",
    studentName: "Emma Rodriguez",
    assignmentId: "a1",
    status: "submitted",
    startTime: "2023-11-09T10:15:00",
    lastActive: "2023-11-10T15:30:00",
    timeSpent: 120,
    wordCount: 1100,
    copyPasteCount: 1,
    citationCount: 4,
    needsAttention: false,
    content: "American literature has its roots in the oral traditions of Native American cultures and the writings of European settlers. As the nation developed, so did its literary voice, creating distinct regional styles and perspectives...",
    comments: [
      {
        id: "c2",
        teacherId: "t1",
        teacherName: "Dr. Smith",
        timestamp: "2023-11-10T09:20:00",
        text: "Excellent work mentioning the Native American influence on our literary tradition, Emma. Your citations are well-integrated and support your arguments effectively.",
        resolved: true
      },
      {
        id: "c3",
        teacherId: "t1",
        teacherName: "Dr. Smith",
        timestamp: "2023-11-10T09:25:00",
        text: "Consider exploring how the immigrant experience has shaped American literature in the 20th century for your next section.",
        resolved: false
      }
    ]
  },
  {
    studentId: "s3",
    studentName: "Michael Chen",
    assignmentId: "a1",
    status: "not_started",
    startTime: null,
    lastActive: null,
    timeSpent: 0,
    wordCount: 0,
    copyPasteCount: 0,
    citationCount: 0,
    needsAttention: true,
    content: "",
    comments: []
  },
  {
    studentId: "s4",
    studentName: "Sophia Patel",
    assignmentId: "a1",
    status: "in_progress",
    startTime: "2023-11-11T09:45:00",
    lastActive: "2023-11-11T10:15:00",
    timeSpent: 30,
    wordCount: 250,
    copyPasteCount: 0,
    citationCount: 0,
    needsAttention: true,
    content: "American literature encompasses many genres and styles. The early colonial period was dominated by practical and religious writings. Later, the romantic period brought works that celebrated nature and individuality...",
    comments: [
      {
        id: "c4",
        teacherId: "t1",
        teacherName: "Dr. Smith",
        timestamp: "2023-11-11T11:00:00",
        text: "You're off to a good start, Sophia, but you seem to be progressing slowly. Do you need any help with research sources or outlining your essay?",
        resolved: false
      }
    ]
  },
  {
    studentId: "s5",
    studentName: "James Wilson",
    assignmentId: "a1",
    status: "submitted",
    startTime: "2023-11-08T16:20:00",
    lastActive: "2023-11-10T14:45:00",
    timeSpent: 160,
    wordCount: 1250,
    copyPasteCount: 2,
    citationCount: 5,
    needsAttention: false,
    content: "The development of American literature can be traced through several major movements, beginning with the colonial period when writing was primarily functional and religious. The post-Revolutionary era saw the emergence of a distinct American voice...",
    comments: []
  }
];

// Helper functions
export function getClassesForTeacher(): ClassInfo[] {
  return mockClasses;
}

export function getAssignmentsForClass(classId: string): AssignmentInfo[] {
  return mockAssignments.filter(assignment => assignment.classId === classId);
}

export function getAllAssignments(): AssignmentInfo[] {
  return mockAssignments;
}

export function getAssignmentById(assignmentId: string): AssignmentInfo | undefined {
  return mockAssignments.find(assignment => assignment.id === assignmentId);
}

export function getStudentAssignments(assignmentId: string): StudentAssignment[] {
  return mockStudentAssignments.filter(sa => sa.assignmentId === assignmentId);
}

export function getStudentAssignment(studentId: string, assignmentId: string): StudentAssignment | undefined {
  return mockStudentAssignments.find(
    sa => sa.studentId === studentId && sa.assignmentId === assignmentId
  );
}

export function addCommentToStudentAssignment(
  studentId: string,
  assignmentId: string,
  teacherId: string,
  teacherName: string,
  text: string
): Comment {
  const newComment: Comment = {
    id: `c${Date.now()}`,
    teacherId,
    teacherName,
    timestamp: new Date().toISOString(),
    text,
    resolved: false
  };
  
  // In a real app, this would update a database
  // For this demo, we'll just return the comment
  return newComment;
}
