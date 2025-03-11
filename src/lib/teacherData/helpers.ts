
/**
 * helpers.ts
 * 
 * This file contains utility functions for retrieving and manipulating teacher data.
 * These functions provide access to student assignments, classes, and comments,
 * allowing components to easily filter and retrieve the data they need.
 */

import { Assignment, ClassInfo, Comment, StudentAssignment } from "./types";
import { mockAssignments, mockClasses, mockStudentAssignments } from "./mockData";

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
  const assignment = mockAssignments.find(assignment => assignment.id === assignmentId);
  
  if (assignment) {
    // Get actual student data for this assignment
    const studentAssignments = getStudentsByAssignment(assignmentId);
    
    // Calculate actual statistics from student data
    const totalStudents = studentAssignments.length;
    const studentsStarted = studentAssignments.filter(s => s.status !== 'not_started').length;
    const studentsSubmitted = studentAssignments.filter(s => s.status === 'submitted').length;
    
    // Calculate average time spent (only for students who have started)
    const startedAssignments = studentAssignments.filter(s => s.status !== 'not_started');
    const totalTimeSpent = startedAssignments.reduce((sum, s) => sum + s.timeSpent, 0);
    const averageTimeSpent = startedAssignments.length > 0 
      ? Math.round(totalTimeSpent / startedAssignments.length) 
      : 0;
    
    // Calculate average word count (only for students who have started)
    const totalWordCount = startedAssignments.reduce((sum, s) => sum + s.wordCount, 0);
    const averageWordCount = startedAssignments.length > 0 
      ? Math.round(totalWordCount / startedAssignments.length) 
      : 0;
    
    // Return assignment with updated statistics
    return {
      ...assignment,
      totalStudents,
      studentsStarted,
      studentsSubmitted,
      averageTimeSpent,
      averageWordCount
    };
  }
  
  return assignment;
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
