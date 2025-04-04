/**
 * WritingMetrics.tsx
 * 
 * This component renders writing metrics for a student's document,
 * including word count, reading time, and other statistics.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * 
 * Preconditions:
 * - None identified.
 * 
 * Acceptable Input:
 * - `documentId`: string - The ID of the document for which metrics are displayed.
 * 
 * Postconditions:
 * - Renders writing metrics for the document.
 * 
 * Return Values:
 * - None directly, but renders a metrics element.
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
}

export default function WritingMetrics({ 
  startTime, 
  wordCount, 
  copyPasteCount, 
  citationCount 
}: WritingMetricsProps) {
  const [elapsedTime, setElapsedTime] = useState<string>("");
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  
  // Update the elapsed time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const seconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setTotalSeconds(seconds);
      
      // Format the elapsed time as HH:MM:SS
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      
      setElapsedTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime]);
  
  // Calculate words per minute (only if elapsed time > 1 minute)
  const wordsPerMinute = totalSeconds > 60 
    ? Math.round((wordCount / (totalSeconds / 60)) * 10) / 10
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
              <span>Session Time</span>
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
