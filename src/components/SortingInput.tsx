/**
 * SortingInput Component
 * 
 * Input field for entering array values with validation.
 * Accepts both space-separated and comma-separated formats.
 */

import { useState } from 'react';
import { parseInput } from '@/utils/sortingHelpers';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Play, RotateCcw, Shuffle } from 'lucide-react';

interface SortingInputProps {
  onSort: (array: number[]) => void;
  onReset: () => void;
  isRunning: boolean;
}

export function SortingInput({ onSort, onReset, isRunning }: SortingInputProps) {
  const [inputValue, setInputValue] = useState('');

  /**
   * Generates a random array for testing
   */
  const generateRandomArray = () => {
    const length = Math.floor(Math.random() * 5) + 5; // 5-9 elements
    const arr = Array.from({ length }, () => Math.floor(Math.random() * 99) + 1);
    setInputValue(arr.join(' '));
  };

  /**
   * Handles the sort button click
   */
  const handleSort = () => {
    const parsed = parseInput(inputValue);
    
    if (parsed === null) {
      toast.error('Invalid Input', {
        description: 'Please enter at least 2 numbers separated by spaces or commas. Example: "5 2 8 9" or "5,2,8,9"',
      });
      return;
    }

    if (parsed.length > 15) {
      toast.error('Array Too Large', {
        description: 'For better visualization, please use 15 or fewer elements.',
      });
      return;
    }

    onSort(parsed);
  };

  /**
   * Handles reset
   */
  const handleReset = () => {
    setInputValue('');
    onReset();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter array: 5 2 8 9 or 5,2,8,9"
          className="glass-input flex-1"
          disabled={isRunning}
          onKeyDown={(e) => e.key === 'Enter' && handleSort()}
        />
        
        <div className="flex gap-2">
          <Button
            onClick={generateRandomArray}
            variant="outline"
            size="icon"
            disabled={isRunning}
            title="Generate random array"
            className="shrink-0"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleSort}
            disabled={isRunning || !inputValue.trim()}
            className="shrink-0 glow-primary"
          >
            <Play className="h-4 w-4 mr-2" />
            Sort
          </Button>
          
          <Button
            onClick={handleReset}
            variant="outline"
            className="shrink-0"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/20 border border-primary" />
          <span className="text-muted-foreground">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500" />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500" />
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500" />
          <span className="text-muted-foreground">Sorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500/20 border border-purple-500" />
          <span className="text-muted-foreground">Pivot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-cyan-500/20 border border-cyan-500" />
          <span className="text-muted-foreground">Insert</span>
        </div>
      </div>
    </div>
  );
}
