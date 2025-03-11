
/**
 * mockData.ts
 * 
 * This file contains mock data for student classes and documents.
 * In a real application, this would be fetched from an API.
 */

export const studentClasses = [
  {
    id: "c1",
    name: "English 101",
    teacherName: "Dr. Smith",
    semester: "Fall 2023",
    assignments: [
      {
        id: "1",
        title: "Essay on American Literature",
        dueDate: "2023-11-15",
        status: "in_progress",
        startedOn: "2023-11-02T14:30:00Z",
        timeSpent: 120,
        wordCount: 950,
      },
      {
        id: "4",
        title: "Poetry Analysis",
        dueDate: "2023-12-05",
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
      }
    ]
  },
  {
    id: "c2",
    name: "Physics 202",
    teacherName: "Prof. Johnson",
    semester: "Fall 2023",
    assignments: [
      {
        id: "2",
        title: "Physics Problem Set",
        dueDate: "2023-11-18",
        status: "in_progress",
        startedOn: "2023-11-08T10:00:00Z",
        timeSpent: 90,
        wordCount: 580,
      }
    ]
  },
  {
    id: "c3",
    name: "History 105",
    teacherName: "Dr. Williams",
    semester: "Fall 2023",
    assignments: [
      {
        id: "3",
        title: "History Research Paper",
        dueDate: "2023-11-20",
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
      }
    ]
  }
];

export const studentDocuments = [
  {
    id: "d1",
    title: "Essay on American Literature",
    assignmentId: "1",
    className: "English 101",
    teacherName: "Dr. Smith",
    lastEdited: "2023-11-10T16:45:00Z",
    status: "in_progress",
    dueDate: "2023-11-15",
    timeSpent: 120,
    wordCount: 950,
    content: "The evolution of American literature reflects the nation's history and cultural development. From the early colonial period to the modern era, American writers have explored themes of identity, freedom, individualism, and social justice..."
  },
  {
    id: "d2",
    title: "Physics Problem Set",
    assignmentId: "2",
    className: "Physics 202",
    teacherName: "Prof. Johnson",
    lastEdited: "2023-11-12T09:15:00Z",
    status: "in_progress",
    dueDate: "2023-11-18",
    timeSpent: 90,
    wordCount: 580,
    content: "Newton's laws of motion form the foundation of classical mechanics. This problem set explores various applications of these laws in everyday scenarios..."
  },
  {
    id: "d3",
    title: "Research Notes on Civil War",
    assignmentId: null,
    className: null,
    teacherName: null,
    lastEdited: "2023-11-05T13:20:00Z",
    status: "draft",
    dueDate: null,
    timeSpent: 45,
    wordCount: 320,
    content: "The American Civil War (1861-1865) was a conflict between the United States of America and the Confederate States of America. The primary causes included differences in economic interests, states' rights, and the controversy over the expansion of slavery..."
  },
  {
    id: "d4",
    title: "Personal Journal: College Experience",
    assignmentId: null,
    className: null,
    teacherName: null,
    lastEdited: "2023-10-28T19:45:00Z",
    status: "draft",
    dueDate: null,
    timeSpent: 75,
    wordCount: 680,
    content: "My first semester of college has been both challenging and rewarding. The transition from high school to university life has required significant adjustments in terms of time management, study habits, and social interactions..."
  },
  {
    id: "d5",
    title: "Poetry Analysis Final Draft",
    assignmentId: "4",
    className: "English 101",
    teacherName: "Dr. Smith",
    lastEdited: "2023-11-03T11:30:00Z",
    status: "completed",
    dueDate: "2023-11-05",
    timeSpent: 180,
    wordCount: 1150,
    content: "Poetry analysis requires a deep understanding of both literal and figurative language. In this essay, I explore the themes and techniques used in contemporary poetry..."
  }
];
