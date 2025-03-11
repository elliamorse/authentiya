
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
 * - Added additional submitted assignments with complete data
 * - Enhanced mock data with realistic content, word counts, and timestamps
 * - Fixed integration between document editor and assignment views
 * - Ensured proper status tracking for new documents
 * - Improved type checking for assignment properties
 * - Added missing submittedOn dates for submitted assignments
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

// Function to generate a date in the past
const getPastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Function to generate a date in the future
const getFutureDate = (daysAhead: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString();
};

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
        startedOn: getPastDate(10),
        timeSpent: 120,
        wordCount: 950,
        copyPasteCount: 3,
        citationCount: 2,
        lastActive: getPastDate(2),
        content: "American literature is characterized by the stories, poems, and essays written in the United States. One notable theme is the American Dream, a concept that has evolved throughout American literary history from the Puritans to contemporary authors.\n\nIn F. Scott Fitzgerald's 'The Great Gatsby,' we see the corruption of the American Dream through materialism and excess. Jay Gatsby represents both the idealistic pursuit of dreams and the corrupting influence of wealth.\n\nModern American literature continues to explore themes of identity, diversity, and the evolving nature of American society."
      },
      {
        id: "4",
        title: "Poetry Analysis",
        className: "English 101",
        teacherName: "Dr. Smith",
        dueDate: getFutureDate(15),
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
        citationCount: 0,
        content: ""
      },
      {
        id: "5",
        title: "Literary Criticism Review",
        className: "English 101",
        teacherName: "Dr. Smith",
        dueDate: getPastDate(20),
        status: "submitted",
        startedOn: getPastDate(30),
        submittedOn: getPastDate(22),
        timeSpent: 180,
        wordCount: 1200,
        citationCount: 5,
        grade: "A-",
        content: "Literary criticism offers frameworks for understanding and interpreting texts. Formalist criticism focuses on the text itself without considering outside influences. Biographical criticism examines how an author's life influenced their work. Feminist criticism analyzes literature from a gender-focused perspective.\n\nNew Criticism emerged in the mid-20th century as a reaction against biographical criticism, arguing that a text should be analyzed as a self-contained entity. This approach emphasizes close reading and the importance of elements like irony, ambiguity, and paradox.\n\nPostcolonial criticism examines literature through the lens of power relations between colonizers and the colonized. This approach has been particularly valuable in reinterpreting canonical texts and highlighting marginalized voices in literature."
      },
      {
        id: "6",
        title: "Short Story Analysis",
        className: "English 101",
        teacherName: "Dr. Smith",
        dueDate: getPastDate(45),
        status: "submitted",
        startedOn: getPastDate(53),
        submittedOn: getPastDate(46),
        timeSpent: 150,
        wordCount: 800,
        citationCount: 3,
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
        dueDate: getFutureDate(5),
        status: "in_progress",
        startedOn: getPastDate(5),
        timeSpent: 90,
        wordCount: 580,
        copyPasteCount: 1,
        citationCount: 2,
        lastActive: getPastDate(1),
        content: "Problem 1: A 2.0 kg object moves along the x-axis. Its position varies with time according to x(t) = 3t² - 4t + 2, where x is in meters and t is in seconds. Find the force acting on the object as a function of time.\n\nSolution: To find the force, we need to use Newton's Second Law: F = ma. First, we differentiate the position function twice to get acceleration: v(t) = dx/dt = 6t - 4, and a(t) = dv/dt = 6. Therefore, F = ma = 2.0 kg × 6 m/s² = 12 N (constant).\n\nProblem 2: A satellite of mass 200 kg orbits Earth at a distance of 8000 km from Earth's center. Calculate the satellite's orbital speed and period. The mass of Earth is 5.97 × 10²⁴ kg, and G = 6.67 × 10⁻¹¹ N·m²/kg²."
      },
      {
        id: "physics-midterm",
        title: "Physics Midterm Exam Preparation",
        className: "Physics 202",
        teacherName: "Prof. Johnson",
        dueDate: getFutureDate(20),
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
        citationCount: 0,
        content: ""
      },
      {
        id: "7",
        title: "Lab Report: Pendulum Motion",
        className: "Physics 202",
        teacherName: "Prof. Johnson",
        dueDate: getPastDate(35),
        status: "submitted",
        startedOn: getPastDate(43),
        submittedOn: getPastDate(36),
        timeSpent: 200,
        wordCount: 1500,
        citationCount: 6,
        grade: "A",
        content: "Introduction: This experiment investigates the relationship between pendulum length and period of oscillation. The simple pendulum serves as a model for harmonic motion and allows us to verify the theoretical relationship T = 2π√(L/g).\n\nMethodology: Five pendulums of different lengths (0.5m, 0.75m, 1.0m, 1.25m, and 1.5m) were constructed using string and a metal sphere. For each pendulum, we measured the time for 20 complete oscillations and divided by 20 to determine the period. Each measurement was repeated three times to minimize random error.\n\nResults: The data confirmed the theoretical relationship between length and period. When plotting T² against L, we obtained a straight line with slope 4π²/g, yielding an experimental value for g of 9.79 m/s², which differs from the accepted value by only 0.2%.\n\nConclusion: The experiment successfully verified the theoretical model of pendulum motion, demonstrating that the period is proportional to the square root of length and independent of mass for small oscillations."
      },
      {
        id: "quantum-concepts",
        title: "Quantum Mechanics Concepts",
        className: "Physics 202",
        teacherName: "Prof. Johnson",
        dueDate: getPastDate(15),
        status: "submitted",
        startedOn: getPastDate(25),
        submittedOn: getPastDate(16),
        timeSpent: 175,
        wordCount: 1250,
        citationCount: 5,
        grade: "A-",
        content: "Quantum mechanics represents one of the most profound shifts in our understanding of physical reality. Unlike classical physics, which describes phenomena at macroscopic scales, quantum mechanics governs the behavior of matter and energy at the atomic and subatomic levels.\n\nThe wave-particle duality, first proposed by Louis de Broglie, suggests that all matter exhibits both wave-like and particle-like properties. This concept was experimentally confirmed by the double-slit experiment, which demonstrates that electrons can create interference patterns like waves while also being detected as discrete particles.\n\nHeisenberg's uncertainty principle states that it is impossible to simultaneously know both the position and momentum of a particle with perfect precision. This is not merely a limitation of our measuring instruments but a fundamental property of quantum systems.\n\nQuantum entanglement, described by Einstein as 'spooky action at a distance,' occurs when pairs of particles become correlated in such a way that the quantum state of each particle cannot be described independently of the other, regardless of the distance separating them."
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
        dueDate: getFutureDate(10),
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
        citationCount: 0,
        content: ""
      },
      {
        id: "history-presentation",
        title: "Civil War Presentation",
        className: "History 105",
        teacherName: "Dr. Williams",
        dueDate: getFutureDate(8),
        status: "in_progress",
        startedOn: getPastDate(3),
        timeSpent: 45,
        wordCount: 320,
        copyPasteCount: 0,
        citationCount: 1,
        lastActive: getPastDate(1),
        content: "The American Civil War (1861-1865) was a pivotal moment in U.S. history, fundamentally transforming the nation and resolving two critical questions left unaddressed by the revolution: whether the United States would remain a single nation or separate into independent states, and whether slavery would continue in a country founded on the principle that \"all men are created equal.\"\n\nCauses of the Civil War included economic differences between the industrialized North and the agricultural South, states' rights versus federal authority, and most significantly, the moral issue of slavery. The election of Abraham Lincoln in 1860, who opposed the expansion of slavery, triggered the secession of several Southern states."
      },
      {
        id: "8",
        title: "World War II Analysis",
        className: "History 105",
        teacherName: "Dr. Williams",
        dueDate: getPastDate(32),
        status: "submitted",
        startedOn: getPastDate(40),
        submittedOn: getPastDate(33),
        timeSpent: 240,
        wordCount: 1800,
        citationCount: 8,
        grade: "A+",
        content: "The causes of World War II can be traced directly to the aftermath of World War I and the Treaty of Versailles. The harsh economic penalties imposed on Germany created conditions of poverty and resentment that Hitler exploited to gain power. The policy of appeasement pursued by Britain and France allowed Germany to rebuild its military and annex territories without consequence.\n\nThe war in Europe began with Germany's invasion of Poland in September 1939. Using Blitzkrieg tactics, German forces quickly conquered much of Europe. The United States entered the war after Japan's attack on Pearl Harbor in December 1941, transforming it into a truly global conflict.\n\nThe war's conclusion saw the emergence of the United States and Soviet Union as superpowers, setting the stage for the Cold War that would dominate international relations for decades to come. The founding of the United Nations represented an attempt to prevent future conflicts through international cooperation and diplomacy."
      },
      {
        id: "ancient-civilizations",
        title: "Ancient Civilizations Comparison",
        className: "History 105",
        teacherName: "Dr. Williams",
        dueDate: getPastDate(50),
        status: "submitted",
        startedOn: getPastDate(60),
        submittedOn: getPastDate(51),
        timeSpent: 210,
        wordCount: 1600,
        citationCount: 7,
        grade: "A",
        content: "The ancient civilizations of Mesopotamia, Egypt, India, and China developed along major river valleys, which provided fertile land for agriculture and facilitated trade. Despite their geographical separation, these civilizations exhibited remarkable parallels in their development of writing systems, organized religion, centralized governance, and monumental architecture.\n\nMesopotamia, situated between the Tigris and Euphrates rivers, is often called the 'cradle of civilization.' The Sumerians developed cuneiform, one of the earliest writing systems, and built ziggurats to honor their gods. Their political structure consisted of independent city-states that frequently warred with each other.\n\nEgyptian civilization, centered around the Nile River, was characterized by remarkable stability and continuity. The pharaoh, considered a divine intermediary, ruled over a highly centralized state. The Egyptians' religious beliefs, particularly their focus on the afterlife, led to the construction of elaborate tombs and pyramids that have endured for millennia.\n\nThe Indus Valley civilization flourished along the Indus River in what is now Pakistan and western India. Known for its sophisticated urban planning, the cities of Harappa and Mohenjo-daro featured grid-like street layouts, advanced drainage systems, and standardized weights and measures, suggesting a highly organized society.\n\nChinese civilization developed along the Yellow and Yangtze Rivers. The concept of the Mandate of Heaven legitimized imperial rule, while Confucian philosophy emphasized proper social relationships and ancestral veneration. China's relative isolation from other major civilizations contributed to its cultural distinctiveness and technological self-sufficiency."
      }
    ]
  },
  {
    id: "c4",
    name: "Computer Science 301",
    teacherName: "Prof. Chen",
    semester: "Fall 2023",
    assignments: [
      {
        id: "cs-algorithm",
        title: "Algorithm Analysis",
        className: "Computer Science 301",
        teacherName: "Prof. Chen",
        dueDate: getFutureDate(12),
        status: "in_progress",
        startedOn: getPastDate(4),
        timeSpent: 110,
        wordCount: 780,
        copyPasteCount: 2,
        citationCount: 3,
        lastActive: getPastDate(2),
        content: "Time complexity analysis is fundamental to understanding algorithm efficiency. Big O notation characterizes an algorithm's efficiency in terms of its input size, focusing on the worst-case scenario.\n\nFor example, linear search has O(n) time complexity because in the worst case, it must examine every element. Binary search improves to O(log n) by repeatedly dividing the search interval in half, but requires a sorted array.\n\nSpace complexity is equally important, especially for memory-constrained environments. An algorithm using a fixed amount of memory regardless of input size has O(1) space complexity, while one creating data structures proportional to input has O(n) complexity."
      },
      {
        id: "cs-database",
        title: "Database Design Project",
        className: "Computer Science 301",
        teacherName: "Prof. Chen",
        dueDate: getFutureDate(22),
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
        citationCount: 0,
        content: ""
      },
      {
        id: "cs-networks",
        title: "Computer Networks Essay",
        className: "Computer Science 301",
        teacherName: "Prof. Chen",
        dueDate: getPastDate(25),
        status: "submitted",
        startedOn: getPastDate(35),
        submittedOn: getPastDate(26),
        timeSpent: 180,
        wordCount: 1650,
        citationCount: 5,
        grade: "A-",
        content: "Computer networks form the backbone of modern digital communication, enabling the exchange of information between devices across various distances. The OSI (Open Systems Interconnection) model provides a conceptual framework dividing network communication into seven layers, each serving a specific function.\n\nAt the physical layer, data is transmitted as bits through physical media like copper wires or fiber optic cables. The data link layer handles node-to-node communication, managing access to the physical medium and detecting transmission errors.\n\nThe Internet Protocol (IP) operates at the network layer, providing logical addressing and routing between networks. Transport protocols like TCP ensure reliable data delivery, while applications interact through protocols like HTTP at the application layer.\n\nRecent advances in networking include software-defined networking (SDN), which separates the control plane from the data plane, and 5G technology, which promises faster speeds, lower latency, and support for massive IoT deployments."
      },
      {
        id: "data-structures",
        title: "Advanced Data Structures Implementation",
        className: "Computer Science 301",
        teacherName: "Prof. Chen",
        dueDate: getPastDate(18),
        status: "submitted",
        startedOn: getPastDate(28),
        submittedOn: getPastDate(19),
        timeSpent: 195,
        wordCount: 1420,
        citationCount: 4,
        grade: "A",
        content: "Data structures are specialized formats for organizing and storing data to facilitate various operations efficiently. The choice of data structure depends on the specific operations required and the constraints of the problem domain.\n\nTrees are hierarchical data structures with a root value and subtrees as children. Binary search trees maintain the property that the left subtree of a node contains only values less than the node's value, while the right subtree contains only values greater than the node's value. This property enables efficient searching, insertion, and deletion operations, typically in O(log n) time for balanced trees.\n\nBalanced trees, such as AVL trees and Red-Black trees, maintain balance through rotations and recoloring, ensuring that operations remain efficient even with dynamic data. AVL trees guarantee that the heights of two child subtrees differ by at most one, while Red-Black trees maintain balance through a set of properties including node coloring.\n\nGraphs represent connections between objects, consisting of vertices (nodes) and edges (connections). They can be directed or undirected, weighted or unweighted. Algorithms like Dijkstra's for shortest paths and Kruskal's for minimum spanning trees operate on graph data structures.\n\nHash tables provide average-case O(1) time complexity for insertions, deletions, and lookups by mapping keys to array indices using a hash function. Collision resolution techniques, such as chaining and open addressing, handle situations where different keys hash to the same index."
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
    return updatedAssignment;
  };
  
  // Function to get an assignment by ID
  const getAssignment = (id: string | null) => {
    if (!id) return null;
    return assignments.find(assignment => assignment.id === id) || null;
  };
  
  // Function to create a new document/assignment
  const createDocument = (title: string = "Untitled Document", linkedAssignmentId: string | null = null): Assignment => {
    // If linking to existing assignment, just return that
    if (linkedAssignmentId) {
      const existingAssignment = assignments.find(a => a.id === linkedAssignmentId);
      if (existingAssignment) {
        // Update assignment status if not already in progress
        if (existingAssignment.status !== "in_progress") {
          const updatedAssignment: Assignment = {
            ...existingAssignment,
            status: "in_progress",
            startedOn: existingAssignment.startedOn || new Date().toISOString(),
            lastActive: new Date().toISOString()
          };
          return updateAssignment(updatedAssignment);
        }
        return existingAssignment;
      }
    }
    
    // Check if we already have a document with this title and no class
    const existingDoc = assignments.find(a => 
      a.title === title && 
      a.className === "Personal Documents" &&
      !linkedAssignmentId
    );
    
    if (existingDoc) {
      return existingDoc;
    }
    
    // Create new document
    const newAssignment: Assignment = {
      id: `new-${Date.now()}`,
      title,
      className: "Personal Documents",
      teacherName: "N/A",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
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
