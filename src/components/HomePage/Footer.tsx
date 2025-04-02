import React from 'react';
import { Shield, Github, Twitter, Mail, ExternalLink, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-muted mt-auto py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-lg font-semibold">TrustCenterDB</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              The comprehensive database for security and compliance certifications from major companies.
            </p>
          </div>

          {/* Resources section */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Compliance Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Company section */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">About Us</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">Contact</a>
              </li>
            </ul>
          </div>

          {/* Newsletter section */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates on new certifications and features.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="h-9" />
              <Button variant="outline" size="sm">
                Subscribe
              </Button>
            </div>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="GitHub">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="#" aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {currentYear} TrustCenterDB - Security & Compliance Certification Search Engine</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;