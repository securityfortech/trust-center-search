
import React from 'react';
import { ExternalLink, Shield, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CompanyCardProps {
  company: {
    Company: string;
    'Trust Center URL': string;
    'AICPA SOC 1'?: string;
    'AICPA SOC 2'?: string;
    'AICPA SOC 3'?: string;
    'ISO 27001'?: string;
    'PCI DSS Level 1'?: string;
    [key: string]: string | undefined;
  };
  layout?: 'grid' | 'list';
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, layout = 'grid' }) => {
  // Check certifications
  const hasSOC = company['AICPA SOC 1'] === 'TRUE' || 
                company['AICPA SOC 2'] === 'TRUE' || 
                company['AICPA SOC 3'] === 'TRUE';
  
  const hasISO27001 = company['ISO 27001'] === 'TRUE';
  const hasPCIDSS = company['PCI DSS Level 1'] === 'TRUE';
  const hasCertifications = hasSOC || hasISO27001 || hasPCIDSS;
  
  // Collect and sort certifications for display
  const certificationBadges = [
    ...(company['AICPA SOC 1'] === 'TRUE' ? ['SOC 1'] : []),
    ...(company['AICPA SOC 2'] === 'TRUE' ? ['SOC 2'] : []),
    ...(company['AICPA SOC 3'] === 'TRUE' ? ['SOC 3'] : []),
    ...(hasISO27001 ? ['ISO 27001'] : []),
    ...(hasPCIDSS ? ['PCI DSS'] : [])
  ].sort();
  
  const [copied, setCopied] = React.useState(false);
  
  const handleCopyLink = () => {
    if (company['Trust Center URL']) {
      navigator.clipboard.writeText(company['Trust Center URL']);
      setCopied(true);
      toast.success(`Copied ${company.Company}'s trust center link`, {
        duration: 3000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (layout === 'list') {
    return (
      <Card className="w-full transition-all duration-300 hover:shadow-md animate-fade-in flex flex-row overflow-hidden">
        <div className="flex-grow p-4 flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/3">
            <h3 className="text-lg font-medium truncate">{company.Company}</h3>
          </div>
          
          <div className="flex-grow md:w-1/3 mt-2 md:mt-0">
            {hasCertifications && (
              <div className="flex flex-wrap gap-1">
                {certificationBadges.map((cert) => (
                  <Badge key={cert} variant="secondary" className="text-xs">{cert}</Badge>
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
                        className="h-8"
                        onClick={handleCopyLink}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                        className="h-8"
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
  }
  
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md animate-fade-in h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between items-center">
          <span className="truncate pr-2">{company.Company}</span>
          {company['Trust Center URL'] && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href={company['Trust Center URL']} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
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
              className="text-xs flex-1 h-8"
              onClick={handleCopyLink}
            >
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              Copy Link
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-xs flex-1 h-8"
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
              <Badge key={cert} variant="secondary" className="text-xs">{cert}</Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
