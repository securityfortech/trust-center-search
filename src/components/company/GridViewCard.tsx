
import React from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CompanyType } from './types';
import { useClipboard } from '@/hooks/useClipboard';

interface GridViewCardProps {
  company: CompanyType;
  hasCertifications: boolean;
  certificationBadges: string[];
}

const GridViewCard: React.FC<GridViewCardProps> = ({ 
  company, 
  hasCertifications, 
  certificationBadges 
}) => {
  const { copied, handleCopyLink } = useClipboard(company);
  
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-fade-in h-full flex flex-col border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gray-200 dark:bg-gray-700"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between items-center">
          <span className="truncate pr-2 text-gray-800 dark:text-gray-200 font-bold">
            {company.Company}
          </span>
          {company['Trust Center URL'] && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href={company['Trust Center URL']} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors flex-shrink-0"
                    aria-label={`Visit ${company.Company}'s trust center`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit trust center</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">
            View {company.Company}'s trust center for security and compliance information.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0 mt-auto">
        {company['Trust Center URL'] && (
          <div className="flex gap-2 mb-3 w-full">
            <Button
              variant="outline"
              size="sm"
              className="text-xs flex-1 h-8 bg-white/70 dark:bg-gray-800/70 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              onClick={() => handleCopyLink(company['Trust Center URL'])}
            >
              {copied ? <Check className="h-3 w-3 mr-1 text-green-500" /> : <Copy className="h-3 w-3 mr-1" />}
              Copy Link
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-xs flex-1 h-8 bg-gray-800 hover:bg-black dark:bg-gray-200 dark:hover:bg-white dark:text-gray-800"
              asChild
            >
              <a 
                href={company['Trust Center URL']} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Visit
              </a>
            </Button>
          </div>
        )}
        
        {hasCertifications && (
          <div className="flex flex-wrap gap-1 w-full">
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
      </CardFooter>
    </Card>
  );
};

export default GridViewCard;
