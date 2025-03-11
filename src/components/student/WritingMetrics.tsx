
/**
 * This file provides a component for tracking and displaying writing metrics
 * for a document, including time spent actively typing, word count, etc.
 * 
 * Updates:
 * - Added activeTypingOnly prop to track only active typing time
 * - Implemented words per minute calculation that excludes pasted content
 * - Improved display of metrics with more accurate timing
 */
import { useState, useEffect } from "react";
import { Badge } from "@/components/common/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/Card";
import { Clock, Edit3, Copy, ClipboardList } from "lucide-react";
import { formatDistance } from "date-fns";

interface WritingMetricsProps {
  startTime: Date;
  wordCount: number;
  copyPasteCount: number;
  citationCount: number;
  activeTypingOnly?: boolean;
  pastedWordCount?: number;
}

export default function WritingMetrics({ 
  startTime, 
  wordCount, 
  copyPasteCount, 
  citationCount,
  activeTypingOnly = true,
  pastedWordCount = 0
}: WritingMetricsProps) {
  const [elapsedTime, setElapsedTime] = useState<string>("");
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [activeSeconds, setActiveSeconds] = useState<number>(0);
  const [lastActiveTime, setLastActiveTime] = useState<Date>(new Date());
  const [isActive, setIsActive] = useState<boolean>(false);
  
  // Words typed (excluding pasted content)
  const typedWordCount = wordCount - pastedWordCount;
  
  // Update the elapsed time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const seconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setTotalSeconds(seconds);
      
      // If we're in active typing mode and the user is active,
      // update the active seconds counter
      if (activeTypingOnly && isActive) {
        const activeTimeDiff = Math.floor((now.getTime() - lastActiveTime.getTime()) / 1000);
        if (activeTimeDiff < 3) { // Only count if user was active in the last 3 seconds
          setActiveSeconds(prev => prev + 1);
        }
      } else if (!activeTypingOnly) {
        // If not in active typing mode, total time = active time
        setActiveSeconds(seconds);
      }
      
      // Format the elapsed time as HH:MM:SS
      const timeToDisplay = activeTypingOnly ? activeSeconds : seconds;
      const hours = Math.floor(timeToDisplay / 3600);
      const minutes = Math.floor((timeToDisplay % 3600) / 60);
      const remainingSeconds = timeToDisplay % 60;
      
      setElapsedTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime, activeTypingOnly, isActive, lastActiveTime, activeSeconds]);
  
  // Set up document-wide event listeners to detect user activity
  useEffect(() => {
    const handleUserActivity = () => {
      setIsActive(true);
      setLastActiveTime(new Date());
      
      // Reset active state after 3 seconds of inactivity
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    };
    
    // Listen for keydown events anywhere in the document
    document.addEventListener('keydown', handleUserActivity);
    
    return () => {
      document.removeEventListener('keydown', handleUserActivity);
    };
  }, []);
  
  // Calculate words per minute (only if active time > 1 minute)
  const wordsPerMinute = activeSeconds > 60 
    ? Math.round((typedWordCount / (activeSeconds / 60)) * 10) / 10
    : 0;
  
  return (
    <div className="space-y-4 animate-fade-in">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Writing Metrics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span>Active Writing Time</span>
            </div>
            <div className="text-xl font-semibold">{elapsedTime}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Started {formatDistance(startTime, new Date(), { addSuffix: true })}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Edit3 className="h-4 w-4" />
              <span>Words</span>
            </div>
            <div className="text-xl font-semibold">{wordCount}</div>
            {wordsPerMinute > 0 && (
              <div className="text-xs text-muted-foreground mt-1">
                {wordsPerMinute} words/min
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Copy className="h-4 w-4" />
              <span>Copy/Paste</span>
            </div>
            <div className="text-xl font-semibold">{copyPasteCount}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {copyPasteCount === 0 
                ? "No content copied" 
                : `${(citationCount / Math.max(copyPasteCount, 1) * 100).toFixed(0)}% cited`
              }
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <ClipboardList className="h-4 w-4" />
              <span>Citations</span>
            </div>
            <div className="text-xl font-semibold">{citationCount}</div>
            <div className="flex mt-1">
              {citationCount === 0 ? (
                <Badge variant="warning" className="text-xs">No citations</Badge>
              ) : (
                <Badge variant="success" className="text-xs">{citationCount} sources cited</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
