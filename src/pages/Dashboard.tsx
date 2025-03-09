
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import TeacherDashboard from "../components/teacher/Dashboard";
import AssignmentPrompt from "../components/student/AssignmentPrompt";
import WritingMetrics from "../components/student/WritingMetrics";
import CitationPrompt from "../components/student/CitationPrompt";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  BookOpen, 
  Clock, 
  Copy, 
  FileText, 
  GraduationCap,
  Save, 
  SendHorizontal, 
  Quote 
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
  
  // Mock authentication function for demo purposes
  useEffect(() => {
    // For demo, let's allow selection of role on first load
    if (!userRole) {
      const role = window.localStorage.getItem("authentiya-role") as "student" | "teacher" | null;
      if (role) {
        setUserRole(role);
        setUserEmail(window.localStorage.getItem("authentiya-email") || "user@example.com");
        
        // For student, set a linked assignment for demo
        if (role === "student") {
          const savedLinkedAssignment = window.localStorage.getItem("linkedAssignment");
          if (savedLinkedAssignment) {
            setLinkedAssignment(savedLinkedAssignment);
            setStartTime(new Date());
          } else {
            setShowAssignmentPrompt(true);
          }
        }
      } else {
        // If no role is set, ask user to select one for the demo
        showRoleSelection();
      }
    }
  }, []);
  
  // Add event listeners for copy-paste detection
  useEffect(() => {
    const handlePasteEvent = (e: ClipboardEvent) => {
      // Only proceed if we're in student mode and have an active assignment
      if (userRole === "student" && linkedAssignment) {
        const pastedText = e.clipboardData?.getData('text') || "";
        if (pastedText.trim()) {
          setCopiedText(pastedText);
          setCopyPasteCount(prev => prev + 1);
          setShowCitationPrompt(true);
          
          // Log the paste event
          console.log("Paste detected:", pastedText.substring(0, 50) + (pastedText.length > 50 ? "..." : ""));
          toast.info("Content pasted", {
            description: "Please cite your source"
          });
        }
      }
    };
    
    // Add event listener to the textarea
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('paste', handlePasteEvent);
    }
    
    return () => {
      // Clean up event listener
      if (textarea) {
        textarea.removeEventListener('paste', handlePasteEvent);
      }
    };
  }, [userRole, linkedAssignment, textareaRef]);
  
  const showRoleSelection = () => {
    const selectRole = window.confirm("For demo purposes, would you like to use the student view? Click OK for student, Cancel for teacher.");
    const role = selectRole ? "student" : "teacher";
    const email = role === "student" ? "student@example.com" : "teacher@example.com";
    
    setUserRole(role);
    setUserEmail(email);
    
    // Save to localStorage for future visits
    window.localStorage.setItem("authentiya-role", role);
    window.localStorage.setItem("authentiya-email", email);
    
    // For student, show assignment prompt
    if (role === "student") {
      setShowAssignmentPrompt(true);
    }
  };
  
  const handleLogout = () => {
    const switchRoles = window.confirm("Would you like to switch roles? (OK for yes, Cancel for just logout)");
    
    if (switchRoles) {
      // Switch to the opposite role
      const newRole = userRole === "student" ? "teacher" : "student";
      const newEmail = newRole === "student" ? "student@example.com" : "teacher@example.com";
      
      setUserRole(newRole);
      setUserEmail(newEmail);
      window.localStorage.setItem("authentiya-role", newRole);
      window.localStorage.setItem("authentiya-email", newEmail);
      
      // Reset student-specific state if switching to student
      if (newRole === "student") {
        setLinkedAssignment(null);
        setStartTime(null);
        setShowAssignmentPrompt(true);
      }
    } else {
      // Just logout
      window.localStorage.removeItem("authentiya-role");
      window.localStorage.removeItem("authentiya-email");
      window.localStorage.removeItem("linkedAssignment");
      
      toast.success("Logged out successfully");
      navigate("/");
    }
  };
  
  const handleLinkAssignment = (assignmentId: string) => {
    setLinkedAssignment(assignmentId);
    setStartTime(new Date());
    setShowAssignmentPrompt(false);
    
    window.localStorage.setItem("linkedAssignment", assignmentId);
    
    toast.success("Assignment linked successfully", {
      description: "Your writing is now linked to this assignment"
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
  const handleManualPaste = () => {
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
    
    toast.success("Citation added", {
      description: `Added citation from ${citation.source}`
    });
  };
  
  const handleSubmitAssignment = () => {
    toast.success("Assignment submitted", {
      description: "Your assignment has been successfully submitted"
    });
    
    // In a real app, this would make an API call to Canvas or similar
    // Reset state
    setLinkedAssignment(null);
    setStartTime(null);
    setWordCount(0);
    setCopyPasteCount(0);
    setCitationCount(0);
    setContent("");
    
    window.localStorage.removeItem("linkedAssignment");
  };
  
  // For student view
  if (userRole === "student") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header userEmail={userEmail || undefined} userRole={userRole} onLogout={handleLogout} />
        
        <main className="flex-1 container py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Student Dashboard</h1>
              <p className="text-muted-foreground">Track your writing progress and assignments</p>
            </div>
            
            <div className="flex items-center gap-2">
              {linkedAssignment ? (
                <>
                  <div className="bg-authentiya-maroon/10 text-authentiya-maroon px-3 py-1 rounded-full font-medium text-sm flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Assignment Linked
                  </div>
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
                  className="academic-btn-primary"
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
          
          <div className="academic-card">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-authentiya-maroon" />
                  <h2 className="text-xl font-semibold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">My Document</h2>
                </div>
                
                {startTime && (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2" 
                      onClick={handleManualPaste}
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
                        toast.success("Citation added", {
                          description: "Manual citation added"
                        });
                      }}
                    >
                      <Quote className="h-4 w-4" />
                      <span className="hidden sm:inline">Add Citation</span>
                    </Button>
                    <Button 
                      size="sm" 
                      className="gap-2 academic-btn-primary"
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
                ref={textareaRef}
                className="w-full min-h-[300px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-authentiya-maroon/50 transition-all resize-y"
                placeholder="Start typing your document here..."
                value={content}
                onChange={handleTextAreaChange}
              ></textarea>
            </div>
          </div>
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header userEmail={userEmail || undefined} userRole={userRole || undefined} onLogout={handleLogout} />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
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
    </div>
  );
};

export default Dashboard;
