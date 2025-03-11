
/**
 * File: TimeDistributionChart.tsx
 * 
 * Description: This component displays a bar chart showing the distribution of time
 * spent by students on assignments. The data is grouped into time ranges (e.g., <30m, 30m-1h, etc.)
 * to provide teachers with insights into student work patterns.
 */

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/common/Card";
import { StudentAssignment } from "@/lib/teacher-data";

interface TimeDistributionChartProps {
  data: { range: string; count: number }[];
}

export function TimeDistributionChart({ data }: TimeDistributionChartProps) {
  return (
    <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-4">
        <h3 className="font-medium text-base font-playfair mb-4 dark:text-white">Time Spent Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
            <XAxis 
              dataKey="range" 
              fontSize={12} 
              tick={{ fill: '#6B7280' }}
              axisLine={{ stroke: '#4B5563' }}
            />
            <YAxis 
              allowDecimals={false} 
              fontSize={12}
              tick={{ fill: '#6B7280' }}
              axisLine={{ stroke: '#4B5563' }}
            />
            <Tooltip
              contentStyle={{ 
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(249, 250, 251, 0.95)',
                color: '#1F2937'
              }}
              formatter={(value) => [`${value} students`, 'Count']}
              wrapperStyle={{ zIndex: 1000 }}
            />
            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
