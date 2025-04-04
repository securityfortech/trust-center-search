
import React from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CompanyType } from './types';
import { useClipboard } from '@/hooks/useClipboard';

interface ListViewCardProps {
  company: CompanyType;
  hasCertifications: boolean;
  certificationBadges: string[];
}

const ListViewCard: React.FC<ListViewCardProps> = ({ 
  company, 
  hasCertifications, 
  certificationBadges 
}) => {
  const { copied, handleCopyLink } = useClipboard(company);
  
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md animate-fade-in flex flex-row overflow-hidden border-gray-200 dark:border-gray-700">
      <div className="flex-grow p-4 flex flex-col md:flex-row md:items-center">
        <div className="md:w-1/3">
          <h3 className="text-lg font-medium truncate text-gray-800 dark:text-gray-200">
            {company.Company}
          </h3>
        </div>
        
        <div className="flex-grow md:w-1/3 mt-2 md:mt-0">
          {hasCertifications && (
            <div className="flex flex-wrap gap-1">
              {certificationBadges.map((cert) => (
                <Badge 
                  key={cert} 
                  variant="secondary" 
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="md:w-1/3 mt-3 md:mt-0 flex justify-start md:justify-end space-x-2">
          {company['Trust Center URL'] && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 bg-white/80 dark:bg-gray-800/80 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleCopyLink(company['Trust Center URL'])}
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-700 dark:text-gray-300" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy trust center link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="default"
                      className="h-8 bg-gray-800 hover:bg-black dark:bg-gray-200 dark:hover:bg-white dark:text-gray-800"
                      asChild
                    >
                      <a 
                        href={company['Trust Center URL']} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Visit ${company.Company}'s trust center`}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Visit</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open trust center</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ListViewCard;
