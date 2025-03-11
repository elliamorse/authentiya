
/**
 * Index.tsx
 * 
 * This component serves as the landing page for Authentiya. It showcases the main features
 * of the application through a hero section, features section, and information about how
 * the platform works. The page has been refactored into smaller, more maintainable components
 * while preserving the exact same functionality.
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
