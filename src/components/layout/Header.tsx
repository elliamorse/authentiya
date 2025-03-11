
/**
 * Header.tsx
 * 
 * This component displays the header for the application.
 * It includes navigation links and user profile information.
 * Updated to rename "Dashboard" navigation item to "Editor".
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
import { ClipboardCheck, LogOut, Settings, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "../theme/ThemeToggle";

interface HeaderProps {
  userEmail?: string;
  userRole?: "student" | "teacher";
  onLogout?: () => void;
}

export default function Header({ userEmail, userRole, onLogout }: HeaderProps) {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  
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
          
          {userEmail && !isMobile && (
            <nav className="flex items-center gap-6">
              <Link to="/editor" className="text-sm font-medium transition-colors hover:text-primary">
                Editor
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
          
          {userEmail ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{userEmail}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/editor" className="flex w-full items-center cursor-pointer">
                    Editor
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
                  onClick={onLogout}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
