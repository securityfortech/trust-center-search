
import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CompanyCardProps {
  company: {
    Company: string;
    'Trust Center URL': string;
    [key: string]: string;
  };
  certifications: string[];
  selectedCertifications: string[];
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, certifications, selectedCertifications }) => {
  // Get all certifications that this company has
  const companyCertifications = certifications.filter(
    cert => company[cert] === 'Yes' || company[cert] === 'yes' || company[cert] === 'TRUE' || company[cert] === 'true'
  );

  // First show selected certifications, then show others
  const sortedCertifications = [
    ...selectedCertifications.filter(cert => companyCertifications.includes(cert)),
    ...companyCertifications.filter(cert => !selectedCertifications.includes(cert))
  ];
  
  // Limit to first 7 certifications for display
  const displayCertifications = sortedCertifications.slice(0, 7);
  const remainingCount = sortedCertifications.length - displayCertifications.length;

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
        <div className="flex flex-wrap gap-1.5">
          {displayCertifications.map((cert) => (
            <Badge 
              key={cert} 
              variant={selectedCertifications.includes(cert) ? "default" : "outline"}
              className="text-xs py-0.5"
            >
              <Check className="h-3 w-3 mr-1" /> {cert}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondary" className="text-xs py-0.5">
              +{remainingCount} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-0">
        <div className="flex justify-between items-center w-full">
          <p>{companyCertifications.length} certifications</p>
          {company['Trust Center URL'] && (
            <a 
              href={company['Trust Center URL']} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View Trust Center
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
