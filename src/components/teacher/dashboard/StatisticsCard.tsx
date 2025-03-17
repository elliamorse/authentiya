/**
 * StatisticsCard.tsx
 * 
 * This component renders a card displaying statistics for an assignment,
 * including metrics such as average grade, completion rate, and more.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * 
 * Preconditions:
 * - None identified.
 * 
 * Acceptable Input:
 * - `statistics`: object - The statistics details including average grade, completion rate, and more.
 * 
 * Postconditions:
 * - Renders a card with assignment statistics.
 * 
 * Return Values:
 * - None directly, but renders a card element.
 */

import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/common/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Users } from "lucide-react";
import { Assignment, StudentAssignment } from "@/lib/teacherData";
import AssignmentStats from "../AssignmentStats";
import StudentList from "../StudentList";

interface StatisticsCardProps {
  assignment: Assignment;
  students: StudentAssignment[];
  onViewStudent: (studentId: string) => void;
}

export function StatisticsCard({ assignment, students, onViewStudent }: StatisticsCardProps) {
  console.log("StatisticsCard received students:", students.length);
  
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Assignment Statistics</CardTitle>
        <CardDescription>
          Key metrics for {assignment.title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stats">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stats" className="animate-fade-in">
            <AssignmentStats assignment={assignment} students={students} />
          </TabsContent>
          <TabsContent value="students" className="animate-fade-in">
            <StudentList students={students} onViewStudent={onViewStudent} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
