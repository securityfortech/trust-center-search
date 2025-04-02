
import React from 'react';
import { ExternalLink, Shield } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';

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
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
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
  
  const handleCopyLink = () => {
    if (company['Trust Center URL']) {
      navigator.clipboard.writeText(company['Trust Center URL']);
      toast.success(`Copied ${company.Company}'s trust center link`, {
        duration: 3000,
      });
    }
  };
  
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md animate-fade-in h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between items-center">
          <span className="truncate pr-2">{company.Company}</span>
          {company['Trust Center URL'] && (
            <a 
              href={company['Trust Center URL']} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
              aria-label={`Visit ${company.Company}'s trust center`}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
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
          <div className="flex gap-2 mb-3">
            <a 
              href={company['Trust Center URL']} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline text-xs"
            >
              Visit Trust Center
            </a>
            <button
              onClick={handleCopyLink}
              className="text-primary/80 hover:text-primary text-xs hover:underline"
            >
              Copy Link
            </button>
          </div>
        )}
        
        {hasCertifications && (
          <div className="flex flex-wrap gap-1">
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
