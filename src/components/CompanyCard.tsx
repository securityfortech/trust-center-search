
import React from 'react';
import { CompanyType } from './company/types';
import ListViewCard from './company/ListViewCard';
import GridViewCard from './company/GridViewCard';

interface CompanyCardProps {
  company: CompanyType;
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

  return layout === 'list' ? (
    <ListViewCard 
      company={company}
      hasCertifications={hasCertifications}
      certificationBadges={certificationBadges}
    />
  ) : (
    <GridViewCard
      company={company}
      hasCertifications={hasCertifications}
      certificationBadges={certificationBadges}
    />
  );
};

export default CompanyCard;

