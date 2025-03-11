
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ClipboardCheck, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [activeTab, setActiveTab] = useState("signin");
  const [inviteInfo, setInviteInfo] = useState<{
    code: string;
    email: string;
    className: string;
  } | null>(null);

  // Parse URL parameters for invitation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const inviteCode = params.get('invite');
    const inviteEmail = params.get('email');
    const className = params.get('class');
    
    if (inviteCode && inviteEmail) {
      setInviteInfo({
        code: inviteCode,
        email: inviteEmail,
        className: className || "a class"
      });
      setEmail(inviteEmail);
      setActiveTab("signup");
    }
  }, [location]);

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (data.session) {
        navigate("/dashboard");
      }
    };

    handleAuthRedirect();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !firstName || !lastName) {
      toast.error("Please fill out all fields");
      return;
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // If this was an invited student, process the invitation
        if (inviteInfo && inviteInfo.code) {
          try {
            await processInvitation(data.user.id, inviteInfo.code);
          } catch (inviteError) {
            console.error("Error processing invitation:", inviteError);
            // Continue anyway, since the account creation was successful
          }
        }
        
        toast.success("Registration successful! Please check your email for verification");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please provide both email and password");
      return;
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.session) {
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };
  
  // Process the invitation after signup
  const processInvitation = async (userId: string, inviteCode: string) => {
    try {
      // First, check if the invitation is valid
      const { data: inviteData, error: inviteError } = await supabase
        .rpc('check_student_invitation', {
          student_email: email.toLowerCase().trim(),
          invite_code: inviteCode
        });
      
      if (inviteError) throw inviteError;
      
      if (!inviteData || inviteData.length === 0) {
        throw new Error("Invalid invitation");
      }
      
      // Add the student to the class
      const { error: enrollError } = await supabase
        .from("class_students")
        .insert({
          student_id: userId,
          class_id: inviteData[0].class_id
        });
        
      if (enrollError) throw enrollError;
      
      // Update invitation status
      const { error: updateError } = await supabase
        .from("invitations")
        .update({ status: "accepted" })
        .eq("id", inviteData[0].invitation_id);
        
      if (updateError) throw updateError;
      
      return true;
    } catch (error) {
      console.error("Error processing invitation:", error);
      throw error;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <ClipboardCheck className="h-12 w-12 text-authentiya-maroon" />
          </div>
          <CardTitle className="text-2xl font-bold font-playfair">Authentiya</CardTitle>
          <CardDescription>Academic integrity tracking application</CardDescription>
          
          {inviteInfo && (
            <Alert className="mt-4 bg-authentiya-maroon/10 text-authentiya-maroon border-authentiya-maroon/20">
              <Info className="h-4 w-4" />
              <AlertDescription>
                You've been invited to join <strong>{inviteInfo.className}</strong>. Create an account to accept the invitation.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input 
                    id="signin-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input 
                    id="signin-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full academic-btn-primary" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input 
                      id="first-name" 
                      placeholder="John" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
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
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!!inviteInfo}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="role-student"
                        name="role"
                        className="mr-2"
                        checked={role === "student"}
                        onChange={() => setRole("student")}
                      />
                      <Label htmlFor="role-student">Student</Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="role-teacher"
                        name="role"
                        className="mr-2"
                        checked={role === "teacher"}
                        onChange={() => setRole("teacher")}
                        disabled={!!inviteInfo}
                      />
                      <Label htmlFor="role-teacher">Teacher</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full academic-btn-primary" 
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
