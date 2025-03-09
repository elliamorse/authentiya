
// Add the following function to the end of the file

// Helper function to get students by assignment
export function getStudentsByAssignment(assignmentId: string): StudentAssignment[] {
  return mockStudentAssignments.filter(s => s.assignmentId === assignmentId);
}
