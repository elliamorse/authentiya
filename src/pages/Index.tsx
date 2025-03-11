
/**
 * Index.tsx
 * 
 * This component serves as the landing page for Authentiya. It showcases the main features
 * of the application through a hero section, features section, and information about how
 * the platform works. The page includes tabbed content for different user roles (students and teachers)
 * and call-to-action buttons that guide users to either request pricing information or learn more.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Shield, ClipboardCheck, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');

  const handleGetStarted = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-authentiya-accent-cream to-white dark:from-authentiya-charcoal-dark dark:to-authentiya-charcoal-darkest">
      {/* Hero Section */}
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
                Get Started
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
      
      {/* Features Section */}
      <div id="how-it-works" className="bg-white dark:bg-authentiya-charcoal-dark authentiya-section">
        <div className="authentiya-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="authentiya-heading mb-4">How Authentiya Works</h2>
            <p className="authentiya-text">Our platform provides a seamless experience for both students and teachers, promoting academic integrity while enhancing the writing process.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="authentiya-card p-6">
              <div className="w-12 h-12 bg-authentiya-maroon/10 text-authentiya-maroon rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="authentiya-subheading mb-3">Link to Assignments</h3>
              <p className="authentiya-text">Students connect Authentiya to their current assignment from Canvas or other LMS platforms with a single click.</p>
            </div>
            
            <div className="authentiya-card p-6">
              <div className="w-12 h-12 bg-authentiya-maroon/10 text-authentiya-maroon rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="authentiya-subheading mb-3">Track Writing Time</h3>
              <p className="authentiya-text">The extension monitors active writing time, copy-paste actions, and provides real-time word count metrics.</p>
            </div>
            
            <div className="authentiya-card p-6">
              <div className="w-12 h-12 bg-authentiya-maroon/10 text-authentiya-maroon rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="authentiya-subheading mb-3">Verify & Submit</h3>
              <p className="authentiya-text">Teachers receive comprehensive reports on student writing processes, helping identify potential issues and provide targeted support.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              onClick={handleGetStarted} 
              size="lg" 
              className="gap-2 px-8 academic-btn-primary"
            >
              Start Using Authentiya
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-authentiya-accent-cream dark:bg-authentiya-charcoal border-t border-gray-100 dark:border-authentiya-charcoal-lighter py-12">
        <div className="authentiya-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold text-authentiya-charcoal-darkest dark:text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-authentiya-maroon" />
                Authentiya
              </h2>
              <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray mt-1">Proof-of-Authorship Solution for Education</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="authentiya-link text-sm">Privacy Policy</a>
              <a href="#" className="authentiya-link text-sm">Terms of Service</a>
              <a href="#" className="authentiya-link text-sm">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-authentiya-charcoal-lighter text-center">
            <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">© {new Date().getFullYear()} Authentiya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
