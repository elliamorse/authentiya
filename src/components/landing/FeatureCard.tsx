
/**
 * FeatureCard.tsx
 * 
 * A reusable component that displays a feature card with an icon, title, and description.
 * Used in both the hero section tabs and the features section.
 */

import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, className = '' }: FeatureCardProps) => {
  return (
    <div className={`flex items-start p-3 bg-white rounded-lg shadow-sm dark:bg-authentiya-charcoal-light ${className}`}>
      <Icon className="text-authentiya-maroon mr-3 mt-1 h-5 w-5" />
      <div>
        <h3 className="font-medium text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">{title}</h3>
        <p className="text-sm text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
