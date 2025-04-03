
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
    <Card className="w-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-fade-in h-full flex flex-col bg-gradient-to-br from-white via-white to-trust-light/10 dark:from-gray-900 dark:via-gray-900 dark:to-trust-dark/20 border-trust-light/20 dark:border-trust-dark/30 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-trust-primary via-trust-secondary to-trust-accent opacity-80"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between items-center">
          <span className="truncate pr-2 text-trust-dark dark:text-trust-light">{company.Company}</span>
          {company['Trust Center URL'] && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href={company['Trust Center URL']} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-trust-primary hover:text-trust-dark dark:text-trust-secondary dark:hover:text-trust-light transition-colors flex-shrink-0"
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
              className="text-xs flex-1 h-8 bg-white/70 dark:bg-gray-800/70 border-trust-primary/20 dark:border-trust-secondary/20 hover:bg-trust-light/20 dark:hover:bg-trust-dark/30 text-trust-primary dark:text-trust-secondary"
              onClick={() => handleCopyLink(company['Trust Center URL'])}
            >
              {copied ? <Check className="h-3 w-3 mr-1 text-green-500" /> : <Copy className="h-3 w-3 mr-1" />}
              Copy Link
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-xs flex-1 h-8 bg-trust-primary hover:bg-trust-dark dark:bg-trust-secondary dark:hover:bg-trust-accent"
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
                className="text-xs bg-trust-primary/10 hover:bg-trust-primary/20 text-trust-primary dark:bg-trust-secondary/20 dark:hover:bg-trust-secondary/30 dark:text-trust-secondary"
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
