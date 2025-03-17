/**
 * Index.tsx
 * 
 * This component renders the main landing page of the application, providing an introduction and links to other sections.
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
 * - None directly, as this component does not accept props.
 * 
 * Postconditions:
 * - Renders the main landing page with an introduction and links to other sections.
 * 
 * Return Values:
 * - None directly, but renders a page element.
 */

import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';
import Header from '@/components/layout/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-authentiya-accent-cream to-white dark:from-authentiya-charcoal-dark dark:to-authentiya-charcoal-darkest">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
