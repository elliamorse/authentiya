import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { AlertTriangle, Clock } from "lucide-react";
import { Assignment, StudentAssignment } from "@/lib/teacher-data";

interface AssignmentStatsProps {
  assignment: Assignment;
  students?: StudentAssignment[];
}

// Mock data for assignment statistics
const timeDistributionData = [
  { name: "0-30m", count: 5 },
  { name: "30-60m", count: 8 },
  { name: "1-2h", count: 10 },
  { name: "2-3h", count: 4 },
  { name: ">3h", count: 3 },
];

const wordCountDistributionData = [
  { name: "<500", count: 6 },
  { name: "500-750", count: 8 },
  { name: "750-1000", count: 9 },
  { name: "1000-1250", count: 4 },
  { name: ">1250", count: 3 },
];

const startTimeDistributionData = [
  { day: "Nov 1", count: 2 },
  { day: "Nov 2", count: 3 },
  { day: "Nov 3", count: 1 },
  { day: "Nov 4", count: 0 },
  { day: "Nov 5", count: 5 },
  { day: "Nov 6", count: 3 },
  { day: "Nov 7", count: 2 },
  { day: "Nov 8", count: 4 },
  { day: "Nov 9", count: 2 },
];

// Mock data for student status
const statusData = [
  { name: "Submitted", value: 16, color: "#10B981" },
  { name: "In Progress", value: 6, color: "#3B82F6" },
  { name: "Not Started", value: 6, color: "#9CA3AF" },
];

// Students that need attention
const attentionStudents = [
  {
    id: "3",
    name: "Michael Chen",
    status: "not_started",
    issue: "Has not started yet, due date approaching",
  },
  {
    id: "4",
    name: "Sophia Patel",
    issue: "Working much slower than peers (30 min, only 250 words)",
  },
  {
    id: "7",
    name: "David Thompson",
    status: "in_progress",
    issue: "Started very late, may not complete on time",
  },
];

export default function AssignmentStats({ assignment, students = [] }: AssignmentStatsProps) {
  // Calculate time left until due date
  const dueDate = new Date(assignment.dueDate);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-4">Time Spent Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={timeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value} students`, 'Count']}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-4">Word Count Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={wordCountDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value} students`, 'Count']}
                />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-4">Students Starting Over Time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={startTimeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value} students`, 'Started']}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ stroke: '#3B82F6', strokeWidth: 2, fill: '#ffffff', r: 4 }}
                  activeDot={{ stroke: '#3B82F6', strokeWidth: 2, fill: '#3B82F6', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-4">Assignment Status</h3>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value} students`, 'Count']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Students Needing Attention</h3>
            <Badge variant="warning" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {attentionStudents.length} students
            </Badge>
          </div>
          
          <div className="space-y-3">
            {attentionStudents.map(student => (
              <div key={student.id} className="flex items-start gap-3 p-3 bg-yellow-50/50 rounded-md border border-yellow-100">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-muted-foreground">{student.issue}</div>
                </div>
              </div>
            ))}
          </div>
          
          {daysRemaining > 0 && daysRemaining <= 3 && (
            <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-100 flex items-center gap-3">
              <Clock className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium">Due Date Approaching</div>
                <div className="text-sm text-muted-foreground">
                  This assignment is due in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}. 
                  {assignment.studentsStarted < assignment.totalStudents && 
                    ` ${assignment.totalStudents - assignment.studentsStarted} students haven't started yet.`}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
