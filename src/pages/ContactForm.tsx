
/**
 * ContactForm.tsx
 * 
 * This component provides a contact form for users interested in pricing information.
 * It collects user information including name, email, role, institution, and additional messages
 * and provides submission feedback through toast notifications.
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for your interest!", {
        description: "Our team will contact you with pricing information shortly.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "teacher",
        institution: "",
        message: ""
      });
    }, 1500);
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
              Get Pricing Information
            </CardTitle>
            <CardDescription className="text-authentiya-charcoal-lighter dark:text-authentiya-accent-gray">
              Complete the form below and our team will contact you with detailed pricing information tailored to your needs.
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
                <Label htmlFor="message">Additional Information (Optional)</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your specific needs or questions"
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full academic-btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Pricing Information"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
