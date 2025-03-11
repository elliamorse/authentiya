
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/common/Card";

interface TimeDistributionChartProps {
  data: { range: string; count: number }[];
}

export function TimeDistributionChart({ data }: TimeDistributionChartProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-4">Time Spent Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="range" fontSize={12} />
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
