
/**
 * File: WordCountChart.tsx
 * 
 * Description: This component displays a bar chart showing the distribution of word counts
 * across student assignments. It helps teachers identify patterns in assignment length
 * and potential areas where students might need support with content development.
 * 
 * Update: Fixed data display issues and added better handling for empty data scenarios.
 */

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/common/Card";

interface WordCountChartProps {
  data: { name: string; count: number }[];
}

export function WordCountChart({ data }: WordCountChartProps) {
  // Check if data is empty or all counts are zero
  const hasData = data.some(item => item.count > 0);

  return (
    <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-4">
        <h3 className="font-medium text-base font-playfair mb-4 dark:text-white">Word Count Distribution</h3>
        {hasData ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <XAxis 
                dataKey="name" 
                fontSize={12} 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#4B5563' }}
              />
              <YAxis 
                allowDecimals={false} 
                fontSize={12}
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#4B5563' }}
                domain={[0, 'auto']}
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
              />
              <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            <p>No word count data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
