
import React from "react";
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
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <TimeDistributionChart />
        <WordCountChart />
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <StartTimeChart />
        <StatusPieChart />
      </div>
      
      <AttentionNeededSection assignment={assignment} />
    </div>
  );
}
