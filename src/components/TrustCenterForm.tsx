
import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const TrustCenterForm: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <Shield className="h-5 w-5 text-primary mr-2" />
          Submission Process:
        </h3>
        <ol className="space-y-3">
          <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span>Send an email to <a href="mailto:contact@securityfortech.com" className="text-primary hover:underline">contact@securityfortech.com</a> with your company name and trust center URL</span>
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span>Our team will review your submission</span>
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span>We'll verify the Trust Center URL and company information</span>
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span>Once approved, your Trust Center will appear in our search results</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TrustCenterForm;
