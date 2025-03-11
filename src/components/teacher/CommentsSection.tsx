
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { Comment, addCommentToStudentAssignment } from "@/lib/teacherData";
import { MessageSquare, SendHorizontal, User } from "lucide-react";
import { toast } from "sonner";

interface CommentsSectionProps {
  studentId: string;
  assignmentId: string;
  initialComments: Comment[];
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  studentId,
  assignmentId,
  initialComments,
}) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Use local comments state that includes the original comments plus any new ones
  const allComments = [...initialComments, ...comments];
  
  // Format date and time
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
  
  // Handle adding a new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // Add comment 
    const comment = addCommentToStudentAssignment(
      studentId, 
      assignmentId,
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
  );
};
