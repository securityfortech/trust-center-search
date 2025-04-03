
export interface CompanyType {
  Company: string;
  'Trust Center URL': string;
  'AICPA SOC 1'?: string;
  'AICPA SOC 2'?: string;
  'AICPA SOC 3'?: string;
  'ISO 27001'?: string;
  'PCI DSS Level 1'?: string;
  [key: string]: string | undefined;
}
