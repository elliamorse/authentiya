
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
