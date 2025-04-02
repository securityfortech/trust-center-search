
import React from 'react';
import { Shield, Github, Twitter, Mail, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      duration: 3000
    });
  };

  return <footer className="bg-gray-50 dark:bg-gray-900 mt-auto py-6 md:py-10 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-3 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          {/* Block 1: Brand and description */}
          <div className="space-y-3 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start">
              <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary mr-2" />
              <h3 className="text-base md:text-lg font-semibold">Trust Center Search</h3>
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-md px-2 md:px-0">A search engine for security and compliance certifications from leading companies.</p>
            
            {/* Social media icons */}
            <div className="flex space-x-4 pt-1 justify-center md:justify-start">
              <a href="#" aria-label="GitHub" className="hover:scale-105 transition-transform">
                <Github className="h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:scale-105 transition-transform">
                <Twitter className="h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:scale-105 transition-transform">
                <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="Email" className="hover:scale-105 transition-transform">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
              </a>
            </div>
            
            <button onClick={handleCopyLink} className="text-primary hover:text-primary/80 text-xs md:text-sm font-medium transition-colors mt-1">
              Share this tool
            </button>
          </div>
          
          {/* Block 2: Links and navigation */}
          <div className="space-y-3 text-center md:text-right">
            <h3 className="text-base md:text-lg font-semibold">Links</h3>
            {/* Company links - horizontal on mobile, vertical on desktop */}
            <div className={isMobile ? "flex flex-wrap justify-center gap-3 pt-1" : "space-y-2 pt-1 flex flex-col items-end"}>
              <a href="#" className="text-xs md:text-sm text-gray-700 dark:text-gray-300 hover:text-primary hover:underline">
                About Us
              </a>
              <a href="#" className="text-xs md:text-sm text-gray-700 dark:text-gray-300 hover:text-primary hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-xs md:text-sm text-gray-700 dark:text-gray-300 hover:text-primary hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-xs md:text-sm text-gray-700 dark:text-gray-300 hover:text-primary hover:underline">
                Contact
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-3 md:my-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-center text-xs md:text-sm text-center">
          <p className="text-gray-600 dark:text-gray-400">© {currentYear} Trust Center Search</p>
        </div>
      </div>
    </footer>;
};

export default Footer;
