
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/common/Card";

// Mock data for start time distribution
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

export function StartTimeChart() {
  return (
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
  );
}
