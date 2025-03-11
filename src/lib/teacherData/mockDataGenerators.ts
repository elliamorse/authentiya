
/**
 * mockDataGenerators.ts
 * 
 * This file contains helper functions for generating random mock data
 * for student assignments, statuses, and dates.
 */

// Helper function to generate random time spent (minutes)
export const generateRandomTimeSpent = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate random word count
export const generateRandomWordCount = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate random date in the past few days
export const generateRandomDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  return date.toISOString();
};

// Helper function to generate random status with distribution
export const generateRandomStatus = (): "not_started" | "in_progress" | "submitted" => {
  const rand = Math.random();
  if (rand < 0.3) return "not_started";
  if (rand < 0.7) return "in_progress";
  return "submitted";
};
