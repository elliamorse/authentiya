
/**
 * HeroSection.tsx
 * 
 * This component is the top section of the landing page, featuring the main headline,
 * description, call-to-action buttons, and tabbed content showing different features
 * for students and teachers.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * - 3/28/2025: Changed "Get Started" button text to "Get on our waitlist" - AI Assistant
 * 
 * Preconditions:
 * - The `react-router-dom` and `lucide-react` libraries must be installed and properly configured.
 * 
 * Acceptable Input:
 * - None directly, as this component does not accept props.
 * 
 * Postconditions:
 * - Renders the hero section with headline, description, call-to-action buttons, and tabbed content.
 * 
 * Return Values:
 * - None directly, but renders a div element.
 * 
 * Error and Exception Conditions:
 * - None identified.
 * 
 * Side Effects:
 * - None identified.
 * 
 * Invariants:
 * - The hero section must always render with the specified structure and content.
 * 
 * Known Faults:
 * - None identified.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, ClipboardCheck, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');

  const handleGetStarted = () => {
    navigate('/contact');
  };

  return (
    <div className="authentiya-container pt-16 pb-12 md:pt-28 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-authentiya-maroon/10 text-authentiya-maroon text-sm font-medium">
            <GraduationCap className="w-4 h-4 mr-2" />
            <span>Proof-of-Authorship Solution for Education</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-authentiya-charcoal-darkest dark:text-white leading-tight">
            Track, Verify, and <span className="text-authentiya-maroon dark:text-authentiya-maroon-light">Authenticate</span> Student Writing
          </h1>
          
          <p className="text-lg text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray md:pr-12">
            Authentiya helps educators verify student work authenticity while providing students with tools to track their writing progress and properly cite sources.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleGetStarted} 
              size="lg" 
              className="gap-2 px-6 academic-btn-primary"
            >
              Get on our waitlist
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 px-6 border-authentiya-charcoal dark:border-authentiya-charcoal-lighter"
              onClick={() => window.open('#how-it-works', '_self')}
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="glass-panel-lg p-6 rounded-xl md:p-8 relative">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-authentiya-accent-gold text-authentiya-charcoal-darkest text-xs px-3 py-1 rounded-full font-medium">
            New
          </div>
          
          <div className="flex mb-6 border-b border-gray-200 dark:border-authentiya-charcoal-lighter">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 pb-3 text-center font-medium transition-all ${activeTab === 'student' ? 'text-authentiya-maroon dark:text-authentiya-maroon-light border-b-2 border-authentiya-maroon dark:border-authentiya-maroon-light' : 'text-authentiya-charcoal-lighter hover:text-authentiya-charcoal-darkest dark:text-authentiya-accent-gray dark:hover:text-white'}`}
            >
              For Students
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex-1 pb-3 text-center font-medium transition-all ${activeTab === 'teacher' ? 'text-authentiya-maroon dark:text-authentiya-maroon-light border-b-2 border-authentiya-maroon dark:border-authentiya-maroon-light' : 'text-authentiya-charcoal-lighter hover:text-authentiya-charcoal-darkest dark:text-authentiya-accent-gray dark:hover:text-white'}`}
            >
              For Teachers
            </button>
          </div>
          
          {activeTab === 'student' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-start p-3 bg-white rounded-lg shadow-sm dark:bg-authentiya-charcoal-light">
                <Clock className="text-authentiya-maroon mr-3 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-medium text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Track Your Writing Process</h3>
                  <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">Monitor time spent, word count, and writing patterns automatically.</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-white rounded-lg shadow-sm dark:bg-authentiya-charcoal-light">
                <ClipboardCheck className="text-authentiya-maroon mr-3 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-medium text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Seamless Citation Assistance</h3>
                  <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">Get prompted to cite sources when copying and pasting content.</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-white rounded-lg shadow-sm dark:bg-authentiya-charcoal-light">
                <BookOpen className="text-authentiya-maroon mr-3 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-medium text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Canvas Integration</h3>
                  <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">Submit assignments directly with proof of authentic work.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-start p-3 bg-white rounded-lg shadow-sm dark:bg-authentiya-charcoal-light">
                <Clock className="text-authentiya-maroon mr-3 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-medium text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Real-time Monitoring</h3>
                  <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">Track student progress and time spent on assignments as they work.</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-white rounded-lg shadow-sm dark:bg-authentiya-charcoal-light">
                <ClipboardCheck className="text-authentiya-maroon mr-3 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-medium text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Plagiarism Prevention</h3>
                  <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">Encourage proper citation habits and reduce academic dishonesty.</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-white rounded-lg shadow-sm dark:bg-authentiya-charcoal-light">
                <BookOpen className="text-authentiya-maroon mr-3 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-medium text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Assignment Insights</h3>
                  <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">Get statistical insights about class performance and identify at-risk students.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
