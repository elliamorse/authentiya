
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
    label: `${item.hour}:00${item.hour < 12 ? 'am' : 'pm'}`
  }));

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-4">Start Time Distribution</h3>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip
                contentStyle={{ 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value} students`, 'Count']}
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-sm text-muted-foreground">No start time data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
