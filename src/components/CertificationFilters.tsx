
import React from 'react';
import { X } from 'lucide-react';

interface CertificationFiltersProps {
  certifications: string[];
  selectedCertifications: string[];
  onToggleCertification: (certification: string) => void;
}

const CertificationFilters: React.FC<CertificationFiltersProps> = ({
  certifications,
  selectedCertifications,
  onToggleCertification,
}) => {
  // Filter out common certifications that we want to display as primary filters
  const commonCertifications = [
    'ISO 27001', 
    'SOC 2', 
    'FedRAMP', 
    'HIPAA', 
    'PCI DSS', 
    'GDPR', 
    'CSA STAR'
  ].filter(cert => certifications.includes(cert));
  
  return (
    <div className="w-full overflow-x-auto pb-2 animate-fade-in">
      <div className="flex flex-wrap gap-2 px-2 py-3">
        {commonCertifications.map((certification) => (
          <button
            key={certification}
            onClick={() => onToggleCertification(certification)}
            className={`certification-badge ${
              selectedCertifications.includes(certification)
                ? 'certification-active'
                : 'certification-inactive'
            }`}
          >
            {certification}
            {selectedCertifications.includes(certification) && (
              <X className="ml-1 h-3 w-3" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CertificationFilters;
