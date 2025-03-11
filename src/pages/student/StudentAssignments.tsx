
/**
 * StudentAssignments.tsx
 * 
 * This component displays a list of student assignments and documents.
 * It now focuses solely on document management, with the tab functionality simplified to only show documents.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { FileText } from "lucide-react";
import DocumentsSection from "@/components/student/DocumentsSection";
import { Badge } from "@/components/common/Badge";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

// Import mock data (in a real app, this would come from an API)
import { studentClasses, studentDocuments } from "./mockData";

export default function StudentAssignments() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(studentDocuments);
  const [documentStatus, setDocumentStatus] = useState<string>("all");
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const filteredDocuments = documents.filter(doc => {
    if (documentStatus === "all") return true;
    return doc.status === documentStatus;
  });
  
  const handleOpenDocument = (doc: any) => {
    window.localStorage.setItem("currentDocument", doc.content || "");
    window.localStorage.setItem("documentName", doc.title);
    
    if (doc.assignmentId) {
      window.localStorage.setItem("linkedAssignment", doc.assignmentId);
      window.localStorage.setItem("linkedAssignmentTitle", doc.title);
    } else {
      window.localStorage.removeItem("linkedAssignment");
      window.localStorage.removeItem("linkedAssignmentTitle");
    }
    
    navigate("/dashboard");
  };
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return (
          <Badge variant="info" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> In Progress
          </Badge>
        );
      case "not_started":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Not Started
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <FileText className="h-3 w-3" /> Draft
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Complete
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        userEmail="student@example.com" 
        userRole="student" 
        onLogout={() => navigate("/")} 
      />
      
      <main className="flex-1 container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
            My Documents
          </h1>
          <p className="text-muted-foreground">
            View and manage all your documents
          </p>
        </div>
        
        <DocumentsSection
          documentStatus={documentStatus}
          setDocumentStatus={setDocumentStatus}
          filteredDocuments={filteredDocuments}
          renderStatusBadge={renderStatusBadge}
          formatDate={formatDate}
          formatDateTime={formatDateTime}
          onOpenDocument={handleOpenDocument}
          documents={documents}
          setDocuments={setDocuments}
        />
      </main>
    </div>
  );
}
