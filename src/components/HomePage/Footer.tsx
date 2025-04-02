
import React from 'react';
import { Shield, Github, Twitter, Mail, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 mt-auto py-6 md:py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Combined brand section with links */}
          <div className="space-y-4 md:col-span-3 text-center flex flex-col items-center">
            <div className="flex items-center justify-center">
              <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary mr-2" />
              <h3 className="text-base md:text-lg font-semibold">Trust Center Search</h3>
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-md px-2">
              The comprehensive database for security and compliance certifications from major companies.
            </p>
            
            {/* Company links - horizontal on mobile */}
            <div className={isMobile ? "flex flex-wrap justify-center gap-4 pt-2" : "space-y-3 pt-2"}>
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
            
            {/* Social media icons */}
            <div className="flex space-x-4 pt-2 justify-center">
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
          </div>
        </div>

        <Separator className="my-4 md:my-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-center text-xs md:text-sm text-center">
          <p className="text-gray-600 dark:text-gray-400">© {currentYear} Trust Center Explorer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
