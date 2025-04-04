import React, { useMemo } from 'react';
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

// Array of gradient colors for cards
const cardGradients = [
  'from-gray-50 via-white to-gray-100 dark:from-gray-950/30 dark:via-gray-900 dark:to-gray-900/20',
  'from-blue-50 via-white to-blue-100 dark:from-blue-950/30 dark:via-gray-900 dark:to-blue-900/20',
  'from-purple-50 via-white to-purple-100 dark:from-purple-950/30 dark:via-gray-900 dark:to-purple-900/20',
  'from-green-50 via-white to-green-100 dark:from-green-950/30 dark:via-gray-900 dark:to-green-900/20',
  'from-stone-50 via-white to-stone-100 dark:from-stone-950/30 dark:via-gray-900 dark:to-stone-900/20',
  'from-neutral-50 via-white to-neutral-100 dark:from-neutral-950/30 dark:via-gray-900 dark:to-neutral-900/20',
  'from-zinc-50 via-white to-zinc-100 dark:from-zinc-950/30 dark:via-gray-900 dark:to-zinc-900/20',
  'from-white via-white/90 to-white/80 dark:from-gray-950/30 dark:via-gray-900 dark:to-gray-900/20',
];

// Array of accent line gradients
const accentGradients = [
  'from-gray-400 via-gray-500 to-gray-400',
  'from-blue-400 via-blue-500 to-blue-400',
  'from-purple-400 via-purple-500 to-purple-400',
  'from-green-400 via-green-500 to-green-400',
  'from-stone-400 via-stone-500 to-stone-400',
  'from-neutral-400 via-neutral-500 to-neutral-400',
  'from-trust-primary via-trust-secondary to-trust-accent',
];

const GridViewCard: React.FC<GridViewCardProps> = ({ 
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
  const accentGradient = accentGradients[getRandomIndex];

  return (
    <Card className={`w-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-fade-in h-full flex flex-col bg-gradient-to-br ${cardGradient} border-trust-light/20 dark:border-trust-dark/30 overflow-hidden`}>
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentGradient} opacity-80`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between items-center">
          <span 
            className="truncate pr-2 bg-gradient-to-r from-trust-primary via-trust-secondary to-trust-accent bg-clip-text text-transparent font-bold"
          >
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
