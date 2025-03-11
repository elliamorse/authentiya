
/**
 * Footer.tsx
 * 
 * This component renders the footer section of the Authentiya landing page,
 * displaying the logo, links to various pages, and copyright information.
 */

import { Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
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
          <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">© {currentYear} Authentiya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
