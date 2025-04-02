
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { toast } from '@/components/ui/sonner';

export interface CompanyData {
  Company: string;
  'Trust Center URL': string;
  'SOC 1'?: string;
  'SOC 2'?: string;
  'SOC 3'?: string;
  [key: string]: string | undefined;
}

export const useCompanyData = (dataUrl: string) => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Extract Google Sheets ID and convert to CSV export URL
        const matches = dataUrl.match(/\/d\/(.*?)\/|\/d\/(.*?)$/);
        if (!matches) {
          throw new Error('Invalid Google Sheets URL');
        }
        
        const sheetId = matches[1] || matches[2];
        const csvExportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
        
        console.log('Fetching Google Sheet as CSV:', csvExportUrl);
        const response = await fetch(csvExportUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const csvText = await response.text();
        parseCSVData(csvText);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Could not fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    const parseCSVData = (csvText: string) => {
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
    };

    fetchData();
  }, [dataUrl]);

  return { companies, certifications, isLoading };
};
