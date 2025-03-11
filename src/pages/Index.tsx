
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "../components/layout/Header";
import { ClipboardCheck, BookOpen, Shield, Clock } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
                Safeguarding Academic Integrity
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
                Authentiya helps teachers monitor student writing progress and provides students with tools to properly cite sources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg" className="academic-btn-primary">
                    Get Started
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 font-playfair text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
              How Authentiya Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-authentiya-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-authentiya-maroon" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor writing progress, time spent, and citation metrics as students work.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-authentiya-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-authentiya-maroon" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Plagiarism Prevention</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Detect copy-paste actions and prompt students to properly cite sources.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-authentiya-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-authentiya-maroon" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Integration with LMS</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Seamlessly works with existing learning management systems and workflows.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-10 font-playfair text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
              Ready to Enhance Academic Integrity?
            </h2>
            <Link to="/auth">
              <Button size="lg" className="academic-btn-primary">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ClipboardCheck className="h-6 w-6 mr-2 text-authentiya-maroon" />
              <span className="font-bold text-lg font-playfair">Authentiya</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Authentiya. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
