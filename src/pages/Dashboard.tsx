
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import TeacherDashboard from "@/components/teacher/Dashboard";
import AssignmentPrompt from "@/components/student/AssignmentPrompt";
import WritingMetrics from "@/components/student/WritingMetrics";
import CitationPrompt from "@/components/student/CitationPrompt";
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { useToast } from "@/hooks/use-toast";
import { Clock, FileText, BookOpen, Save, SendHorizontal, Copy, Quote } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // User state
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  
  // Student state
  const [showAssignmentPrompt, setShowAssignmentPrompt] = useState(false);
  const [linkedAssignment, setLinkedAssignment] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [copyPasteCount, setCopyPasteCount] = useState(0);
  const [citationCount, setCitationCount] = useState(0);
  const [showCitationPrompt, setShowCitationPrompt] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [content, setContent] = useState("");
  
  // Teacher state
  const [selectedAssignmentId, setSelectedAssignmentId] = useState("1");
  
  // Check for user data on component mount
  useEffect(() => {
    // In a real app, this would fetch from localStorage or an auth system
    const savedUserEmail = localStorage.getItem("userEmail");
    const savedUserRole = localStorage.getItem("userRole") as "student" | "teacher" | null;
    
    if (savedUserEmail && savedUserRole) {
      setUserEmail(savedUserEmail);
      setUserRole(savedUserRole);
      
      // For student, maybe show the assignment prompt or set a linked assignment
      if (savedUserRole === "student") {
        const savedLinkedAssignment = localStorage.getItem("linkedAssignment");
        if (savedLinkedAssignment) {
          setLinkedAssignment(savedLinkedAssignment);
          setStartTime(new Date());
        } else {
          setShowAssignmentPrompt(true);
        }
      }
    } else {
      // Redirect to login if not authenticated
      navigate("/");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("linkedAssignment");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    navigate("/");
  };
  
  const handleLinkAssignment = (assignmentId: string) => {
    setLinkedAssignment(assignmentId);
    setStartTime(new Date());
    setShowAssignmentPrompt(false);
    
    localStorage.setItem("linkedAssignment", assignmentId);
    
    toast({
      title: "Assignment Linked",
      description: "Your writing is now linked to this assignment",
    });
  };
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // Count words (simple splitting by spaces)
    const words = newContent.trim().split(/\s+/);
    setWordCount(newContent.trim() === "" ? 0 : words.length);
  };
  
  // Simulate copy/paste detection
  const handlePaste = () => {
    setCopyPasteCount(prev => prev + 1);
    // Get clipboard text (in a real app, this would access navigator.clipboard)
    // For demo, we'll just simulate it
    setCopiedText("This is a simulated copied text from an external source...");
    setShowCitationPrompt(true);
  };
  
  const handleAddCitation = (citation: {
    type: "website" | "book" | "ai";
    source: string;
    details?: string;
  }) => {
    setCitationCount(prev => prev + 1);
    setShowCitationPrompt(false);
    
    toast({
      title: "Citation Added",
      description: `Added citation from ${citation.source}`,
    });
  };
  
  const handleSubmitAssignment = () => {
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been successfully submitted",
    });
    
    // In a real app, this would make an API call to Canvas or similar
    // Reset state
    setLinkedAssignment(null);
    setStartTime(null);
    setWordCount(0);
    setCopyPasteCount(0);
    setCitationCount(0);
    setContent("");
    
    localStorage.removeItem("linkedAssignment");
  };
  
  // For student view
  if (userRole === "student") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header userEmail={userEmail || undefined} userRole={userRole} onLogout={handleLogout} />
        
        <main className="flex-1 container py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-muted-foreground">Track your writing progress and assignments</p>
            </div>
            
            <div className="flex items-center gap-2">
              {linkedAssignment ? (
                <>
                  <Badge variant="info" className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    Assignment Linked
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAssignmentPrompt(true)}
                  >
                    Change
                  </Button>
                </>
              ) : (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setShowAssignmentPrompt(true)}
                >
                  Link to Assignment
                </Button>
              )}
            </div>
          </div>
          
          {startTime && (
            <WritingMetrics 
              startTime={startTime} 
              wordCount={wordCount} 
              copyPasteCount={copyPasteCount}
              citationCount={citationCount}
            />
          )}
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">My Document</h2>
                </div>
                
                {startTime && (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2" 
                      onClick={() => handlePaste()}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="hidden sm:inline">Simulate Copy/Paste</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => {
                        setCitationCount(prev => prev + 1);
                        toast({
                          title: "Citation Added",
                          description: "Manual citation added",
                        });
                      }}
                    >
                      <Quote className="h-4 w-4" />
                      <span className="hidden sm:inline">Add Citation</span>
                    </Button>
                    <Button 
                      size="sm" 
                      className="gap-2"
                      onClick={handleSubmitAssignment}
                      disabled={!linkedAssignment || wordCount === 0}
                    >
                      <SendHorizontal className="h-4 w-4" />
                      <span className="hidden sm:inline">Submit</span>
                    </Button>
                  </div>
                )}
              </div>
              
              <textarea
                className="w-full min-h-[300px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y"
                placeholder="Start typing your document here..."
                value={content}
                onChange={handleTextAreaChange}
              ></textarea>
            </CardContent>
          </Card>
        </main>
        
        {showAssignmentPrompt && (
          <AssignmentPrompt
            onSelect={handleLinkAssignment}
            onDismiss={() => setShowAssignmentPrompt(false)}
          />
        )}
        
        {showCitationPrompt && (
          <CitationPrompt
            copiedText={copiedText}
            onSubmit={handleAddCitation}
            onDismiss={() => setShowCitationPrompt(false)}
          />
        )}
      </div>
    );
  }
  
  // For teacher view
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userEmail={userEmail || undefined} userRole={userRole || undefined} onLogout={handleLogout} />
      
      <main className="flex-1 container py-6">
        <TeacherDashboard
          selectedAssignmentId={selectedAssignmentId}
          onAssignmentSelect={setSelectedAssignmentId}
        />
      </main>
    </div>
  );
};

export default Dashboard;
