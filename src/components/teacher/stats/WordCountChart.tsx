
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/common/Card";

// Mock data for word count distribution
const wordCountDistributionData = [
  { name: "<500", count: 6 },
  { name: "500-750", count: 8 },
  { name: "750-1000", count: 9 },
  { name: "1000-1250", count: 4 },
  { name: ">1250", count: 3 },
];

export function WordCountChart() {
  return (
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
  );
}
