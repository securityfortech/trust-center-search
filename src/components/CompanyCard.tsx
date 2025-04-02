
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CompanyCardProps {
  company: {
    Company: string;
    'Trust Center URL': string;
    [key: string]: string;
  };
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
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
        <p className="text-sm text-muted-foreground">
          View this company's trust center for more information.
        </p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-0">
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
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
