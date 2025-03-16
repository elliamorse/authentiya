/**
 * File: Header.tsx
 * 
 * Description: This component renders the application header with navigation elements,
 * user authentication status, and theme toggle functionality. It provides the main
 * navigation interface for the entire application.
 * 
 * Programmer: AI Assistant
 * Created: February 2024
 * Revised: June 2024 - Added comprehensive documentation and comments
 * 
 * Preconditions:
 *   - Requires AuthContext to be available for user authentication state
 *   - Expects userEmail, userRole, and onLogout props when authenticated
 * 
 * Postconditions:
 *   - Renders a responsive header with navigation links
 *   - Shows login/signup button when user is not authenticated
 *   - Shows user info and logout option when authenticated
 * 
 * Side effects:
 *   - Navigates to different routes when nav links are clicked
 *   - Toggles mobile menu visibility state
 * 
 * Known issues:
 *   - None currently identified
 */

import React, { useState } from "react"; // Import React and useState hook for component state management
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import routing utilities
import { Button } from "@/components/ui/button"; // Import Button component from shadcn UI
import { ThemeToggle } from "@/components/theme/ThemeToggle"; // Import theme toggle component
import { useAuth } from "@/contexts/AuthContext"; // Import auth context for user authentication state
import {
  GraduationCap,
  Menu,
  X, 
  LogOut,
  User
} from "lucide-react"; // Import icons for visual elements

// Define prop types for the Header component
interface HeaderProps {
  userEmail?: string | null;
  userRole?: string | null;
  onLogout?: () => void;
}

/**
 * Header Component
 * 
 * Renders the application header with responsive navigation, authentication buttons,
 * and user account information when logged in.
 * 
 * @param userEmail - Email of the authenticated user (optional)
 * @param userRole - Role of the authenticated user (student/teacher) (optional)
 * @param onLogout - Function to handle user logout (optional)
 */
export default function Header({ userEmail, userRole, onLogout }: HeaderProps) {
  // Initialize state for mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Access navigation and location hooks for routing
  const navigate = useNavigate();
  const location = useLocation();
  
  // Access authentication context for user state
  const { user, signOut } = useAuth();
  
  // Define active path style for navigation highlighting
  const activePath = "text-authentiya-maroon dark:text-authentiya-accent-gold font-medium";
  
  /**
   * Handles user logout action
   * - Calls provided onLogout prop if available
   * - Otherwise uses signOut from auth context
   * - Navigates to home page after logout
   */
  const handleLogout = async () => {
    if (onLogout) {
      // Use provided logout handler if available
      onLogout();
    } else if (signOut) {
      // Otherwise use auth context signOut
      await signOut();
      navigate("/");
    }
  };
  
  /**
   * Determines if a navigation path is active
   * @param path - The path to check
   * @returns CSS class string for active or inactive path
   */
  const isActive = (path: string) => {
    return location.pathname === path ? activePath : "hover:text-authentiya-maroon dark:hover:text-authentiya-accent-gold";
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and branding section */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-authentiya-maroon dark:text-authentiya-accent-gold" />
            <span className="font-bold font-playfair text-xl">Authentiya</span>
          </Link>
        </div>
        
        {/* Desktop navigation links - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm ${isActive("/")}`}>
            Home
          </Link>
          {user && (
            <Link to="/dashboard" className={`text-sm ${isActive("/dashboard")}`}>
              Dashboard
            </Link>
          )}
          <Link to="/contact" className={`text-sm ${isActive("/contact")}`}>
            Contact
          </Link>
        </nav>
        
        {/* Right side actions section - theme toggle and auth buttons */}
        <div className="flex items-center gap-4">
          {/* Theme toggle component for light/dark mode */}
          <ThemeToggle />
          
          {/* Show authenticated user info or login button */}
          {user || userEmail ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {userEmail || user?.email}
                {userRole && ` (${userRole})`}
              </span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="h-8 w-8"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/auth")}
              className="hidden md:flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Sign In
            </Button>
          )}
          
          {/* Mobile menu toggle button - only visible on mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation menu - only visible when mobileMenuOpen is true */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`text-sm ${isActive("/")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {(user || userEmail) && (
              <Link
                to="/dashboard"
                className={`text-sm ${isActive("/dashboard")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/contact"
              className={`text-sm ${isActive("/contact")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile auth buttons */}
            {user || userEmail ? (
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  {userEmail || user?.email}
                  {userRole && ` (${userRole})`}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start mt-2"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
