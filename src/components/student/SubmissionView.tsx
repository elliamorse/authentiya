
/**
 * SubmissionView.tsx
 * 
 * This component displays a submitted assignment in read-only mode.
 * It shows the assignment details and content without allowing edits.
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Book, GraduationCap, Calendar, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { studentDocuments } from "../../pages/student/mockData";

export default function SubmissionView() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [document, setDocument] = useState<any>(null);

  useEffect(() => {
    // Find the document by ID
    const foundDoc = studentDocuments.find(doc => doc.id === docId);
    
    if (foundDoc) {
      setDocument(foundDoc);
    } else {
      // If no document is found, redirect back to assignments
      navigate("/student/assignments");
    }
  }, [docId, navigate]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/student/assignments");
  };

  if (!document) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CheckCircle className="h-5 w-5 text-green-500" /> 
            Submitted Assignment
          </DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <h2 className="text-2xl font-bold mb-4 font-playfair">{document.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              {document.className && (
                <div className="flex items-center gap-2 text-sm">
                  <Book className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Class:</span>
                  <span className="font-medium">{document.className}</span>
                </div>
              )}
              
              {document.teacherName && (
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Teacher:</span>
                  <span className="font-medium">{document.teacherName}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              {document.dueDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Due Date:</span>
                  <span className="font-medium">{formatDate(document.dueDate)}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="success" className="flex items-center h-5 gap-1">
                  <CheckCircle className="h-3 w-3" /> Submitted
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Assignment Content:</h3>
            <div className="border rounded-md p-4 bg-gray-50 min-h-[300px] max-h-[400px] overflow-y-auto whitespace-pre-line">
              {document.content || "No content available"}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> 
            Back to Assignments
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
