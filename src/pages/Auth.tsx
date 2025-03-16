
/**
 * File: Auth.tsx
 * 
 * Description: This page component provides authentication functionality, including
 * login and signup forms with email/password authentication through Supabase.
 * 
 * Programmer: AI Assistant
 * Created: February 2024
 * Revised: June 2024 - Added comprehensive documentation and comments
 * 
 * Preconditions:
 *   - Requires Supabase client to be configured
 *   - Needs access to navigation functions for redirects after authentication
 * 
 * Postconditions:
 *   - User can sign in with existing credentials
 *   - User can sign up for a new account
 *   - Redirects to dashboard on successful authentication
 * 
 * Side effects:
 *   - Creates user records in Supabase auth system
 *   - Sets authentication state in browser storage
 *   - Displays toast notifications for success/error states
 * 
 * Known issues:
 *   - Password recovery functionality not implemented yet
 */

import React, { useState } from "react"; // Import React and useState hook
import { useNavigate } from "react-router-dom"; // Import navigation hook for redirects
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import { Button } from "@/components/ui/button"; // Import Button component
import { Input } from "@/components/ui/input"; // Import Input component
import { Label } from "@/components/ui/label"; // Import Label component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { GraduationCap, Mail, KeyRound, User } from "lucide-react"; // Import icons
import { toast } from "sonner"; // Import toast notification
import { supabase } from "@/integrations/supabase/client"; // Import Supabase client
import Header from "@/components/layout/Header"; // Import Header component

/**
 * Auth Component
 * 
 * Manages authentication UI and logic for user login and signup.
 * Provides tabbed interface to switch between login and signup forms.
 */
export default function Auth() {
  // Navigation hook for redirects
  const navigate = useNavigate();
  
  // Form states for login and signup
  const [loginEmail, setLoginEmail] = useState(""); // State for login email input
  const [loginPassword, setLoginPassword] = useState(""); // State for login password input
  const [signupEmail, setSignupEmail] = useState(""); // State for signup email input
  const [signupPassword, setSignupPassword] = useState(""); // State for signup password input
  const [firstName, setFirstName] = useState(""); // State for first name input
  const [lastName, setLastName] = useState(""); // State for last name input
  const [role, setRole] = useState<"student" | "teacher">("student"); // State for user role selection
  
  // Loading states for form submissions
  const [loginLoading, setLoginLoading] = useState(false); // Loading state for login form
  const [signupLoading, setSignupLoading] = useState(false); // Loading state for signup form
  
  /**
   * Handles user login with email and password
   * @param e - Form submit event
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    // Validation for required fields
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields"); // Show error toast for empty fields
      return;
    }
    
    try {
      setLoginLoading(true); // Set loading state to true
      
      // Attempt to sign in with Supabase auth
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      // Handle authentication errors
      if (error) {
        throw error; // Throw error to be caught by catch block
      }
      
      // Success handling
      toast.success("Logged in successfully"); // Show success toast
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error: any) {
      // Error handling with specific message if available
      toast.error(error.message || "Failed to log in"); // Show error toast
      console.error("Login error:", error); // Log detailed error to console
    } finally {
      setLoginLoading(false); // Reset loading state
    }
  };
  
  /**
   * Handles user signup with email, password and user details
   * @param e - Form submit event
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    // Validation for required fields
    if (!signupEmail || !signupPassword || !firstName || !lastName) {
      toast.error("Please fill in all fields"); // Show error toast for empty fields
      return;
    }
    
    // Password strength validation
    if (signupPassword.length < 6) {
      toast.error("Password must be at least 6 characters"); // Show error for weak password
      return;
    }
    
    try {
      setSignupLoading(true); // Set loading state to true
      
      // Attempt to sign up with Supabase auth
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
          },
        },
      });
      
      // Handle signup errors
      if (error) {
        throw error; // Throw error to be caught by catch block
      }
      
      // Success handling
      toast.success("Account created successfully", {
        description: "You can now log in with your credentials",
      });
      
      // Reset form fields
      setSignupEmail("");
      setSignupPassword("");
      setFirstName("");
      setLastName("");
    } catch (error: any) {
      // Error handling with specific message if available
      toast.error(error.message || "Failed to create account"); // Show error toast
      console.error("Signup error:", error); // Log detailed error to console
    } finally {
      setSignupLoading(false); // Reset loading state
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Page header */}
      <Header />
      
      {/* Main content */}
      <main className="flex-1 container py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <GraduationCap className="h-12 w-12 mx-auto text-authentiya-maroon dark:text-authentiya-accent-gold" />
            <h1 className="mt-4 text-3xl font-bold font-playfair">Welcome to Authentiya</h1>
            <p className="mt-2 text-muted-foreground">Sign in or create an account</p>
          </div>
          
          {/* Authentication tabs */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
            
            {/* Login form tab */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    {/* Email input field */}
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Password input field */}
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          className="pl-10"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full academic-btn-primary"
                      disabled={loginLoading}
                    >
                      {loginLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            {/* Signup form tab */}
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Enter your details to create a new account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    {/* First and last name inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="first-name"
                            placeholder="John"
                            className="pl-10"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Email input */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Password input */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          className="pl-10"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Password must be at least 6 characters</p>
                    </div>
                    
                    {/* Role selection */}
                    <div className="space-y-2">
                      <Label>I am a:</Label>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant={role === "student" ? "default" : "outline"}
                          onClick={() => setRole("student")}
                          className="flex-1"
                        >
                          Student
                        </Button>
                        <Button
                          type="button"
                          variant={role === "teacher" ? "default" : "outline"}
                          onClick={() => setRole("teacher")}
                          className="flex-1"
                        >
                          Teacher
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full academic-btn-primary"
                      disabled={signupLoading}
                    >
                      {signupLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
