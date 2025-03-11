/**
 * This file provides a centralized store for student assignments data,
 * allowing it to be shared between the Dashboard and Assignments pages.
 * 
 * It includes:
 * - Types for assignment data structures
 * - Mock data for student classes and assignments
 * - Functions to manage assignments (get, update, create)
 * - Assignment status tracking
 * 
 * Updates:
 * - Added citationCount and lastActive to Assignment interface
 * - Ensured proper typing for assignment status
 */

import { useState, useEffect } from "react";

// Define types for our data structures
export type AssignmentStatus = "not_started" | "in_progress" | "submitted";

export interface Assignment {
  id: string;
  title: string;
  className: string;
  teacherName: string;
  dueDate: string;
  status: AssignmentStatus;
  startedOn: string | null;
  submittedOn?: string | null;
  timeSpent: number;
  wordCount: number;
  copyPasteCount?: number;
  citationCount?: number;
  lastActive?: string;
  grade?: string;
  content?: string;
}

export interface Class {
  id: string;
  name: string;
  teacherName: string;
  semester: string;
  assignments: Assignment[];
}

// Initial mock data
const initialClasses: Class[] = [
  {
    id: "c1",
    name: "English 101",
    teacherName: "Dr. Smith",
    semester: "Fall 2023",
    assignments: [
      {
        id: "1",
        title: "Essay on American Literature",
        className: "English 101",
        teacherName: "Dr. Smith",
        dueDate: "2023-11-15",
        status: "in_progress",
        startedOn: "2023-11-02T14:30:00Z",
        timeSpent: 120,
        wordCount: 950,
        copyPasteCount: 3,
        citationCount: 2,
        lastActive: "2023-11-10T15:45:00Z",
        content: "American literature is characterized by the stories, poems, and essays written in the United States. One notable theme is the American Dream, a concept that has evolved throughout American literary history from the Puritans to contemporary authors.\n\nIn F. Scott Fitzgerald's 'The Great Gatsby,' we see the corruption of the American Dream through materialism and excess. Jay Gatsby represents both the idealistic pursuit of dreams and the corrupting influence of wealth.\n\nModern American literature continues to explore themes of identity, diversity, and the evolving nature of American society."
      },
      {
        id: "4",
        title: "Poetry Analysis",
        className: "English 101",
        teacherName: "Dr. Smith",
        dueDate: "2023-12-05",
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
        content: ""
      },
      {
        id: "5",
        title: "Literary Criticism Review",
        className: "English 101",
        teacherName: "Dr. Smith",
        dueDate: "2023-10-25",
        status: "submitted",
        startedOn: "2023-10-15T09:20:00Z",
        submittedOn: "2023-10-23T16:45:00Z",
        timeSpent: 180,
        wordCount: 1200,
        grade: "A-",
        content: "Literary criticism offers frameworks for understanding and interpreting texts. Formalist criticism focuses on the text itself without considering outside influences. Biographical criticism examines how an author's life influenced their work. Feminist criticism analyzes literature from a gender-focused perspective.\n\nNew Criticism emerged in the mid-20th century as a reaction against biographical criticism, arguing that a text should be analyzed as a self-contained entity. This approach emphasizes close reading and the importance of elements like irony, ambiguity, and paradox.\n\nPostcolonial criticism examines literature through the lens of power relations between colonizers and the colonized. This approach has been particularly valuable in reinterpreting canonical texts and highlighting marginalized voices in literature."
      },
      {
        id: "6",
        title: "Short Story Analysis",
        className: "English 101",
        teacherName: "Dr. Smith",
        dueDate: "2023-09-18",
        status: "submitted",
        startedOn: "2023-09-10T11:30:00Z",
        submittedOn: "2023-09-17T14:20:00Z",
        timeSpent: 150,
        wordCount: 800,
        grade: "B+",
        content: "Short stories condense narrative elements into compact forms that often focus on a single incident, theme, or character. Edgar Allan Poe, a pioneer of the form, argued that short stories should be readable in a single sitting to maintain a unity of effect.\n\nFlannery O'Connor's 'A Good Man is Hard to Find' demonstrates the power of the short story form through its shocking conclusion and exploration of grace. The grandmother's moment of recognition illustrates O'Connor's Catholic themes of redemption and spiritual awakening.\n\nContemporary short story writers continue to experiment with the form, pushing boundaries of structure and narrative while exploring diverse perspectives and experiences."
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
        className: "Physics 202",
        teacherName: "Prof. Johnson",
        dueDate: "2023-11-18",
        status: "in_progress",
        startedOn: "2023-11-08T10:00:00Z",
        timeSpent: 90,
        wordCount: 580,
        copyPasteCount: 1,
        content: "Problem 1: A 2.0 kg object moves along the x-axis. Its position varies with time according to x(t) = 3t² - 4t + 2, where x is in meters and t is in seconds. Find the force acting on the object as a function of time.\n\nSolution: To find the force, we need to use Newton's Second Law: F = ma. First, we differentiate the position function twice to get acceleration: v(t) = dx/dt = 6t - 4, and a(t) = dv/dt = 6. Therefore, F = ma = 2.0 kg × 6 m/s² = 12 N (constant).\n\nProblem 2: A satellite of mass 200 kg orbits Earth at a distance of 8000 km from Earth's center. Calculate the satellite's orbital speed and period. The mass of Earth is 5.97 × 10²⁴ kg, and G = 6.67 × 10⁻¹¹ N·m²/kg²."
      },
      {
        id: "7",
        title: "Lab Report: Pendulum Motion",
        className: "Physics 202",
        teacherName: "Prof. Johnson",
        dueDate: "2023-10-10",
        status: "submitted",
        startedOn: "2023-10-02T13:15:00Z",
        submittedOn: "2023-10-09T15:30:00Z",
        timeSpent: 200,
        wordCount: 1500,
        grade: "A",
        content: "Introduction: This experiment investigates the relationship between pendulum length and period of oscillation. The simple pendulum serves as a model for harmonic motion and allows us to verify the theoretical relationship T = 2π√(L/g).\n\nMethodology: Five pendulums of different lengths (0.5m, 0.75m, 1.0m, 1.25m, and 1.5m) were constructed using string and a metal sphere. For each pendulum, we measured the time for 20 complete oscillations and divided by 20 to determine the period. Each measurement was repeated three times to minimize random error.\n\nResults: The data confirmed the theoretical relationship between length and period. When plotting T² against L, we obtained a straight line with slope 4π²/g, yielding an experimental value for g of 9.79 m/s², which differs from the accepted value by only 0.2%.\n\nConclusion: The experiment successfully verified the theoretical model of pendulum motion, demonstrating that the period is proportional to the square root of length and independent of mass for small oscillations."
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
        className: "History 105",
        teacherName: "Dr. Williams",
        dueDate: "2023-11-20",
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
        content: ""
      },
      {
        id: "8",
        title: "World War II Analysis",
        className: "History 105",
        teacherName: "Dr. Williams",
        dueDate: "2023-09-30",
        status: "submitted",
        startedOn: "2023-09-20T08:45:00Z",
        submittedOn: "2023-09-29T17:10:00Z",
        timeSpent: 240,
        wordCount: 1800,
        grade: "A+",
        content: "The causes of World War II can be traced directly to the aftermath of World War I and the Treaty of Versailles. The harsh economic penalties imposed on Germany created conditions of poverty and resentment that Hitler exploited to gain power. The policy of appeasement pursued by Britain and France allowed Germany to rebuild its military and annex territories without consequence.\n\nThe war in Europe began with Germany's invasion of Poland in September 1939. Using Blitzkrieg tactics, German forces quickly conquered much of Europe. The United States entered the war after Japan's attack on Pearl Harbor in December 1941, transforming it into a truly global conflict.\n\nThe war's conclusion saw the emergence of the United States and Soviet Union as superpowers, setting the stage for the Cold War that would dominate international relations for decades to come. The founding of the United Nations represented an attempt to prevent future conflicts through international cooperation and diplomacy."
      }
    ]
  }
];

