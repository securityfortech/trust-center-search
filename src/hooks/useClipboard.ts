
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { CompanyType } from '@/components/company/types';

export const useClipboard = (company: CompanyType) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success(`Copied ${company.Company}'s trust center link`, {
      duration: 3000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, handleCopyLink };
};
