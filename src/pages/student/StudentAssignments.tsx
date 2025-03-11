
/**
 * StudentAssignments.tsx
 * 
 * This component displays a list of student assignments and documents.
 * It allows filtering by status and provides navigation to work on assignments.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";
import AssignmentSection from "@/components/student/AssignmentSection";
import DocumentsSection from "@/components/student/DocumentsSection";
import ClassCard from "@/components/student/ClassCard";
import EmptyState from "@/components/student/EmptyState";

// Import mock data (in a real app, this would come from an API)
import { studentClasses, studentDocuments } from "./mockData";

export default function StudentAssignments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("all");
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
  
  const allAssignments = studentClasses.flatMap(cls => 
    cls.assignments.map(assignment => ({
      ...assignment,
      className: cls.name,
      teacherName: cls.teacherName
    }))
  );
  
  const filteredAssignments = allAssignments.filter(assignment => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return assignment.status === "in_progress";
    if (activeTab === "pending") return assignment.status === "not_started";
    return false;
  });
  
  const filteredDocuments = documents.filter(doc => {
    if (activeTab !== "documents") return false;
    if (documentStatus === "all") return true;
    return doc.status === documentStatus;
  });
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 7);
  
  const groupedAssignments = {
    today: filteredAssignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    }),
    thisWeek: filteredAssignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate > today && dueDate <= endOfWeek;
    }),
    future: filteredAssignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate > endOfWeek;
    })
  };
  
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
  
  const renderClasses = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {studentClasses.map(cls => (
          <ClassCard key={cls.id} cls={cls} />
        ))}
      </div>
    );
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
            My Assignments
          </h1>
          <p className="text-muted-foreground">
            View and manage all your assignments across classes
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>In Progress</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Not Started</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="animate-fade-in">
            <AssignmentSection 
              title="Due Today" 
              assignments={groupedAssignments.today}
              formatDate={formatDate}
              onOpenDocument={handleOpenDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
            
            <AssignmentSection 
              title="Due This Week" 
              assignments={groupedAssignments.thisWeek}
              formatDate={formatDate}
              onOpenDocument={handleOpenDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
            
            <AssignmentSection 
              title="Future Assignments" 
              assignments={groupedAssignments.future}
              formatDate={formatDate}
              onOpenDocument={handleOpenDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
            
            {filteredAssignments.length === 0 && (
              <EmptyState 
                icon={BookOpen}
                message="No assignments found"
              />
            )}
          </TabsContent>
          
          <TabsContent value="active" className="animate-fade-in">
            <AssignmentSection 
              title="Due Today" 
              assignments={groupedAssignments.today}
              formatDate={formatDate}
              onOpenDocument={handleOpenDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
            
            <AssignmentSection 
              title="Due This Week" 
              assignments={groupedAssignments.thisWeek}
              formatDate={formatDate}
              onOpenDocument={handleOpenDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
            
            <AssignmentSection 
              title="Future Assignments" 
              assignments={groupedAssignments.future}
              formatDate={formatDate}
              onOpenDocument={handleOpenDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
            
            {filteredAssignments.length === 0 && (
              <EmptyState 
                icon={Clock}
                message="No active assignments"
              />
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="animate-fade-in">
            <AssignmentSection 
              title="Due Today" 
              assignments={groupedAssignments.today}
              formatDate={formatDate}
              onOpenDocument={handleOpenDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
            
            <AssignmentSection 
              title="Due This Week" 
              assignments={groupedAssignments.thisWeek}
              formatDate={formatDate}
              onOpenDocument={handleOpenDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
            
            <AssignmentSection 
              title="Future Assignments" 
              assignments={groupedAssignments.future}
              formatDate={formatDate}
              onOpenDocument={handleOpenDocument}
              documents={documents}
              setDocuments={setDocuments}
            />
            
            {filteredAssignments.length === 0 && (
              <EmptyState 
                icon={AlertTriangle}
                message="No pending assignments"
              />
            )}
          </TabsContent>
          
          <TabsContent value="documents" className="animate-fade-in">
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
