
import React from 'react';
import { Github, Twitter, Mail, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      duration: 3000
    });
  };

  return (
    <footer className="bg-background dark:bg-gray-900 mt-auto py-8 md:py-12 border-t border-gray-100 dark:border-gray-800 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Block 1: Brand and description */}
          <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start">
              <h3 className="text-lg md:text-xl font-bold text-primary">Trust Center Search</h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-md px-2 md:px-0">
              A search engine for security and compliance certifications from leading companies.
            </p>
            
            <div className="flex flex-col space-y-3 items-center md:items-start">
              <Link to="/add-trust-center" className="group text-trust-primary hover:text-trust-dark text-sm md:text-base font-medium transition-colors inline-flex items-center">
                <span className="border-b border-transparent group-hover:border-current transition-colors">Add your Trust Center</span>
              </Link>
              <button 
                onClick={handleCopyLink} 
                className="group text-trust-primary hover:text-trust-dark text-sm md:text-base font-medium transition-colors inline-flex items-center"
              >
                <span className="border-b border-transparent group-hover:border-current transition-colors">Share this tool</span>
              </button>
            </div>
          </div>
          
          {/* Block 2: Links and navigation */}
          <div className="space-y-4 text-center md:text-right">
            <h3 className="text-lg md:text-xl font-bold text-primary">Links</h3>
            {/* Company links - horizontal on mobile, vertical on desktop */}
            <div className={isMobile ? "flex flex-wrap justify-center gap-4 pt-1" : "space-y-3 pt-1 flex flex-col items-end"}>
              <a href="#" className="group text-sm md:text-base text-muted-foreground hover:text-trust-primary transition-colors">
                <span className="border-b border-transparent group-hover:border-current transition-colors">About Us</span>
              </a>
              <a href="#" className="group text-sm md:text-base text-muted-foreground hover:text-trust-primary transition-colors">
                <span className="border-b border-transparent group-hover:border-current transition-colors">Privacy Policy</span>
              </a>
              <a href="#" className="group text-sm md:text-base text-muted-foreground hover:text-trust-primary transition-colors">
                <span className="border-b border-transparent group-hover:border-current transition-colors">Terms of Service</span>
              </a>
              <a href="#" className="group text-sm md:text-base text-muted-foreground hover:text-trust-primary transition-colors">
                <span className="border-b border-transparent group-hover:border-current transition-colors">Contact</span>
              </a>
              
              {/* Social media icons */}
              <div className={`flex ${isMobile ? 'justify-center' : 'justify-end'} space-x-5 pt-2 mt-2`}>
                <a href="#" aria-label="GitHub" className="hover:scale-110 transition-transform text-muted-foreground hover:text-trust-primary">
                  <Github className="h-5 w-5 md:h-6 md:w-6 transition-colors" />
                </a>
                <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform text-muted-foreground hover:text-trust-primary">
                  <Twitter className="h-5 w-5 md:h-6 md:w-6 transition-colors" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition-transform text-muted-foreground hover:text-trust-primary">
                  <Linkedin className="h-5 w-5 md:h-6 md:w-6 transition-colors" />
                </a>
                <a href="#" aria-label="Email" className="hover:scale-110 transition-transform text-muted-foreground hover:text-trust-primary">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 md:my-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-center text-sm text-center text-muted-foreground">
          <p className="flex items-center">
            © {currentYear} Trust Center Search · Made for the security community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
