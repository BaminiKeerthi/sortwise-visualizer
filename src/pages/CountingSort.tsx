/**
 * Counting Sort Visualizer Page
 */

import { useState } from 'react';
import { AlgorithmLayout } from '@/components/AlgorithmLayout';
import { SortingInput } from '@/components/SortingInput';
import { StepHistory } from '@/components/StepHistory';
import { countingSort } from '@/algorithms/countingSort';
import { Step } from '@/utils/sortingHelpers';

export default function CountingSortPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleSort = (array: number[]) => {
    setIsRunning(true);
    const sortingSteps = countingSort(array);
    setSteps(sortingSteps);
    setIsRunning(false);
  };

  const handleReset = () => {
    setSteps([]);
  };

  return (
    <AlgorithmLayout
      title="Counting Sort"
      description="Counting Sort is a non-comparison algorithm that counts occurrences of each unique element. It uses this count information to place elements directly in their sorted positions. It's extremely efficient when the range of values (k) is not significantly larger than the number of elements (n)."
      complexity={{
        time: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)' },
        space: 'O(n+k)',
      }}
    >
      <div className="space-y-8">
        <SortingInput
          onSort={handleSort}
          onReset={handleReset}
          isRunning={isRunning}
        />
        
        <div className="p-6 rounded-2xl bg-card/30 border border-border/50 min-h-[400px]">
          <StepHistory steps={steps} />
        </div>
      </div>
    </AlgorithmLayout>
  );
}
