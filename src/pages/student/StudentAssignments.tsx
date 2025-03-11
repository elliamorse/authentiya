import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/common/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Book, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  GraduationCap, 
  School,
  FileText,
  FilterX
} from "lucide-react";

const studentClasses = [
  {
    id: "c1",
    name: "English 101",
    teacherName: "Dr. Smith",
    semester: "Fall 2023",
    assignments: [
      {
        id: "1",
        title: "Essay on American Literature",
        dueDate: "2023-11-15",
        status: "in_progress",
        startedOn: "2023-11-02T14:30:00Z",
        timeSpent: 120,
        wordCount: 950,
      },
      {
        id: "4",
        title: "Poetry Analysis",
        dueDate: "2023-12-05",
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
      }
    ]
  },
  {
    id: "c2",
    name: "Physics 202",
    teacherName: "Prof. Johnson",
    semester: "Fall 2023",
    assignments: [
      {
        id: "2",
        title: "Physics Problem Set",
        dueDate: "2023-11-18",
        status: "in_progress",
        startedOn: "2023-11-08T10:00:00Z",
        timeSpent: 90,
        wordCount: 580,
      }
    ]
  },
  {
    id: "c3",
    name: "History 105",
    teacherName: "Dr. Williams",
    semester: "Fall 2023",
    assignments: [
      {
        id: "3",
        title: "History Research Paper",
        dueDate: "2023-11-20",
        status: "not_started",
        startedOn: null,
        timeSpent: 0,
        wordCount: 0,
      }
    ]
  }
];

