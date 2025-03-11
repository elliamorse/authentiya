
/**
 * File: StatusPieChart.tsx
 * 
 * Description: This component shows the distribution of assignment status across all students
 * using a pie chart. It provides a quick overview of how many students have started,
 * completed, or not yet begun their assignments.
 * 
 * Update: Improved chart rendering and handling of empty data scenarios.
 */

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/common/Card";

interface StatusPieChartProps {
  notStarted: number;
  inProgress: number;
  submitted: number;
}

export function StatusPieChart({ notStarted, inProgress, submitted }: StatusPieChartProps) {
  const data = [
    { name: "Not Started", value: notStarted, color: "#F59E0B" },
    { name: "In Progress", value: inProgress, color: "#3B82F6" },
    { name: "Submitted", value: submitted, color: "#10B981" }
  ].filter(item => item.value > 0); // Only show segments with values

  // Check if there's any data to display
  const hasData = data.length > 0;
  const total = notStarted + inProgress + submitted;

  return (
    <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-4">
        <h3 className="font-medium text-base font-playfair mb-4 dark:text-white">Submission Status</h3>
        {hasData ? (
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(249, 250, 251, 0.95)',
                    color: '#1F2937'
                  }}
                  formatter={(value, name) => [`${value} students (${Math.round((value as number / total) * 100)}%)`, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            <p>No status data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
