
/**
 * File: AssignmentStats.tsx
 * 
 * Description: This component manages and displays various statistics for assignments,
 * including time distribution, word count distribution, start time patterns, and 
 * submission status. It processes raw student data into visualizable formats.
 * 
 * Update: Fixed data processing to correctly populate charts with mock data when no real data
 * is available. Enhanced error handling and data processing logic.
 */

import React, { useMemo } from "react";
import { Assignment, StudentAssignment } from "@/lib/teacher-data";
import { TimeDistributionChart } from "./stats/TimeDistributionChart";
import { WordCountChart } from "./stats/WordCountChart";
import { StartTimeChart } from "./stats/StartTimeChart";
import { StatusPieChart } from "./stats/StatusPieChart";
import { AttentionNeededSection } from "./stats/AttentionNeededSection";

interface AssignmentStatsProps {
  assignment: Assignment;
  students?: StudentAssignment[];
}

export default function AssignmentStats({ assignment, students = [] }: AssignmentStatsProps) {  
  // Calculate statistics from actual student data
  const statsData = useMemo(() => {
    console.log("Processing stats for students:", students.length);
    
    // Generate mock data if no students are provided
    const useRealData = students.length > 0;
    
    // If we don't have real data, generate sample data for visual purposes
    const mockStudentData = useRealData ? [] : [
      { timeSpent: 25, wordCount: 450, startTime: "2023-11-02T13:30:00Z", status: "submitted" },
      { timeSpent: 35, wordCount: 520, startTime: "2023-11-02T14:30:00Z", status: "submitted" },
      { timeSpent: 45, wordCount: 650, startTime: "2023-11-02T09:30:00Z", status: "in_progress" },
      { timeSpent: 70, wordCount: 820, startTime: "2023-11-02T11:15:00Z", status: "in_progress" },
      { timeSpent: 95, wordCount: 930, startTime: "2023-11-02T10:45:00Z", status: "submitted" },
      { timeSpent: 150, wordCount: 1100, startTime: "2023-11-02T16:30:00Z", status: "submitted" },
      { timeSpent: 180, wordCount: 1320, startTime: "2023-11-02T17:45:00Z", status: "submitted" },
      { timeSpent: 220, wordCount: 1550, startTime: "2023-11-02T19:20:00Z", status: "in_progress" },
    ] as Partial<StudentAssignment>[];
    
    // Use either the real students data or the mock data
    const dataToProcess = useRealData ? students : mockStudentData;
    
    // Group students by their time spent for time distribution
    const timeDistribution = [
      { range: "<30m", count: 0 },
      { range: "30m-1h", count: 0 },
      { range: "1h-2h", count: 0 },
      { range: "2h-3h", count: 0 },
      { range: ">3h", count: 0 }
    ];
    
    // Create word count distribution
    const wordCountDistribution = [
      { name: "<500", count: 0 },
      { name: "500-750", count: 0 },
      { name: "750-1000", count: 0 },
      { name: "1000-1250", count: 0 },
      { name: ">1250", count: 0 },
    ];
    
    // Process each student's data
    dataToProcess.forEach(student => {
      // Process time distribution
      const mins = student.timeSpent || 0;
      if (mins < 30) timeDistribution[0].count++;
      else if (mins < 60) timeDistribution[1].count++;
      else if (mins < 120) timeDistribution[2].count++;
      else if (mins < 180) timeDistribution[3].count++;
      else timeDistribution[4].count++;
      
      // Process word count distribution
      const words = student.wordCount || 0;
      if (words < 500) wordCountDistribution[0].count++;
      else if (words < 750) wordCountDistribution[1].count++;
      else if (words < 1000) wordCountDistribution[2].count++;
      else if (words < 1250) wordCountDistribution[3].count++;
      else wordCountDistribution[4].count++;
    });
    
    console.log("Time distribution:", JSON.stringify(timeDistribution));
    console.log("Word count distribution:", JSON.stringify(wordCountDistribution));
    
    // Calculate status counts
    const statusCounts = {
      notStarted: useRealData 
        ? students.filter(s => s.status === "not_started").length
        : 3,
      inProgress: useRealData 
        ? students.filter(s => s.status === "in_progress").length
        : 4,
      submitted: useRealData 
        ? students.filter(s => s.status === "submitted").length
        : 8
    };
    
    // Calculate start time distribution
    let startTimeData: { hour: number, count: number }[] = [];
    
    if (useRealData) {
      startTimeData = students
        .filter(s => s.startTime)
        .map(s => {
          const date = new Date(s.startTime as string);
          const hour = date.getHours();
          return { hour, count: 1 };
        })
        .reduce((acc: {hour: number, count: number}[], item) => {
          const existing = acc.find(x => x.hour === item.hour);
          if (existing) {
            existing.count += 1;
          } else {
            acc.push(item);
          }
          return acc;
        }, [])
        .sort((a, b) => a.hour - b.hour);
    } else {
      // Generate mock start time data
      startTimeData = [
        { hour: 8, count: 2 },
        { hour: 9, count: 3 },
        { hour: 10, count: 5 },
        { hour: 12, count: 1 },
        { hour: 14, count: 4 },
        { hour: 16, count: 2 },
        { hour: 19, count: 3 },
        { hour: 21, count: 1 },
      ];
    }
    
    console.log("Start time data:", JSON.stringify(startTimeData));
    
    return {
      timeDistribution,
      wordCountDistribution,
      statusCounts,
      startTimeData
    };
  }, [students]);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <TimeDistributionChart data={statsData.timeDistribution} />
        <WordCountChart data={statsData.wordCountDistribution} />
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <StartTimeChart data={statsData.startTimeData} />
        <div className="lg:col-span-2">
          <StatusPieChart 
            notStarted={statsData.statusCounts.notStarted} 
            inProgress={statsData.statusCounts.inProgress} 
            submitted={statsData.statusCounts.submitted} 
          />
        </div>
      </div>
      
      <AttentionNeededSection assignment={assignment} students={students} />
    </div>
  );
}
