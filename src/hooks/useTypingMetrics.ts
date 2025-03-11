
import { useState, useEffect, useCallback, useRef } from "react";

export function useTypingMetrics() {
  const [lastTypingTime, setLastTypingTime] = useState<number | null>(null);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [typingTime, setTypingTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate WPM based on typing activity
  const calculateWPM = useCallback(() => {
    if (typingTime === 0) return 0;
    
    // Standard WPM calculation - 5 characters = 1 word
    const words = typedCharacters / 5;
    // Convert milliseconds to minutes
    const minutes = typingTime / 60000;
    
    return Math.round(words / Math.max(minutes, 0.01));
  }, [typedCharacters, typingTime]);
  
  // Update WPM when typing metrics change
  useEffect(() => {
    setWpm(calculateWPM());
  }, [typedCharacters, typingTime, calculateWPM]);
  
  // Set typing status to false after inactivity
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 3000); // Stop considering typing after 3 seconds of inactivity
    }
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isTyping, lastTypingTime]);
  
  const trackTyping = (oldContent: string, newContent: string) => {
    // Check if characters were added (not deleted or pasted)
    if (newContent.length > oldContent.length) {
      // Increment typed characters by the difference
      const newChars = newContent.length - oldContent.length;
      setTypedCharacters(prev => prev + newChars);
      
      // Track typing time
      const now = Date.now();
      if (lastTypingTime) {
        // Only count as typing if it's within a short time window (3 seconds)
        if (now - lastTypingTime < 3000) {
          setTypingTime(prev => prev + (now - lastTypingTime));
        }
      }
      setLastTypingTime(now);
      setIsTyping(true);
    }
    
    // Count words (simple splitting by spaces)
    const words = newContent.trim().split(/\s+/);
    const wordCount = newContent.trim() === "" ? 0 : words.length;
    
    return wordCount;
  };
  
  const resetTypingMetrics = () => {
    setTypedCharacters(0);
    setTypingTime(0);
    setWpm(0);
    setLastTypingTime(null);
    setIsTyping(false);
  };
  
  return {
    wpm,
    trackTyping,
    resetTypingMetrics,
    isTyping
  };
}
