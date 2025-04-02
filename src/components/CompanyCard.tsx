
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  // Check if the company has any SOC certification
  const hasSOC = company['AICPA SOC 1'] === 'TRUE' || 
                company['AICPA SOC 2'] === 'TRUE' || 
                company['AICPA SOC 3'] === 'TRUE';
  
  // Check if the company has ISO 27001 certification
  const hasISO27001 = company['ISO 27001'] === 'TRUE';
  
  // Check if the company has PCI DSS Level 1 certification
  const hasPCIDSS = company['PCI DSS Level 1'] === 'TRUE';
  
  // Check if the company has any certifications to display
  const hasCertifications = hasSOC || hasISO27001 || hasPCIDSS;
  
  console.log('Company:', company.Company, 'Has SOC:', hasSOC, 'SOC 1:', company['AICPA SOC 1'], 'SOC 2:', company['AICPA SOC 2'], 'SOC 3:', company['AICPA SOC 3']);
  
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between items-center">
          <span>{company.Company}</span>
          {company['Trust Center URL'] && (
            <a 
              href={company['Trust Center URL']} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">
            View this company's trust center for more information.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        {company['Trust Center URL'] && (
          <a 
            href={company['Trust Center URL']} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline text-xs"
          >
            View Trust Center
          </a>
        )}
        
        {hasCertifications && (
          <div className="mt-3 flex flex-col items-start">
            <div className="flex flex-wrap gap-1">
              {company['AICPA SOC 1'] === 'TRUE' && (
                <Badge variant="secondary" className="text-xs">SOC 1</Badge>
              )}
              {company['AICPA SOC 2'] === 'TRUE' && (
                <Badge variant="secondary" className="text-xs">SOC 2</Badge>
              )}
              {company['AICPA SOC 3'] === 'TRUE' && (
                <Badge variant="secondary" className="text-xs">SOC 3</Badge>
              )}
              {hasISO27001 && (
                <Badge variant="secondary" className="text-xs">ISO 27001</Badge>
              )}
              {hasPCIDSS && (
                <Badge variant="secondary" className="text-xs">PCI DSS</Badge>
              )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
