
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TrustCenterForm from '@/components/TrustCenterForm';
import Footer from '@/components/HomePage/Footer';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AddTrustCenter: React.FC = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = "Add Your Trust Center - Trust Center Search";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white dark:bg-gray-900 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-primary flex items-center">
              <ArrowUp className="h-4 w-4 mr-1 transform rotate-270" />
              Back to Search
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Add Your Trust Center</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Submit your company's Trust Center to be included in our database. Our team will review and add it to our search engine.
            </p>
          </div>
          
          <TrustCenterForm />
          
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium mb-2">What happens next?</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Our team will review your submission</li>
              <li>We'll verify the Trust Center URL and company information</li>
              <li>Once approved, your Trust Center will appear in our search results</li>
            </ol>
          </div>
        </div>
      </main>
      
      {isMobile ? (
        <footer className="w-full bg-gray-100 dark:bg-gray-800 py-4 mt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/" className="hover:underline">Home</Link>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
            </div>
          </div>
        </footer>
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default AddTrustCenter;
