/**
 * TimeDistributionChart.tsx
 * 
 * This component renders a chart displaying the time distribution of assignments,
 * showing how much time students spend on their assignments.
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
 * - `data`: array - The data for the chart, including time distribution.
 * 
 * Postconditions:
 * - Renders a chart displaying the time distribution of assignments.
 * 
 * Return Values:
 * - None directly, but renders a chart element.
 */
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/common/Card";

interface TimeDistributionChartProps {
  data: { range: string; count: number }[];
}

export function TimeDistributionChart({ data }: TimeDistributionChartProps) {
  // Check if data is empty or all counts are zero
  const hasData = data.some(item => item.count > 0);

  return (
    <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-4">
        <h3 className="font-medium text-base font-playfair mb-4 dark:text-white">Time Spent Distribution</h3>
        {hasData ? (
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
                domain={[0, 'dataMax']}
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
        ) : (
          <div className="flex items-center justify-center h-[200px] text-muted-foreground dark:text-gray-400">
            <p>No time distribution data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
