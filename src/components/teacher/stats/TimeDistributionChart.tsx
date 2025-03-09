
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/common/Card";

// Mock data for time distribution
const timeDistributionData = [
  { name: "0-30m", count: 5 },
  { name: "30-60m", count: 8 },
  { name: "1-2h", count: 10 },
  { name: "2-3h", count: 4 },
  { name: ">3h", count: 3 },
];

export function TimeDistributionChart() {
  return (
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
  );
}
