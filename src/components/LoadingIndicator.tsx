
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-muted-foreground">Loading trust centers...</p>
    </div>
  );
};

export default LoadingIndicator;
