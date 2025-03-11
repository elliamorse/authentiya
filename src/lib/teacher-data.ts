
/**
 * teacher-data.ts
 * 
 * This file contains mock data and utility functions for the teacher dashboard.
 * It provides interfaces and mock data for assignments, student assignments, classes,
 * and comments, as well as helper functions to retrieve and manipulate this data.
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

// Helper function to generate random time spent (minutes)
const generateRandomTimeSpent = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate random word count
const generateRandomWordCount = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate random date in the past few days
const generateRandomDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  return date.toISOString();
};

// Helper function to generate random status with distribution
const generateRandomStatus = () => {
  const rand = Math.random();
  if (rand < 0.3) return "not_started";
  if (rand < 0.7) return "in_progress";
  return "submitted";
};

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
  },
  // Adding 10 more assignments for English Literature (Assignment ID 1)
  {
    studentId: "6",
    assignmentId: "1",
    studentName: "Oliver Martinez",
    status: "submitted",
    startTime: generateRandomDate(10),
    submissionTime: generateRandomDate(5),
    lastActive: generateRandomDate(5),
    timeSpent: generateRandomTimeSpent(70, 180),
    wordCount: generateRandomWordCount(700, 1200),
    copyPasteCount: Math.floor(Math.random() * 5),
    citationCount: Math.floor(Math.random() * 8),
    content: "American literature has been shaped by diverse cultural influences and historical events. From the early colonial writings to contemporary prose, there is a rich tapestry of voices that reflect America's complex identity...",
    comments: []
  },
  {
    studentId: "7",
    assignmentId: "1",
    studentName: "Isabella Kim",
    status: "in_progress",
    startTime: generateRandomDate(8),
    submissionTime: null,
    lastActive: generateRandomDate(2),
    timeSpent: generateRandomTimeSpent(40, 110),
    wordCount: generateRandomWordCount(300, 800),
    copyPasteCount: Math.floor(Math.random() * 3),
    citationCount: Math.floor(Math.random() * 4),
    content: "The journey of American literature from its colonial beginnings to its current diverse state mirrors the nation's own development. Writers such as Washington Irving, Nathaniel Hawthorne, and Edgar Allan Poe established a uniquely American voice...",
    comments: []
  },
  {
    studentId: "8",
    assignmentId: "1",
    studentName: "Ethan Williams",
    status: "submitted",
    startTime: generateRandomDate(12),
    submissionTime: generateRandomDate(7),
    lastActive: generateRandomDate(7),
    timeSpent: generateRandomTimeSpent(90, 160),
    wordCount: generateRandomWordCount(800, 1100),
    copyPasteCount: Math.floor(Math.random() * 2),
    citationCount: Math.floor(Math.random() * 6),
    content: "American literature emerged as a distinct literary tradition during the 19th century with writers like Walt Whitman and Emily Dickinson creating poetry that broke from European traditions both in form and content...",
    comments: []
  },
  {
    studentId: "9",
    assignmentId: "1",
    studentName: "Ava Rodriguez",
    status: generateRandomStatus(),
    startTime: generateRandomDate(9),
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(4) : null,
    lastActive: generateRandomDate(1),
    timeSpent: generateRandomTimeSpent(50, 140),
    wordCount: generateRandomWordCount(400, 900),
    copyPasteCount: Math.floor(Math.random() * 4),
    citationCount: Math.floor(Math.random() * 5),
    content: "The Harlem Renaissance marked a pivotal moment in American literary history, giving voice to Black writers and artists who explored themes of identity, racism, and cultural heritage...",
    comments: []
  },
  {
    studentId: "10",
    assignmentId: "1",
    studentName: "Noah Thompson",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(11) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(6) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(60, 150),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(500, 1000),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 7),
    content: generateRandomStatus() === "not_started" ? null : "The Beat Generation of the 1950s revolutionized American literature with works that challenged conventional values and literary forms. Writers like Jack Kerouac, Allen Ginsberg, and William S. Burroughs explored themes of spirituality, sexuality, and drug use...",
    comments: []
  },
  {
    studentId: "11",
    assignmentId: "1",
    studentName: "Sophia Lee",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(70, 180),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(600, 1100),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 4),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 6),
    content: generateRandomStatus() === "not_started" ? null : "Contemporary American literature reflects the diversity of American society, with voices from various cultural, ethnic, and social backgrounds contributing to a rich tapestry of literary expression...",
    comments: []
  },
  {
    studentId: "12",
    assignmentId: "1",
    studentName: "Jackson Brown",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(9) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(4) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(80, 160),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(700, 1000),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 5),
    content: generateRandomStatus() === "not_started" ? null : "American Gothic literature established a unique tradition with works characterized by darkness, mystery, and the supernatural. Edgar Allan Poe, Nathaniel Hawthorne, and later Stephen King exemplify this tradition...",
    comments: []
  },
  {
    studentId: "13",
    assignmentId: "1",
    studentName: "Mia Garcia",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(11) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(6) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(60, 150),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(500, 900),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 2),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 7),
    content: generateRandomStatus() === "not_started" ? null : "The American Dream has been a central theme in American literature, explored through various perspectives by writers such as F. Scott Fitzgerald, John Steinbeck, and Arthur Miller...",
    comments: []
  },
  {
    studentId: "14",
    assignmentId: "1",
    studentName: "Lucas Taylor",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(70, 170),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(600, 1100),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 4),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 6),
    content: generateRandomStatus() === "not_started" ? null : "Modernism in American literature reflected the rapid social and technological changes of the early 20th century. Writers like Ernest Hemingway, William Faulkner, and T.S. Eliot experimented with new literary techniques to capture the fragmentation and alienation of modern life...",
    comments: []
  },
  
  // Adding 8 more assignments for Physics Problem Set (Assignment ID 2)
  {
    studentId: "15",
    assignmentId: "2",
    studentName: "Charlotte Wilson",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(60, 150),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(400, 700),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 2),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 4),
    content: generateRandomStatus() === "not_started" ? null : "This problem set addresses the application of Newton's laws of motion to various scenarios including forces on inclined planes and friction calculations...",
    comments: []
  },
  {
    studentId: "16",
    assignmentId: "2",
    studentName: "Henry Davis",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(11) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(6) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(80, 160),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(500, 800),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 1),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    content: generateRandomStatus() === "not_started" ? null : "Energy conservation is a fundamental principle in physics. This problem set explores various scenarios where mechanical energy is conserved or transformed...",
    comments: []
  },
  {
    studentId: "17",
    assignmentId: "2",
    studentName: "Amelia Martinez",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(9) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(4) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(70, 140),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(450, 750),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 2),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 4),
    content: generateRandomStatus() === "not_started" ? null : "The concept of momentum is crucial in classical mechanics. This problem set examines various scenarios involving momentum conservation and collisions...",
    comments: []
  },
  {
    studentId: "18",
    assignmentId: "2",
    studentName: "Benjamin Anderson",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(90, 170),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(550, 850),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 5),
    content: generateRandomStatus() === "not_started" ? null : "Rotational dynamics is an extension of linear dynamics to rotating systems. This problem set explores the principles of torque, angular momentum, and rotational inertia...",
    comments: []
  },
  {
    studentId: "19",
    assignmentId: "2",
    studentName: "Harper Thomas",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(11) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(6) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(60, 130),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(400, 650),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 1),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 2),
    content: generateRandomStatus() === "not_started" ? null : "Fluid mechanics deals with the behavior of fluids at rest and in motion. This problem set examines concepts such as pressure, buoyancy, and fluid flow...",
    comments: []
  },
  {
    studentId: "20",
    assignmentId: "2",
    studentName: "Evelyn Clark",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(9) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(4) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(80, 150),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(500, 750),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 2),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    content: generateRandomStatus() === "not_started" ? null : "Thermodynamics is the study of heat, temperature, and their relation to energy and work. This problem set explores the laws of thermodynamics and their applications...",
    comments: []
  },
  {
    studentId: "21",
    assignmentId: "2",
    studentName: "Daniel Hill",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(70, 140),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(450, 700),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 1),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 4),
    content: generateRandomStatus() === "not_started" ? null : "Oscillatory motion is a type of periodic motion that repeats itself in a regular cycle. This problem set examines simple harmonic motion and its applications...",
    comments: []
  },
  {
    studentId: "22",
    assignmentId: "2",
    studentName: "Victoria Young",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(11) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(6) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(90, 160),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(550, 800),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 2),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    content: generateRandomStatus() === "not_started" ? null : "Wave motion is a disturbance that travels through a medium, transferring energy without transferring matter. This problem set explores mechanical waves, sound waves, and their properties...",
    comments: []
  },
  
  // Adding 13 more assignments for History Research Paper (Assignment ID 3)
  {
    studentId: "23",
    assignmentId: "3",
    studentName: "Joseph Walker",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(90, 180),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(800, 1400),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 8),
    content: generateRandomStatus() === "not_started" ? null : "The French Revolution (1789-1799) marked a pivotal moment in European history, leading to significant social and political changes that reshaped the continent and influenced global politics...",
    comments: []
  },
  {
    studentId: "24",
    assignmentId: "3",
    studentName: "Elizabeth Scott",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(11) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(6) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(100, 200),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(900, 1500),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 4),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 10),
    content: generateRandomStatus() === "not_started" ? null : "The Industrial Revolution transformed economic and social structures across Europe and North America, leading to urbanization, technological innovation, and new social classes...",
    comments: []
  },
  {
    studentId: "25",
    assignmentId: "3",
    studentName: "Gabriel Green",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(9) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(4) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(80, 170),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(700, 1300),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 2),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 7),
    content: generateRandomStatus() === "not_started" ? null : "The Civil Rights Movement in the United States (1954-1968) fought to end institutionalized racial discrimination, disenfranchisement, and racial segregation...",
    comments: []
  },
  {
    studentId: "26",
    assignmentId: "3",
    studentName: "Samantha Adams",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(110, 190),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(1000, 1600),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 5),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 12),
    content: generateRandomStatus() === "not_started" ? null : "World War I (1914-1918) was a global conflict that redrew national boundaries, collapsed empires, and set the stage for future conflicts with its unresolved tensions...",
    comments: []
  },
  {
    studentId: "27",
    assignmentId: "3",
    studentName: "David Turner",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(11) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(6) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(90, 180),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(800, 1400),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 9),
    content: generateRandomStatus() === "not_started" ? null : "The Cold War (1947-1991) was a period of geopolitical tension between the United States and the Soviet Union and their respective allies that shaped international relations for decades...",
    comments: []
  },
  {
    studentId: "28",
    assignmentId: "3",
    studentName: "Olivia Parker",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(9) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(4) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(100, 200),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(900, 1500),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 4),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 11),
    content: generateRandomStatus() === "not_started" ? null : "The Renaissance was a period of cultural, artistic, and intellectual revival that bridged the gap between the Middle Ages and modern history in Europe...",
    comments: []
  },
  {
    studentId: "29",
    assignmentId: "3",
    studentName: "William Baker",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(80, 170),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(700, 1300),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 2),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 8),
    content: generateRandomStatus() === "not_started" ? null : "The American Revolution (1775-1783) established the United States as an independent nation and set forth democratic principles that influenced political developments worldwide...",
    comments: []
  },
  {
    studentId: "30",
    assignmentId: "3",
    studentName: "Grace Nelson",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(11) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(6) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(110, 190),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(1000, 1600),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 5),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 12),
    content: generateRandomStatus() === "not_started" ? null : "The Great Depression (1929-1939) was a severe worldwide economic downturn that had profound social and political implications, leading to significant policy reforms...",
    comments: []
  },
  {
    studentId: "31",
    assignmentId: "3",
    studentName: "Samuel Carter",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(9) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(4) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(90, 180),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(800, 1400),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 9),
    content: generateRandomStatus() === "not_started" ? null : "The Age of Exploration (15th-17th centuries) was a period during which European ships traveled around the world to search for new trading routes and partners, leading to colonization and the exchange of goods, ideas, and cultures...",
    comments: []
  },
  {
    studentId: "32",
    assignmentId: "3",
    studentName: "Lily Mitchell",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(100, 200),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(900, 1500),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 4),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 11),
    content: generateRandomStatus() === "not_started" ? null : "The Scientific Revolution (16th-18th centuries) was a period of major scientific discoveries that fundamentally changed views on nature and human society...",
    comments: []
  },
  {
    studentId: "33",
    assignmentId: "3",
    studentName: "Andrew Roberts",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(11) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(6) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(80, 170),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(700, 1300),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 2),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 8),
    content: generateRandomStatus() === "not_started" ? null : "World War II (1939-1945) was a global conflict that reshaped international alliances, led to the development of nuclear weapons, and established the foundation for the post-war global order...",
    comments: []
  },
  {
    studentId: "34",
    assignmentId: "3",
    studentName: "Chloe Phillips",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(9) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(4) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(2) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(110, 190),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(1000, 1600),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 5),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 12),
    content: generateRandomStatus() === "not_started" ? null : "The Digital Revolution, beginning in the latter half of the 20th century, has transformed how people live, work, and communicate through the rapid advancement and adoption of digital technologies...",
    comments: []
  },
  {
    studentId: "35",
    assignmentId: "3",
    studentName: "Ryan Campbell",
    status: generateRandomStatus(),
    startTime: generateRandomStatus() !== "not_started" ? generateRandomDate(10) : null,
    submissionTime: generateRandomStatus() === "submitted" ? generateRandomDate(5) : null,
    lastActive: generateRandomStatus() !== "not_started" ? generateRandomDate(1) : null,
    timeSpent: generateRandomStatus() === "not_started" ? 0 : generateRandomTimeSpent(90, 180),
    wordCount: generateRandomStatus() === "not_started" ? 0 : generateRandomWordCount(800, 1400),
    copyPasteCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 3),
    citationCount: generateRandomStatus() === "not_started" ? 0 : Math.floor(Math.random() * 9),
    content: generateRandomStatus() === "not_started" ? null : "Decolonization in the 20th century marked the dismantling of colonial empires established by European powers, leading to the emergence of dozens of newly independent nations across Africa, Asia, and the Caribbean...",
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
