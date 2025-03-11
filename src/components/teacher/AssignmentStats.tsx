
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
    // Filter out students with no words written
    const activeStudents = students.filter(s => s.wordCount > 0);
    
    // Calculate average word count from active students only
    const avgWordCount = activeStudents.length > 0 
      ? Math.round(activeStudents.reduce((acc, s) => acc + s.wordCount, 0) / activeStudents.length) 
      : 0;
    
    // Group students by their time spent for time distribution
    const timeDistribution = [
      { range: "<30m", count: 0 },
      { range: "30m-1h", count: 0 },
      { range: "1h-2h", count: 0 },
      { range: "2h-3h", count: 0 },
      { range: ">3h", count: 0 }
    ];
    
    activeStudents.forEach(student => {
      const mins = student.timeSpent;
      if (mins < 30) timeDistribution[0].count++;
      else if (mins < 60) timeDistribution[1].count++;
      else if (mins < 120) timeDistribution[2].count++;
      else if (mins < 180) timeDistribution[3].count++;
      else timeDistribution[4].count++;
    });
    
    // Create word count distribution
    const wordCountDistribution = [
      { name: "<500", count: 0 },
      { name: "500-750", count: 0 },
      { name: "750-1000", count: 0 },
      { name: "1000-1250", count: 0 },
      { name: ">1250", count: 0 },
    ];
    
    activeStudents.forEach(student => {
      const words = student.wordCount;
      if (words < 500) wordCountDistribution[0].count++;
      else if (words < 750) wordCountDistribution[1].count++;
      else if (words < 1000) wordCountDistribution[2].count++;
      else if (words < 1250) wordCountDistribution[3].count++;
      else wordCountDistribution[4].count++;
    });
    
    // Calculate status counts
    const statusCounts = {
      notStarted: students.filter(s => s.status === "not_started").length,
      inProgress: students.filter(s => s.status === "in_progress").length,
      submitted: students.filter(s => s.status === "submitted").length
    };
    
    // Calculate start time distribution
    const startTimeData = activeStudents
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
    
    return {
      avgWordCount,
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
        <StatusPieChart 
          notStarted={statsData.statusCounts.notStarted} 
          inProgress={statsData.statusCounts.inProgress} 
          submitted={statsData.statusCounts.submitted} 
        />
      </div>
      
      <AttentionNeededSection assignment={assignment} students={students} />
    </div>
  );
}
