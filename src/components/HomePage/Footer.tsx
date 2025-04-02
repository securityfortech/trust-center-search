import React from 'react';
import { Shield, Github, Twitter, Mail, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-gray-50 dark:bg-gray-900 mt-auto py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-lg font-semibold">Trust Center Search</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The comprehensive database for security and compliance certifications from major companies.
            </p>
          </div>

          {/* Company section - replacing the Newsletter section */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">SecurityforTech</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary hover:underline">About Us</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary hover:underline">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary hover:underline">Contact</a>
              </li>
            </ul>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="GitHub" className="hover:scale-105 transition-transform">
                <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:scale-105 transition-transform">
                <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:scale-105 transition-transform">
                <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="Email" className="hover:scale-105 transition-transform">
                <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-600 dark:text-gray-400">© {currentYear} Trust Center Explorer - Security & Compliance Certification Search Engine</p>
        </div>
      </div>
    </footer>;
};
export default Footer;