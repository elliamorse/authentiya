
/**
 * FeaturesSection.tsx
 * 
 * This component displays the "How Authentiya Works" section of the landing page,
 * highlighting the key features and workflow of the application with cards for each step.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturesSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  return (
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
  );
};

export default FeaturesSection;