const studentDocuments = [
  {
    id: "d1",
    title: "Essay on American Literature",
    assignmentId: "1",
    className: "English 101",
    teacherName: "Dr. Smith",
    lastEdited: "2023-11-10T16:45:00Z",
    status: "in_progress",
    dueDate: "2023-11-15",
    timeSpent: 120,
    wordCount: 950,
    content: "The evolution of American literature reflects the nation's history and cultural development. From the early colonial period to the modern era, American writers have explored themes of identity, freedom, individualism, and social justice..."
  },
  {
    id: "d2",
    title: "Physics Problem Set",
    assignmentId: "2",
    className: "Physics 202",
    teacherName: "Prof. Johnson",
    lastEdited: "2023-11-12T09:15:00Z",
    status: "in_progress",
    dueDate: "2023-11-18",
    timeSpent: 90,
    wordCount: 580,
    content: "Newton's laws of motion form the foundation of classical mechanics. This problem set explores various applications of these laws in everyday scenarios..."
  },
  {
    id: "d3",
    title: "Research Notes on Civil War",
    assignmentId: null,
    className: null,
    teacherName: null,
    lastEdited: "2023-11-05T13:20:00Z",
    status: "draft",
    dueDate: null,
    timeSpent: 45,
    wordCount: 320,
    content: "The American Civil War (1861-1865) was a conflict between the United States of America and the Confederate States of America. The primary causes included differences in economic interests, states' rights, and the controversy over the expansion of slavery..."
  },
  {
    id: "d4",
    title: "Personal Journal: College Experience",
    assignmentId: null,
    className: null,
    teacherName: null,
    lastEdited: "2023-10-28T19:45:00Z",
    status: "draft",
    dueDate: null,
    timeSpent: 75,
    wordCount: 680,
    content: "My first semester of college has been both challenging and rewarding. The transition from high school to university life has required significant adjustments in terms of time management, study habits, and social interactions..."
  },
  {
    id: "d5",
    title: "Poetry Analysis Final Draft",
    assignmentId: "4",
    className: "English 101",
    teacherName: "Dr. Smith",
    lastEdited: "2023-11-03T11:30:00Z",
    status: "completed",
    dueDate: "2023-11-05",
    timeSpent: 180,
    wordCount: 1150,
    content: "Poetry analysis requires a deep understanding of both literal and figurative language. In this essay, I explore the themes and techniques used in contemporary poetry..."
  }
];

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
  
  const renderAssignmentSection = (title: string, assignments: any[]) => {
    if (assignments.length === 0) return null;
    
    return (
      <div className="mt-6">
        <h3 className="font-semibold mb-3 font-playfair">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map(assignment => (
            <Card key={assignment.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="h-2 bg-authentiya-maroon"></div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-lg font-playfair">{assignment.title}</h4>
                  {renderStatusBadge(assignment.status)}
                </div>
                
                <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
                  <Book className="h-3 w-3" />
                  <span>{assignment.className}</span>
                </div>
                
                <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
                  <GraduationCap className="h-3 w-3" />
                  <span>{assignment.teacherName}</span>
                </div>
                
                <div className="text-sm text-muted-foreground flex gap-1 items-center mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {formatDate(assignment.dueDate)}</span>
                </div>
                
                {assignment.status === "in_progress" && (
                  <div className="mt-2 p-2 bg-blue-50/50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-900/30 text-xs">
                    <div className="flex justify-between mb-1">
                      <span>Time spent:</span>
                      <span className="font-medium">{Math.floor(assignment.timeSpent / 60)}h {assignment.timeSpent % 60}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Words written:</span>
                      <span className="font-medium">{assignment.wordCount}</span>
                    </div>
                  </div>
                )}
                
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full mt-3 academic-btn-primary"
                  onClick={() => {
                    const doc = documents.find(d => d.assignmentId === assignment.id);
                    if (doc) {
                      handleOpenDocument(doc);
                    } else {
                      const newDoc = {
                        id: `d${Date.now()}`,
                        title: assignment.title,
                        assignmentId: assignment.id,
                        className: assignment.className,
                        teacherName: assignment.teacherName,
                        lastEdited: new Date().toISOString(),
                        status: "in_progress",
                        dueDate: assignment.dueDate,
                        timeSpent: 0,
                        wordCount: 0,
                        content: ""
                      };
                      setDocuments([...documents, newDoc]);
                      handleOpenDocument(newDoc);
                    }
                  }}
                >
                  {assignment.status === "not_started" ? "Start Assignment" : "Continue Working"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  const renderDocumentsSection = () => {
    return (
      <div className="mt-6">
        <h3 className="font-semibold mb-3 font-playfair">My Documents</h3>
        {renderDocumentStatusTabs()}
        
        {filteredDocuments.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">No documents found with the selected status</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map(doc => (
              <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                <div className={`h-2 ${
                  doc.status === "completed" ? "bg-green-500" : 
                  doc.status === "in_progress" ? "bg-blue-500" : 
                  "bg-authentiya-charcoal"
                }`}></div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-lg font-playfair line-clamp-1">{doc.title}</h4>
                    {renderStatusBadge(doc.status)}
                  </div>
                  
                  {doc.className && (
                    <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
                      <Book className="h-3 w-3" />
                      <span>{doc.className}</span>
                    </div>
                  )}
                  
                  {doc.teacherName && (
                    <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
                      <GraduationCap className="h-3 w-3" />
                      <span>{doc.teacherName}</span>
                    </div>
                  )}
                  
                  {doc.dueDate && (
                    <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>Due: {formatDate(doc.dueDate)}</span>
                    </div>
                  )}
                  
                  <div className="text-sm text-muted-foreground flex gap-1 items-center mb-3">
                    <Clock className="h-3 w-3" />
                    <span>Last edited: {formatDateTime(doc.lastEdited)}</span>
                  </div>
                  
                  <div className="mt-2 p-2 bg-gray-50/50 dark:bg-gray-900/20 rounded border border-gray-100 dark:border-gray-900/30 text-xs">
                    <div className="flex justify-between mb-1">
                      <span>Time spent:</span>
                      <span className="font-medium">{Math.floor(doc.timeSpent / 60)}h {doc.timeSpent % 60}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Words written:</span>
                      <span className="font-medium">{doc.wordCount}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-muted-foreground line-clamp-2">
                    {doc.content}
                  </div>
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full mt-3 academic-btn-primary"
                    onClick={() => handleOpenDocument(doc)}
                  >
                    Open Document
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-dashed border-2">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
                <div className="h-12 w-12 rounded-full bg-authentiya-charcoal/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-authentiya-charcoal" />
                </div>
                <h4 className="font-medium text-lg font-playfair mb-2">Create New Document</h4>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Start a new document without linking to an assignment
                </p>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="academic-btn-primary"
                  onClick={() => {
                    const newDoc = {
                      id: `d${Date.now()}`,
                      title: "Untitled Document",
                      assignmentId: null,
                      className: null,
                      teacherName: null,
                      lastEdited: new Date().toISOString(),
                      status: "draft",
                      dueDate: null,
                      timeSpent: 0,
                      wordCount: 0,
                      content: ""
                    };
                    setDocuments([...documents, newDoc]);
                    handleOpenDocument(newDoc);
                  }}
                >
                  Create Document
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };
  
  const renderDocumentStatusTabs = () => {
    return (
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-medium">Filter by:</span>
        <Button
          variant={documentStatus === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setDocumentStatus("all")}
          className={documentStatus === "all" ? "bg-authentiya-maroon hover:bg-authentiya-maroon/90" : ""}
        >
          <FilterX className="h-3.5 w-3.5 mr-1" />
          All
        </Button>
        <Button
          variant={documentStatus === "in_progress" ? "default" : "outline"}
          size="sm"
          onClick={() => setDocumentStatus("in_progress")}
          className={documentStatus === "in_progress" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
        >
          <Clock className="h-3.5 w-3.5 mr-1" />
          In Progress
        </Button>
        <Button
          variant={documentStatus === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setDocumentStatus("completed")}
          className={documentStatus === "completed" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
        >
          <CheckCircle className="h-3.5 w-3.5 mr-1" />
          Completed
        </Button>
        <Button
          variant={documentStatus === "draft" ? "default" : "outline"}
          size="sm"
          onClick={() => setDocumentStatus("draft")}
          className={documentStatus === "draft" ? "bg-gray-500 hover:bg-gray-600 text-white" : ""}
        >
          <FileText className="h-3.5 w-3.5 mr-1" />
          Drafts
        </Button>
      </div>
    );
  };
  
  const renderClasses = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {studentClasses.map(cls => (
          <Card key={cls.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
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
            {renderAssignmentSection("Due Today", groupedAssignments.today)}
            {renderAssignmentSection("Due This Week", groupedAssignments.thisWeek)}
            {renderAssignmentSection("Future Assignments", groupedAssignments.future)}
            
            {filteredAssignments.length === 0 && (
              <div className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No assignments found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="animate-fade-in">
            {renderAssignmentSection("Due Today", groupedAssignments.today)}
            {renderAssignmentSection("Due This Week", groupedAssignments.thisWeek)}
            {renderAssignmentSection("Future Assignments", groupedAssignments.future)}
            
            {filteredAssignments.length === 0 && (
              <div className="py-12 text-center">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No active assignments</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="animate-fade-in">
            {renderAssignmentSection("Due Today", groupedAssignments.today)}
            {renderAssignmentSection("Due This Week", groupedAssignments.thisWeek)}
            {renderAssignmentSection("Future Assignments", groupedAssignments.future)}
            
            {filteredAssignments.length === 0 && (
              <div className="py-12 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No pending assignments</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="documents" className="animate-fade-in">
            {renderDocumentsSection()}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
