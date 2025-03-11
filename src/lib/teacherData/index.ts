
/**
 * index.ts
 * 
 * This is the main entry point for the teacher data module.
 * It exports all types and functions that should be accessible to components.
 */

// Export types
export type { Assignment, StudentAssignment, ClassInfo, Comment } from './types';

// Export helper functions
export {
  getStudentsByAssignment,
  getAssignmentsForClass,
  getAssignmentById,
  getClassesForTeacher,
  getStudentAssignments,
  getStudentAssignment,
  addCommentToStudentAssignment
} from './helpers';

// Export mock data if needed directly (though generally accessing via helpers is preferred)
export { mockAssignments, mockStudentAssignments, mockClasses } from './mockData';
