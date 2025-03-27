
/**
 * Header.tsx
 * 
 * This component renders the header section of the Authentiya application,
 * including navigation links, user account menu, and sign-in button.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * - 3/27/2025: Enhanced the Sign In button - AI Assistant
 * 
 * Preconditions:
 * - The `react-router-dom` and `lucide-react` libraries must be installed and properly configured.
 * 
 * Acceptable Input:
 * - `email`: string - The email of the logged-in user.
 * - `handleLogout`: function - The function to handle user logout.
 * 
 * Postconditions:
 * - Renders the header section with navigation links, user account menu, and sign-in button.
 * 
 * Return Values:
 * - None directly, but renders a header element.
 * 
 * Error and Exception Conditions:
 * - None identified.
 * 
 * Side Effects:
 * - None identified.
 * 
 * Invariants:
 * - The header must always render with the specified structure and content.
 * 
 * Known Faults:
 * - None identified.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ClipboardCheck, LogIn, LogOut, Settings, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  userEmail?: string;
  userRole?: "student" | "teacher";
  onLogout?: () => void;
}

export default function Header({ userEmail, userRole, onLogout }: HeaderProps) {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const auth = useAuth();
  
  // Use context auth if available, otherwise use props (for backward compatibility)
  const email = auth.user?.email || userEmail;
  const handleLogout = onLogout || auth.signOut;
  
  // Add scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }
  
  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block font-playfair">Authentiya</span>
          </Link>
          
          {email && !isMobile && (
            <nav className="flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
              {userRole === "student" ? (
                <Link to="/student/assignments" className="text-sm font-medium transition-colors hover:text-primary">
                  My Assignments
                </Link>
              ) : (
                <Link to="/teacher" className="text-sm font-medium transition-colors hover:text-primary">
                  My Classes
                </Link>
              )}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex w-full items-center cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex w-full items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="gap-2 academic-btn-primary">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
