
/**
 * ContactForm.tsx
 * 
 * This component provides a general contact form for users interested in Authentiya.
 * It collects user information including name, email, role, institution, and additional messages
 * and provides submission feedback through toast notifications.
 * 
 * Updates:
 * - Enhanced error handling and feedback
 * - Improved loading state management
 * - Better error reporting from edge function
 * - Removed pricing-specific language to make it a general contact form
 */

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "teacher",
    institution: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, insert the inquiry into the database
      const { error: dbError } = await supabase
        .from('pricing_inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          institution: formData.institution,
          message: formData.message
        });

      if (dbError) throw dbError;

      // Show a toast that the submission is in progress
      toast.info("Submitting your inquiry...");

      // Then, send an email via the edge function
      const { data, error } = await supabase.functions.invoke('send-pricing-inquiry', {
        body: JSON.stringify(formData)
      });

      if (error) throw error;

      console.log("Edge function response:", data);

      // Show success toast
      toast.success("Thank you for contacting us!", {
        description: "Our team will get back to you shortly.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "teacher",
        institution: "",
        message: ""
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Oops! Something went wrong.", {
        description: error.message || "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-authentiya-accent-cream to-white dark:from-authentiya-charcoal-dark dark:to-authentiya-charcoal-darkest py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="w-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl md:text-3xl text-authentiya-charcoal-darkest dark:text-white">
              Contact Us
            </CardTitle>
            <CardDescription className="text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">
              Have questions? Complete the form below and our team will get in touch with you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name" 
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your Role</Label>
                <RadioGroup 
                  value={formData.role} 
                  onValueChange={handleRoleChange}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher" className="cursor-pointer">Teacher/Professor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="administrator" id="administrator" />
                    <Label htmlFor="administrator" className="cursor-pointer">School Administrator</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Institution Name</Label>
                <Input 
                  id="institution" 
                  name="institution" 
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="School or university name" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you"
                  rows={4}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full academic-btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
