
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { toast } from '@/components/ui/sonner';

export interface CompanyData {
  Company: string;
  'Trust Center URL': string;
  [key: string]: string;
}

export const useCompanyData = (csvUrl: string) => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as CompanyData[];
            setCompanies(data);
            
            if (data.length > 0) {
              const certNames = Object.keys(data[0])
                .filter(key => 
                  key !== 'Company' && 
                  key !== 'Trust Center URL' && 
                  !key.startsWith('_')
                );
              setCertifications(certNames);
            }
            
            setIsLoading(false);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
            toast.error('Error parsing data. Please try again later.');
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Could not fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  return { companies, certifications, isLoading };
};
