
/**
 * StudentAssignments.tsx
 * 
 * This component serves as the Assignments page for student users, displaying
 * a list of their assignments and documents with filtering capabilities.
 * 
 * Created by: Authentiya Development Team
 * Created on: 2023-11-05
 * 
 * Revision History:
 * - 2023-12-12: Added document filtering by status by Authentiya Team
 * - 2024-01-10: Integrated with DocumentsSection component by Authentiya Team
 * - 2024-06-22: Fixed badge variant type issue by Authentiya Team
 * 
 * Preconditions:
 * - Must be used within a React component tree with router context
 * - Requires mock data for demonstration (would connect to backend in production)
 * 
 * Input Types:
 * - None directly, uses internal state and mock data
 * 
 * Postconditions:
 * - Renders a page with filterable document list
 * - Allows navigation to document editor
 * 
 * Return:
 * - React.ReactNode - The rendered component
 * 
 * Error Conditions:
 * - None specifically handled
 * 
 * Side Effects:
 * - Updates localStorage with document data when a document is opened
 * - Navigates to dashboard when a document is opened
 * 
 * Invariants:
 * - Always shows document filtering options even if no documents match the filter
 * 
 * Known Faults:
 * - Uses mock data instead of actual backend connection
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
  // Navigation hook for redirecting to other pages
  const navigate = useNavigate();
  
  // State for documents and filters
  const [documents, setDocuments] = useState(studentDocuments);
  const [documentStatus, setDocumentStatus] = useState<string>("all");
  
  // Helper function to format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Helper function to format date and time for display
  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Filter documents based on selected status
  const filteredDocuments = documents.filter(doc => {
    if (documentStatus === "all") return true;
    return doc.status === documentStatus;
  });
  
  // Handle opening a document
  const handleOpenDocument = (doc: any) => {
    // Store document data in localStorage for the editor
    window.localStorage.setItem("currentDocument", doc.content || "");
    window.localStorage.setItem("documentName", doc.title);
    
    // If document is linked to an assignment, store that info too
    if (doc.assignmentId) {
      window.localStorage.setItem("linkedAssignment", doc.assignmentId);
      window.localStorage.setItem("linkedAssignmentTitle", doc.title);
    } else {
      window.localStorage.removeItem("linkedAssignment");
      window.localStorage.removeItem("linkedAssignmentTitle");
    }
    
    // Navigate to the document editor
    navigate("/dashboard");
  };
  
  // Render status badge based on document status
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
          <Badge variant="default" className="flex items-center gap-1">
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
  
  // Render the page
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Page header with navigation */}
      <Header 
        userEmail="student@example.com" 
        userRole="student" 
        onLogout={() => navigate("/")} 
      />
      
      {/* Main content */}
      <main className="flex-1 container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
            My Documents
          </h1>
          <p className="text-muted-foreground">
            View and manage all your documents
          </p>
        </div>
        
        {/* Documents section with filtering */}
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
