/**
 * StudentDashboard.tsx
 * 
 * This component renders the main student editor including the document editor.
 * It allows students to write and edit documents, link to assignments, and track metrics.
 * Document names can be edited with confirmation popups only when actually changed.
 * Now uses a WordProcessor component for a more robust document editing experience.
 * Added teacher comments tab to the right of the document editor.
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentPrompt from "./AssignmentPrompt";
import WritingMetrics from "./WritingMetrics";
import CitationPrompt from "./CitationPrompt";
import WordProcessor from "./WordProcessor";
import DashboardHeader from "./DashboardHeader";
import DocumentHeader from "./DocumentHeader";
import DocumentActions from "./DocumentActions";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MessageSquare } from "lucide-react";

interface StudentDashboardProps {
  userEmail: string | null;
  onLogout: () => void;
}

// Mock teacher comments data
const mockTeacherComments = [
  {
    id: "1",
    teacherName: "Dr. Smith",
    timestamp: new Date().toISOString(),
    text: "Great introduction! Make sure to expand on your thesis statement a bit more.",
    resolved: false
  },
  {
    id: "2",
    teacherName: "Dr. Smith",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    text: "Your citation format needs some work. Please follow MLA guidelines for all references.",
    resolved: true
  },
  {
    id: "3",
    teacherName: "Prof. Johnson",
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    text: "This paragraph could be stronger with more supporting evidence. Consider adding another example to illustrate your point.",
    resolved: false
  }
];

export default function StudentDashboard({ userEmail, onLogout }: StudentDashboardProps) {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [showAssignmentPrompt, setShowAssignmentPrompt] = useState(false);
  const [linkedAssignment, setLinkedAssignment] = useState<string | null>(null);
  const [linkedAssignmentTitle, setLinkedAssignmentTitle] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [copyPasteCount, setCopyPasteCount] = useState(0);
  const [citationCount, setCitationCount] = useState(0);
  const [showCitationPrompt, setShowCitationPrompt] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [content, setContent] = useState("");
  const [documentName, setDocumentName] = useState("Untitled Document");
  const [originalDocumentName, setOriginalDocumentName] = useState("Untitled Document");
  const [activeTab, setActiveTab] = useState<"document" | "comments">("document");
  
  useEffect(() => {
    const savedLinkedAssignment = window.localStorage.getItem("linkedAssignment");
    const savedLinkedAssignmentTitle = window.localStorage.getItem("linkedAssignmentTitle");
    
    if (savedLinkedAssignment) {
      setLinkedAssignment(savedLinkedAssignment);
      if (savedLinkedAssignmentTitle) {
        setLinkedAssignmentTitle(savedLinkedAssignmentTitle);
        setDocumentName(savedLinkedAssignmentTitle);
        setOriginalDocumentName(savedLinkedAssignmentTitle);
      }
      setStartTime(new Date());
    } else {
      setShowAssignmentPrompt(true);
    }
    
    const savedContent = window.localStorage.getItem("currentDocument");
    if (savedContent) {
      setContent(savedContent);
      
      const words = savedContent.trim().split(/\s+/);
      setWordCount(savedContent.trim() === "" ? 0 : words.length);
    }
    
    const savedDocumentName = window.localStorage.getItem("documentName");
    if (savedDocumentName) {
      setDocumentName(savedDocumentName);
      setOriginalDocumentName(savedDocumentName);
    }
  }, []);
  
  useEffect(() => {
    if (content) {
      window.localStorage.setItem("currentDocument", content);
    }
  }, [content]);
  
  useEffect(() => {
    if (documentName) {
      window.localStorage.setItem("documentName", documentName);
    }
  }, [documentName]);
  
  useEffect(() => {
    const handlePasteEvent = (e: ClipboardEvent) => {
      if (linkedAssignment && e.target instanceof HTMLTextAreaElement) {
        const pastedText = e.clipboardData?.getData('text') || "";
        if (pastedText.trim()) {
          setCopiedText(pastedText);
          setCopyPasteCount(prev => prev + 1);
          setShowCitationPrompt(true);
          
          console.log("Paste detected:", pastedText.substring(0, 50) + (pastedText.length > 50 ? "..." : ""));
          toast.info("Content pasted", {
            description: "Please cite your source"
          });
        }
      }
    };
    
    document.addEventListener('paste', handlePasteEvent);
    
    return () => {
      document.removeEventListener('paste', handlePasteEvent);
    };
  }, [linkedAssignment]);
  
  const handleLinkAssignment = (assignmentId: string, assignmentTitle?: string) => {
    setLinkedAssignment(assignmentId);
    
    if (assignmentTitle) {
      setLinkedAssignmentTitle(assignmentTitle);
      setDocumentName(assignmentTitle);
      setOriginalDocumentName(assignmentTitle);
      window.localStorage.setItem("linkedAssignmentTitle", assignmentTitle);
    }
    
    setStartTime(new Date());
    setShowAssignmentPrompt(false);
    
    window.localStorage.setItem("linkedAssignment", assignmentId);
    
    toast.success("Assignment linked successfully", {
      description: "Your writing is now linked to this assignment"
    });
  };
  
  const handleTextChange = (newContent: string) => {
    setContent(newContent);
    
    const words = newContent.trim().split(/\s+/);
    setWordCount(newContent.trim() === "" ? 0 : words.length);
  };
  
  const handleAddCitation = (citation: {
    type: "website" | "book" | "ai" | "other";
    source: string;
    details?: string;
  }) => {
    setCitationCount(prev => prev + 1);
    setShowCitationPrompt(false);
    
    toast.success("Citation added", {
      description: `Added citation from ${citation.source}`
    });
  };
  
  const handleManualAddCitation = () => {
    setCitationCount(prev => prev + 1);
    toast.success("Citation added", {
      description: "Manual citation added"
    });
  };
  
  const handleSubmitAssignment = () => {
    toast.success("Assignment submitted", {
      description: "Your assignment has been successfully submitted"
    });
    
    setLinkedAssignment(null);
    setLinkedAssignmentTitle(null);
    setStartTime(null);
    setWordCount(0);
    setCopyPasteCount(0);
    setCitationCount(0);
    setContent("");
    setDocumentName("Untitled Document");
    setOriginalDocumentName("Untitled Document");
    
    window.localStorage.removeItem("linkedAssignment");
    window.localStorage.removeItem("linkedAssignmentTitle");
    window.localStorage.removeItem("currentDocument");
    window.localStorage.removeItem("documentName");
    
    navigate("/student/assignments");
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
  
  return (
    <main className="flex-1 container py-6 space-y-6">
      <DashboardHeader 
        linkedAssignment={linkedAssignment}
        onShowAssignmentPrompt={() => setShowAssignmentPrompt(true)}
      />
      
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
            <DocumentHeader 
              documentName={documentName}
              originalDocumentName={originalDocumentName}
              setDocumentName={setDocumentName}
              setOriginalDocumentName={setOriginalDocumentName}
              linkedAssignmentTitle={linkedAssignmentTitle}
            />
            
            {startTime && (
              <DocumentActions 
                linkedAssignment={linkedAssignment}
                wordCount={wordCount}
                onAddCitation={handleManualAddCitation}
                onSubmitAssignment={handleSubmitAssignment}
              />
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <WordProcessor 
                content={content} 
                onChange={handleTextChange}
                placeholder="Start typing your document here..."
              />
            </div>
            
            <div className="border-l pl-4">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "document" | "comments")}>
                <TabsList className="mb-4">
                  <TabsTrigger value="comments" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Teacher Comments
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="comments" className="space-y-4">
                  {mockTeacherComments.length === 0 ? (
                    <div className="text-center py-6">
                      <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">
                        No comments yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockTeacherComments.map((comment) => (
                        <div 
                          key={comment.id} 
                          className={`p-3 rounded-md border ${
                            comment.resolved 
                              ? 'bg-gray-50 border-gray-200 dark:bg-gray-800/30 dark:border-gray-700' 
                              : 'bg-blue-50/30 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800/30'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-authentiya-maroon/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-authentiya-maroon" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{comment.teacherName}</h4>
                              <p className="text-xs text-muted-foreground">
                                {formatDateTime(comment.timestamp)}
                              </p>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-sm whitespace-pre-line">
                            {comment.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
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
    </main>
  );
}
