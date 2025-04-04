
import React from 'react';

interface ResultSummaryProps {
  filteredCompaniesCount: number;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ filteredCompaniesCount }) => {
  return (
    <div className="mb-4 px-4">
      <p className="text-sm text-muted-foreground">
        {filteredCompaniesCount === 0 ? (
          "No results found"
        ) : (
          <>Found <span className="font-medium">{filteredCompaniesCount}</span> trust centers</>
        )}
      </p>
    </div>
  );
};

export default ResultSummary;
