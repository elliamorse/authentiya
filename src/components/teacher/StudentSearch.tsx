
/**
 * StudentSearch.tsx
 * 
 * This component provides search functionality for existing students
 * and allows teachers to add them directly to their classes.
 */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Search, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface StudentSearchProps {
  classId: string;
  onStudentAdded: () => void;
}

interface Student {
  student_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

export default function StudentSearch({ classId, onStudentAdded }: StudentSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: students, isLoading } = useQuery({
    queryKey: ["available-students", classId],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc<Student>('get_available_students', { class_identifier: classId });
      
      if (error) throw error;
      return data;
    }
  });

  const filteredStudents = students?.filter(student => 
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addStudent = async (studentId: string) => {
    try {
      const { error } = await supabase.rpc(
        'add_student_to_class',
        { 
          student_identifier: studentId,
          class_identifier: classId
        }
      );
      
      if (error) throw error;
      
      toast.success("Student added to class successfully");
      onStudentAdded();
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error("Failed to add student to class");
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search existing students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-2">
          {filteredStudents?.map((student) => (
            <div
              key={student.student_id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card text-card-foreground"
            >
              <div>
                <p className="font-medium">
                  {student.first_name} {student.last_name}
                </p>
                <p className="text-sm text-muted-foreground">{student.email}</p>
              </div>
              <Button 
                onClick={() => addStudent(student.student_id)}
                size="sm"
                className="academic-btn-primary"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          ))}
          {filteredStudents?.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No existing students found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
