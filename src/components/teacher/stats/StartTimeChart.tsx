
/**
 * File: StartTimeChart.tsx
 * 
 * Description: This component visualizes when students typically start working on their
 * assignments throughout the day. This helps teachers understand student work patterns
 * and potentially identify optimal times for releasing new assignments or providing support.
 */

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/common/Card";

interface StartTimeChartProps {
  data: { hour: number; count: number }[];
}

export function StartTimeChart({ data = [] }: StartTimeChartProps) {
  // Format the hour labels
  const formattedData = data.map(item => ({
    ...item,
    label: `${item.hour % 12 || 12}${item.hour < 12 ? 'am' : 'pm'}`
  }));

  return (
    <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-4">
        <h3 className="font-medium text-base font-playfair mb-4 dark:text-white">Start Time Distribution</h3>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <XAxis 
                dataKey="label" 
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
                formatter={(value) => [`${value} students`, 'Started']}
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            <p>No start time data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
