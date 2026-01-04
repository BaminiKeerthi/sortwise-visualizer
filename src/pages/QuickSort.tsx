/**
 * Quick Sort Visualizer Page
 */

import { useState } from 'react';
import { AlgorithmLayout } from '@/components/AlgorithmLayout';
import { SortingInput } from '@/components/SortingInput';
import { StepHistory } from '@/components/StepHistory';
import { quickSort } from '@/algorithms/quickSort';
import { Step } from '@/utils/sortingHelpers';

export default function QuickSortPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleSort = (array: number[]) => {
    setIsRunning(true);
    const sortingSteps = quickSort(array);
    setSteps(sortingSteps);
    setIsRunning(false);
  };

  const handleReset = () => {
    setSteps([]);
  };

  return (
    <AlgorithmLayout
      title="Quick Sort"
      description="Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element and partitions the array around it. Elements smaller than the pivot go left, larger go right. It's one of the fastest sorting algorithms in practice due to its cache efficiency."
      complexity={{
        time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
        space: 'O(log n)',
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
