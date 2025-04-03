
import React, { useMemo } from 'react';
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

// Array of gradient colors for cards
const cardGradients = [
  'from-white to-pink-50/10 dark:from-gray-900 dark:to-pink-900/20',
  'from-white to-blue-50/10 dark:from-gray-900 dark:to-blue-900/20',
  'from-white to-purple-50/10 dark:from-gray-900 dark:to-purple-900/20',
  'from-white to-green-50/10 dark:from-gray-900 dark:to-green-900/20',
  'from-white to-amber-50/10 dark:from-gray-900 dark:to-amber-900/20',
  'from-white to-teal-50/10 dark:from-gray-900 dark:to-teal-900/20',
  'from-white to-indigo-50/10 dark:from-gray-900 dark:to-indigo-900/20',
  'from-white to-trust-light/5 dark:from-gray-900 dark:to-trust-dark/20',
];

const ListViewCard: React.FC<ListViewCardProps> = ({ 
  company, 
  hasCertifications, 
  certificationBadges 
}) => {
  const { copied, handleCopyLink } = useClipboard(company);

  // Generate deterministic but random-looking index based on company name
  const getRandomIndex = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < company.Company.length; i++) {
      hash = company.Company.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % cardGradients.length;
  }, [company.Company]);
  
  const cardGradient = cardGradients[getRandomIndex];

  return (
    <Card className={`w-full transition-all duration-300 hover:shadow-md animate-fade-in flex flex-row overflow-hidden bg-gradient-to-r ${cardGradient} border-trust-light/20 dark:border-trust-dark/30`}>
      <div className="flex-grow p-4 flex flex-col md:flex-row md:items-center">
        <div className="md:w-1/3">
          <h3 
            className="text-lg font-medium truncate bg-gradient-to-r from-trust-primary via-trust-secondary to-trust-accent bg-clip-text text-transparent"
          >
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
                  className="text-xs bg-trust-primary/10 hover:bg-trust-primary/20 text-trust-primary dark:bg-trust-secondary/20 dark:hover:bg-trust-secondary/30 dark:text-trust-secondary"
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
                      className="h-8 bg-white/80 dark:bg-gray-800/80 border-trust-primary/20 dark:border-trust-secondary/20 hover:bg-trust-light/20 dark:hover:bg-trust-dark/30"
                      onClick={() => handleCopyLink(company['Trust Center URL'])}
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-trust-primary dark:text-trust-secondary" />}
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
                      className="h-8 bg-trust-primary hover:bg-trust-dark dark:bg-trust-secondary dark:hover:bg-trust-accent"
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
