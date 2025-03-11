
/**
 * mockData.ts
 * 
 * This file contains all mock data for the teacher dashboard including
 * student assignments, assignments, and classes.
 */

import { Assignment, ClassInfo, StudentAssignment } from "./types";
import { generateRandomDate, generateRandomStatus, generateRandomTimeSpent, generateRandomWordCount } from "./mockDataGenerators";

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
    startTime: "2023-11-03T13:45:00Z",
    submissionTime: "2023-11-09T16:30:00Z",
    lastActive: "2023-11-09T16:30:00Z",
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
    startTime: "2023-11-05T09:15:00Z",
    submissionTime: null,
    lastActive: "2023-11-11T14:30:00Z",
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
    startTime: "2023-11-01T10:30:00Z",
    submissionTime: "2023-11-08T15:45:00Z",
    lastActive: "2023-11-08T15:45:00Z",
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
    status: "in_progress",
    startTime: "2023-11-04T11:20:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T16:30:00Z",
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
    studentId: "11",
    assignmentId: "1",
    studentName: "Sophia Lee",
    status: "in_progress",
    startTime: "2023-11-03T14:45:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T10:20:00Z",
    timeSpent: generateRandomTimeSpent(70, 180),
    wordCount: generateRandomWordCount(600, 1100),
    copyPasteCount: Math.floor(Math.random() * 4),
    citationCount: Math.floor(Math.random() * 6),
    content: "Contemporary American literature reflects the diversity of American society, with voices from various cultural, ethnic, and social backgrounds contributing to a rich tapestry of literary expression...",
    comments: []
  },
  {
    studentId: "12",
    assignmentId: "1",
    studentName: "Jackson Brown",
    status: "submitted",
    startTime: "2023-11-04T09:30:00Z",
    submissionTime: "2023-11-09T13:45:00Z",
    lastActive: "2023-11-09T13:45:00Z",
    timeSpent: generateRandomTimeSpent(80, 160),
    wordCount: generateRandomWordCount(700, 1000),
    copyPasteCount: Math.floor(Math.random() * 3),
    citationCount: Math.floor(Math.random() * 5),
    content: "American Gothic literature established a unique tradition with works characterized by darkness, mystery, and the supernatural. Edgar Allan Poe, Nathaniel Hawthorne, and later Stephen King exemplify this tradition...",
    comments: []
  },
  {
    studentId: "13",
    assignmentId: "1",
    studentName: "Mia Garcia",
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
    studentId: "14",
    assignmentId: "1",
    studentName: "Lucas Taylor",
    status: "in_progress",
    startTime: "2023-11-03T16:20:00Z",
    submissionTime: null,
    lastActive: "2023-11-11T09:45:00Z",
    timeSpent: generateRandomTimeSpent(70, 170),
    wordCount: generateRandomWordCount(600, 1100),
    copyPasteCount: Math.floor(Math.random() * 4),
    citationCount: Math.floor(Math.random() * 6),
    content: "Modernism in American literature reflected the rapid social and technological changes of the early 20th century. Writers like Ernest Hemingway, William Faulkner, and T.S. Eliot experimented with new literary techniques to capture the fragmentation and alienation of modern life...",
    comments: []
  },
  
  // Adding 8 more assignments for Physics Problem Set (Assignment ID 2)
  {
    studentId: "15",
    assignmentId: "2",
    studentName: "Charlotte Wilson",
    status: "in_progress",
    startTime: "2023-11-03T10:15:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T15:30:00Z",
    timeSpent: generateRandomTimeSpent(60, 150),
    wordCount: generateRandomWordCount(400, 700),
    copyPasteCount: Math.floor(Math.random() * 2),
    citationCount: Math.floor(Math.random() * 4),
    content: "This problem set addresses the application of Newton's laws of motion to various scenarios including forces on inclined planes and friction calculations...",
    comments: []
  },
  {
    studentId: "16",
    assignmentId: "2",
    studentName: "Henry Davis",
    status: "submitted",
    startTime: "2023-11-02T11:30:00Z",
    submissionTime: "2023-11-09T14:20:00Z",
    lastActive: "2023-11-09T14:20:00Z",
    timeSpent: generateRandomTimeSpent(80, 160),
    wordCount: generateRandomWordCount(500, 800),
    copyPasteCount: Math.floor(Math.random() * 1),
    citationCount: Math.floor(Math.random() * 3),
    content: "Energy conservation is a fundamental principle in physics. This problem set explores various scenarios where mechanical energy is conserved or transformed...",
    comments: []
  },
  {
    studentId: "17",
    assignmentId: "2",
    studentName: "Amelia Martinez",
    status: "in_progress",
    startTime: "2023-11-04T13:45:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T10:30:00Z",
    timeSpent: generateRandomTimeSpent(70, 140),
    wordCount: generateRandomWordCount(450, 750),
    copyPasteCount: Math.floor(Math.random() * 2),
    citationCount: Math.floor(Math.random() * 4),
    content: "The concept of momentum is crucial in classical mechanics. This problem set examines various scenarios involving momentum conservation and collisions...",
    comments: []
  },
  {
    studentId: "18",
    assignmentId: "2",
    studentName: "Benjamin Anderson",
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
    studentId: "19",
    assignmentId: "2",
    studentName: "Harper Thomas",
    status: "in_progress",
    startTime: "2023-11-02T15:20:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T13:45:00Z",
    timeSpent: generateRandomTimeSpent(60, 130),
    wordCount: generateRandomWordCount(400, 650),
    copyPasteCount: Math.floor(Math.random() * 1),
    citationCount: Math.floor(Math.random() * 2),
    content: "Fluid mechanics deals with the behavior of fluids at rest and in motion. This problem set examines concepts such as pressure, buoyancy, and fluid flow...",
    comments: []
  },
  {
    studentId: "20",
    assignmentId: "2",
    studentName: "Evelyn Clark",
    status: "submitted",
    startTime: "2023-11-04T09:30:00Z",
    submissionTime: "2023-11-09T15:45:00Z",
    lastActive: "2023-11-09T15:45:00Z",
    timeSpent: generateRandomTimeSpent(80, 150),
    wordCount: generateRandomWordCount(500, 750),
    copyPasteCount: Math.floor(Math.random() * 2),
    citationCount: Math.floor(Math.random() * 3),
    content: "Thermodynamics is the study of heat, temperature, and their relation to energy and work. This problem set explores the laws of thermodynamics and their applications...",
    comments: []
  },
  {
    studentId: "21",
    assignmentId: "2",
    studentName: "Daniel Hill",
    status: "in_progress",
    startTime: "2023-11-03T13:20:00Z",
    submissionTime: null,
    lastActive: "2023-11-11T14:30:00Z",
    timeSpent: generateRandomTimeSpent(70, 140),
    wordCount: generateRandomWordCount(450, 700),
    copyPasteCount: Math.floor(Math.random() * 1),
    citationCount: Math.floor(Math.random() * 4),
    content: "Oscillatory motion is a type of periodic motion that repeats itself in a regular cycle. This problem set examines simple harmonic motion and its applications...",
    comments: []
  },
  {
    studentId: "22",
    assignmentId: "2",
    studentName: "Victoria Young",
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
  
  // Adding 13 more assignments for History Research Paper (Assignment ID 3)
  {
    studentId: "23",
    assignmentId: "3",
    studentName: "Joseph Walker",
    status: "in_progress",
    startTime: "2023-11-03T14:30:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T09:45:00Z",
    timeSpent: generateRandomTimeSpent(90, 180),
    wordCount: generateRandomWordCount(800, 1400),
    copyPasteCount: Math.floor(Math.random() * 3),
    citationCount: Math.floor(Math.random() * 8),
    content: "The French Revolution (1789-1799) marked a pivotal moment in European history, leading to significant social and political changes that reshaped the continent and influenced global politics...",
    comments: []
  },
  {
    studentId: "24",
    assignmentId: "3",
    studentName: "Elizabeth Scott",
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
    studentId: "25",
    assignmentId: "3",
    studentName: "Gabriel Green",
    status: "in_progress",
    startTime: "2023-11-04T10:15:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T13:30:00Z",
    timeSpent: generateRandomTimeSpent(80, 170),
    wordCount: generateRandomWordCount(700, 1300),
    copyPasteCount: Math.floor(Math.random() * 2),
    citationCount: Math.floor(Math.random() * 7),
    content: "The Civil Rights Movement in the United States (1954-1968) fought to end institutionalized racial discrimination, disenfranchisement, and racial segregation...",
    comments: []
  },
  {
    studentId: "26",
    assignmentId: "3",
    studentName: "Samantha Adams",
    status: "in_progress",
    startTime: "2023-11-03T09:45:00Z",
    submissionTime: null,
    lastActive: "2023-11-11T16:20:00Z",
    timeSpent: generateRandomTimeSpent(110, 190),
    wordCount: generateRandomWordCount(1000, 1600),
    copyPasteCount: Math.floor(Math.random() * 5),
    citationCount: Math.floor(Math.random() * 12),
    content: "World War I (1914-1918) was a global conflict that redrew national boundaries, collapsed empires, and set the stage for future conflicts with its unresolved tensions...",
    comments: []
  },
  {
    studentId: "27",
    assignmentId: "3",
    studentName: "David Turner",
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
    studentId: "28",
    assignmentId: "3",
    studentName: "Olivia Parker",
    status: "submitted",
    startTime: "2023-11-04T11:30:00Z",
    submissionTime: "2023-11-09T14:45:00Z",
    lastActive: "2023-11-09T14:45:00Z",
    timeSpent: generateRandomTimeSpent(100, 200),
    wordCount: generateRandomWordCount(900, 1500),
    copyPasteCount: Math.floor(Math.random() * 4),
    citationCount: Math.floor(Math.random() * 11),
    content: "The Renaissance was a period of cultural, artistic, and intellectual revival that bridged the gap between the Middle Ages and modern history in Europe...",
    comments: []
  },
  {
    studentId: "29",
    assignmentId: "3",
    studentName: "William Baker",
    status: "in_progress",
    startTime: "2023-11-03T13:20:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T10:45:00Z",
    timeSpent: generateRandomTimeSpent(80, 170),
    wordCount: generateRandomWordCount(700, 1300),
    copyPasteCount: Math.floor(Math.random() * 2),
    citationCount: Math.floor(Math.random() * 8),
    content: "The American Revolution (1775-1783) established the United States as an independent nation and set forth democratic principles that influenced political developments worldwide...",
    comments: []
  },
  {
    studentId: "30",
    assignmentId: "3",
    studentName: "Grace Nelson",
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
    studentId: "31",
    assignmentId: "3",
    studentName: "Samuel Carter",
    status: "in_progress",
    startTime: "2023-11-02T14:45:00Z",
    submissionTime: null,
    lastActive: "2023-11-11T13:30:00Z",
    timeSpent: generateRandomTimeSpent(95, 185),
    wordCount: generateRandomWordCount(850, 1400),
    copyPasteCount: Math.floor(Math.random() * 3),
    citationCount: Math.floor(Math.random() * 9),
    content: "The Cold War period (1947-1991) was characterized by political tension and military rivalry between the United States and the Soviet Union, which shaped international relations for decades...",
    comments: []
  },
  {
    studentId: "32",
    assignmentId: "3",
    studentName: "Zoe Mitchell",
    status: "submitted",
    startTime: "2023-11-01T10:15:00Z",
    submissionTime: "2023-11-08T15:30:00Z",
    lastActive: "2023-11-08T15:30:00Z",
    timeSpent: generateRandomTimeSpent(120, 210),
    wordCount: generateRandomWordCount(950, 1550),
    copyPasteCount: Math.floor(Math.random() * 4),
    citationCount: Math.floor(Math.random() * 10),
    content: "The Industrial Revolution transformed Western society through technological advancement, urbanization, and the rise of new social classes, setting the stage for modern economic systems...",
    comments: []
  },
  {
    studentId: "33",
    assignmentId: "3",
    studentName: "Mason Reed",
    status: "in_progress",
    startTime: "2023-11-05T09:30:00Z",
    submissionTime: null,
    lastActive: "2023-11-11T14:15:00Z",
    timeSpent: generateRandomTimeSpent(65, 155),
    wordCount: generateRandomWordCount(550, 1100),
    copyPasteCount: Math.floor(Math.random() * 2),
    citationCount: Math.floor(Math.random() * 7),
    content: "The Great Depression (1929-1939) was the most severe economic downturn of the 20th century, causing widespread unemployment, poverty, and social unrest that influenced economic policies worldwide...",
    comments: []
  },
  {
    studentId: "34",
    assignmentId: "3",
    studentName: "Layla Harris",
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
    studentId: "35",
    assignmentId: "3",
    studentName: "Caleb Foster",
    status: "in_progress",
    startTime: "2023-11-04T15:30:00Z",
    submissionTime: null,
    lastActive: "2023-11-12T11:45:00Z",
    timeSpent: generateRandomTimeSpent(85, 175),
    wordCount: generateRandomWordCount(750, 1350),
    copyPasteCount: Math.floor(Math.random() * 3),
    citationCount: Math.floor(Math.random() * 8),
    content: "The Age of Enlightenment, spanning the late 17th to early 19th centuries, was characterized by an emphasis on reason, individualism, and skepticism of traditional institutions and beliefs...",
    comments: []
  }
];

