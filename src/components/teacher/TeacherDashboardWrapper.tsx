
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherDashboard from "./Dashboard";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface TeacherDashboardWrapperProps {
  userEmail: string | null;
}

export default function TeacherDashboardWrapper({ userEmail }: TeacherDashboardWrapperProps) {
  const navigate = useNavigate();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState("1");
  
  return (
    <main className="flex-1 container py-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-playfair">Assignment Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor student progress and assignment metrics
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            className="academic-btn-primary flex items-center gap-1"
            onClick={() => navigate("/teacher")}
          >
            <GraduationCap className="h-4 w-4" />
            Go to Classes
          </Button>
        </div>
      </div>
      
      <TeacherDashboard
        selectedAssignmentId={selectedAssignmentId}
        onAssignmentSelect={setSelectedAssignmentId}
      />
    </main>
  );
}
