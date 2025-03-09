
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/common/Badge";
import { 
  getStudentAssignment, 
  getAssignmentById,
  addCommentToStudentAssignment,
  Comment
} from "@/lib/teacher-data";
import { 
  ArrowLeft,
  BookOpen, 
  Calendar,
  CheckCircle2, 
  Clock, 
  Copy, 
  FileText, 
  MessageSquare,
  Quote, 
  SendHorizontal, 
  User
} from "lucide-react";
import { toast } from "sonner";

export default function TeacherStudentView() {
  const { studentId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Get student assignment data
  const studentAssignment = studentId && assignmentId
    ? getStudentAssignment(studentId, assignmentId)
    : undefined;
  
  // Get assignment details
  const assignment = assignmentId
    ? getAssignmentById(assignmentId)
    : undefined;
  
  // Handle navigation if data is missing
  if (!studentAssignment || !assignment) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          userEmail="teacher@example.com" 
          userRole="teacher" 
          onLogout={() => navigate("/")} 
        />
        
        <main className="flex-1 container py-6 space-y-6">
          <Button 
            variant="ghost" 
            className="w-fit flex items-center gap-2 -ml-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">Student assignment not found</h3>
          </div>
        </main>
      </div>
    );
  }
  
  // Use local comments state that includes the original comments plus any new ones
  const allComments = [...studentAssignment.comments, ...comments];
  
  // Format date and time
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not started";
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format time spent
  const formatTimeSpent = (minutes: number) => {
    if (minutes === 0) return "N/A";
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    }
    
    return `${hours}h ${mins}m`;
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Submitted
        </Badge>;
      case "in_progress":
        return <Badge variant="info" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> In Progress
        </Badge>;
      case "not_started":
        return <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Not Started
        </Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  // Handle adding a new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // Add comment 
    const comment = addCommentToStudentAssignment(
      studentId!, 
      assignmentId!,
      "t1", // teacher ID (would come from auth in a real app)
      "Dr. Smith", // teacher name (would come from auth in a real app)
      newComment
    );
    
    // Update local state
    setComments([...comments, comment]);
    setNewComment("");
    
    // Show confirmation
    toast.success("Comment added successfully");
  };
  
  // Handle marking a comment as resolved
  const handleResolveComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, resolved: true } 
        : comment
    ));
    
    toast.success("Comment marked as resolved");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        userEmail="teacher@example.com" 
        userRole="teacher" 
        onLogout={() => navigate("/")} 
      />
      
      <main className="flex-1 container py-6 space-y-6">
        <div className="flex flex-col space-y-6">
          <Button 
            variant="ghost" 
            className="w-fit flex items-center gap-2 -ml-2"
            onClick={() => navigate(`/teacher/assignment/${assignmentId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Assignment
          </Button>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Student and Assignment Info */}
            <Card className="md:col-span-1">
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-authentiya-maroon/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-authentiya-maroon" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{studentAssignment.studentName}</h2>
                      <p className="text-sm text-muted-foreground">Student</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 text-sm mt-2">
                    <div>
                      <div className="text-muted-foreground">Status</div>
                      <div>{getStatusBadge(studentAssignment.status)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Started</div>
                      <div className="font-medium">{formatDate(studentAssignment.startTime)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time Spent</div>
                      <div className="font-medium">{formatTimeSpent(studentAssignment.timeSpent)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Word Count</div>
                      <div className="font-medium">{studentAssignment.wordCount}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Copy/Paste Count</div>
                      <div className="font-medium flex items-center gap-1">
                        <Copy className="h-3 w-3" />
                        {studentAssignment.copyPasteCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Citations</div>
                      <div className="font-medium flex items-center gap-1">
                        <Quote className="h-3 w-3" />
                        {studentAssignment.citationCount}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-authentiya-maroon" />
                    <h3 className="font-medium">{assignment.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{assignment.className}</div>
                </div>
              </CardContent>
            </Card>
            
            {/* Student Work and Comments */}
            <div className="md:col-span-2 space-y-4">
              <Tabs defaultValue="work">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="work" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Student Work
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Comments ({allComments.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="work" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      {studentAssignment.status === "not_started" ? (
                        <div className="text-center py-8">
                          <Clock className="h-10 w-10 mx-auto text-muted-foreground/50" />
                          <p className="mt-4 text-muted-foreground">
                            Student hasn't started this assignment yet.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-4 flex justify-between items-center">
                            <h3 className="font-semibold">Student Work</h3>
                            {studentAssignment.lastActive && (
                              <span className="text-xs text-muted-foreground">
                                Last active: {formatDateTime(studentAssignment.lastActive)}
                              </span>
                            )}
                          </div>
                          
                          <div className="min-h-[300px] max-h-[500px] overflow-y-auto border rounded-md p-4 bg-background">
                            {studentAssignment.content ? (
                              <p className="whitespace-pre-line">{studentAssignment.content}</p>
                            ) : (
                              <p className="text-muted-foreground italic">No content yet</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="comments" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <h3 className="font-semibold mb-2">Add Comment</h3>
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Add feedback or suggestions..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            className="academic-btn-primary"
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                          >
                            <SendHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mt-6">
                        <h3 className="font-semibold">Comments ({allComments.length})</h3>
                        
                        {allComments.length === 0 ? (
                          <div className="text-center py-6">
                            <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/50" />
                            <p className="mt-4 text-muted-foreground">
                              No comments yet. Add one to provide feedback.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {allComments.map((comment) => (
                              <div 
                                key={comment.id} 
                                className={`p-3 rounded-md border ${
                                  comment.resolved 
                                    ? 'bg-gray-50 border-gray-200' 
                                    : 'bg-blue-50/30 border-blue-100'
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2">
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
                                  
                                  {!comment.resolved && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleResolveComment(comment.id)}
                                    >
                                      Resolve
                                    </Button>
                                  )}
                                  
                                  {comment.resolved && (
                                    <Badge variant="outline" className="text-xs">Resolved</Badge>
                                  )}
                                </div>
                                
                                <p className="mt-2 text-sm whitespace-pre-line">
                                  {comment.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
