
/**
 * ClassCard.tsx
 * 
 * This component renders a single class card in the student classes list.
 */

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassCardProps {
  cls: any;
}

export default function ClassCard({ cls }: ClassCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="h-2 bg-authentiya-charcoal"></div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-authentiya-maroon/10 flex items-center justify-center">
            <School className="h-4 w-4 text-authentiya-maroon" />
          </div>
          <div>
            <h3 className="font-semibold text-lg font-playfair">{cls.name}</h3>
            <p className="text-sm text-muted-foreground">{cls.semester}</p>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground flex gap-1 items-center mb-3">
          <GraduationCap className="h-3 w-3" />
          <span>{cls.teacherName}</span>
        </div>
        
        <div className="p-2 bg-gray-50/50 dark:bg-gray-900/20 rounded border border-gray-100 dark:border-gray-900/30 mb-3">
          <div className="flex justify-between text-xs">
            <span>Active Assignments:</span>
            <span className="font-medium">{cls.assignments.filter(a => a.status === "in_progress").length}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Pending Assignments:</span>
            <span className="font-medium">{cls.assignments.filter(a => a.status === "not_started").length}</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => navigate("/dashboard")}
        >
          View Class
        </Button>
      </CardContent>
    </Card>
  );
}