// Function to get all assignments from all classes
export const getAllAssignments = (): Assignment[] => {
  return initialClasses.flatMap(cls => cls.assignments);
};

// Create a local storage key for assignments
const ASSIGNMENTS_STORAGE_KEY = "studentAssignments";

// Function to save assignments to localStorage
const saveAssignments = (assignments: Assignment[]) => {
  localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(assignments));
};

// Function to get assignments from localStorage or initial data
const getStoredAssignments = (): Assignment[] => {
  const storedData = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // If no stored data, use initial data and save it
  const allAssignments = getAllAssignments();
  saveAssignments(allAssignments);
  return allAssignments;
};

// Hook for working with assignments
export const useAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  
  // Load assignments on mount
  useEffect(() => {
    setAssignments(getStoredAssignments());
  }, []);
  
  // Function to update an assignment
  const updateAssignment = (updatedAssignment: Assignment) => {
    const newAssignments = assignments.map(assignment => 
      assignment.id === updatedAssignment.id ? updatedAssignment : assignment
    );
    setAssignments(newAssignments);
    saveAssignments(newAssignments);
  };
  
  // Function to get an assignment by ID
  const getAssignment = (id: string) => {
    return assignments.find(assignment => assignment.id === id) || null;
  };
  
  // Function to create a new document/assignment
  const createDocument = (title: string = "Untitled Document", linkedAssignmentId: string | null = null): Assignment => {
    let newAssignment: Assignment;
    
    if (linkedAssignmentId) {
      // If linking to existing assignment, update its status
      const existingAssignment = assignments.find(a => a.id === linkedAssignmentId);
      if (existingAssignment) {
        newAssignment = {
          ...existingAssignment,
          status: "in_progress",
          startedOn: existingAssignment.startedOn || new Date().toISOString(),
        };
        updateAssignment(newAssignment);
        return newAssignment;
      }
    }
    
    // Create a new unlinked document
    newAssignment = {
      id: `new-${Date.now()}`,
      title,
      className: "Personal Documents",
      teacherName: "N/A",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
      status: "in_progress",
      startedOn: new Date().toISOString(),
      timeSpent: 0,
      wordCount: 0,
      copyPasteCount: 0,
      citationCount: 0,
      lastActive: new Date().toISOString(),
      content: ""
    };
    
    const newAssignments = [...assignments, newAssignment];
    setAssignments(newAssignments);
    saveAssignments(newAssignments);
    return newAssignment;
  };
  
  return {
    assignments,
    updateAssignment,
    getAssignment,
    createDocument
  };
};

// Export initial data for components that need it
export const mockAssignments = initialClasses.flatMap(cls => 
  cls.assignments.map(assignment => ({
    id: assignment.id,
    title: assignment.title,
    class: cls.name,
    dueDate: assignment.dueDate
  }))
);
