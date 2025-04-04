
import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewModeToggleProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex space-x-1">
      <Button 
        variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
        size="sm"
        onClick={() => setViewMode('grid')}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button 
        variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
        size="sm"
        onClick={() => setViewMode('list')}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewModeToggle;