// Mock data for assignments
export const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Essay on American Literature",
    className: "English 101",
    dueDate: "2023-11-15",
    totalStudents: 0, // Will be calculated dynamically
    studentsStarted: 0, // Will be calculated dynamically
    studentsSubmitted: 0, // Will be calculated dynamically
    averageTimeSpent: 0, // Will be calculated dynamically
    averageWordCount: 0, // Will be calculated dynamically
    createdAt: "2023-11-01",
  },
  {
    id: "2",
    title: "Physics Problem Set",
    className: "Physics 202",
    dueDate: "2023-11-18",
    totalStudents: 0, // Will be calculated dynamically
    studentsStarted: 0, // Will be calculated dynamically
    studentsSubmitted: 0, // Will be calculated dynamically
    averageTimeSpent: 0, // Will be calculated dynamically
    averageWordCount: 0, // Will be calculated dynamically
    createdAt: "2023-11-05",
  },
  {
    id: "3",
    title: "History Research Paper",
    className: "History 105",
    dueDate: "2023-11-20",
    totalStudents: 0, // Will be calculated dynamically
    studentsStarted: 0, // Will be calculated dynamically
    studentsSubmitted: 0, // Will be calculated dynamically
    averageTimeSpent: 0, // Will be calculated dynamically
    averageWordCount: 0, // Will be calculated dynamically
    createdAt: "2023-11-03",
  },
  {
    id: "4",
    title: "Poetry Analysis",
    className: "English 101",
    dueDate: "2023-12-05",
    totalStudents: 0, // Will be calculated dynamically
    studentsStarted: 0, // Will be calculated dynamically
    studentsSubmitted: 0, // Will be calculated dynamically
    averageTimeSpent: 0, // Will be calculated dynamically
    averageWordCount: 0, // Will be calculated dynamically
    createdAt: "2023-11-10",
  }
];

// Mock data for classes
export const mockClasses: ClassInfo[] = [
  {
    id: "c1",
    name: "English 101",
    subject: "English",
    period: "Morning",
    studentCount: 30,
    activeAssignmentCount: 2
  },
  {
    id: "c2",
    name: "Physics 202",
    subject: "Physics",
    period: "Afternoon",
    studentCount: 24,
    activeAssignmentCount: 1
  },
  {
    id: "c3",
    name: "History 105",
    subject: "History",
    period: "Morning",
    studentCount: 32,
    activeAssignmentCount: 1
  }
];
