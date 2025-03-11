
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
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-4">Submission Status</h3>
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
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`${value} students`, '']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
